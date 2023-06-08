<template>
    <div class="container">
        <div v-if="chooseEquipment" class="choose-unit">
            Выберите оборудование
        </div>
        <div v-if="loaded">
            <div class="date-picker">
                <VueDatePicker v-model="startPeriod" @update:model-value="saveStartDate"
                               :max-date="endPeriod" :max-time="getMaxTime()"></VueDatePicker>
                <p></p>
                <VueDatePicker v-model="endPeriod" @update:model-value="saveEndDate"></VueDatePicker>
            </div>
            <Line :data="lineData" :options="options"/>
            <div class="up-down-percent">
                <table class="equipment-table" v-for="(dto, index) in equipmentStatistics.equipmentStatisticsDtos"
                       :key="dto.equipmentData[0].equipmentId"
                       :value="dto.equipmentData[0].equipmentId">
                    <caption :class="'color' + (index + 1)">
                        <router-link
                            :to="{ name: 'EquipmentDetails', params: { id: dto.equipmentData[0].equipmentId }}">
                            <span class="equipment">Оборудование №{{ dto.equipmentData[0].equipmentId }}</span>
                        </router-link>
                    </caption>
                    <tr class="total-up">
                        <td class="label">Вкл:</td>
                        <td class="value">{{ parseInt(dto.upMinutes / 60) }} часов
                            {{ dto.upMinutes % 60 }} минут
                        </td>
                    </tr>
                    <tr class="total-down">
                        <td class="label">Выкл:</td>
                        <td class="value">{{ parseInt(dto.downMinutes / 60) }} часов
                            {{ dto.downMinutes % 60 }} минут
                        </td>
                    </tr>
                    <tr class="up-not-schedule">
                        <td class="label">Вкл в нерабочее время:</td>
                        <td class="value">{{ parseInt(dto.upNotScheduleMinutes / 60) }} часов
                            {{ dto.upNotScheduleMinutes % 60 }} минут
                        </td>
                    </tr>
                    <tr class="down-not-schedule">
                        <td class="label">Выкл в нерабочее время:</td>
                        <td class="value">{{ parseInt(dto.downNotScheduleMinutes / 60) }} часов
                            {{ dto.downNotScheduleMinutes % 60 }} минут
                        </td>
                    </tr>
                    <tr class="up-schedule">
                        <td class="label">Вкл в рабочее время:</td>
                        <td class="value">{{ parseInt(dto.upScheduleMinutes / 60) }} часов
                            {{ dto.upScheduleMinutes % 60 }} минут
                            ({{ dto.upSchedulePercent.toFixed(2) }}%)
                        </td>
                    </tr>
                    <tr class="down-schedule">
                        <td class="label">Выкл в рабочее время:</td>
                        <td class="value">{{ parseInt(dto.downScheduleMinutes / 60) }} часов
                            {{ dto.downScheduleMinutes % 60 }} минут
                            ({{ dto.downSchedulePercent.toFixed(2) }}%)
                        </td>
                    </tr>
                </table>
                <div v-if="typeof equipmentStatistics.upPercent == 'number'" class="percent">
                    {{ dto.upPercent.toFixed(2) }}% вкл
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    CategoryScale,
    Chart as ChartJS,
    Decimation,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
} from 'chart.js'
import {Line} from 'vue-chartjs'
import {mapActions, mapGetters} from 'vuex'
import 'chartjs-adapter-luxon'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Decimation,
    TimeScale,
)

export default {
    name: "EquipmentDataChart",
    components: {Line},
    props: {
        equipmentIds: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            loaded: false,
            startPeriod: null,
            endPeriod: null,
            colors: ['rgba(194,45,45, 0.5)', 'rgba(19,101,19, 0.5)', 'rgba(0,0,255, 0.5)', 'rgba(0,0,0, 0.5)', 'rgba(255,186,0, 0.5)'],
        }
    },
    computed: {
        equipmentStatistics() {
            return this.getCurrentEquipmentStatistics()
        },
        lineData() {
            if (!this.equipmentStatistics
                || !this.equipmentStatistics.equipmentStatisticsDtos
                || this.equipmentStatistics.equipmentStatisticsDtos.length === 0) {
                return {
                    labels: []
                }
            }
            return {
                labels: this.equipmentStatistics.equipmentStatisticsDtos[0].equipmentData.map(data => data.time),
                datasets: this.getDatasets()
            }
        },
        options() {
            return this.getOptions();
        },
        chooseEquipment() {
            return this.equipmentIds.length > 5 || this.equipmentIds.length === 0
        },
    },
    async created() {
        if (this.equipmentIds.length <= 5 && this.equipmentIds.length !== 0) {
            this.startPeriod = this.$route.query.startPeriod ? new Date(this.$route.query.startPeriod) : null
            this.endPeriod = this.$route.query.endPeriod ? new Date(this.$route.query.endPeriod) : null
            await this.fetchStatistics()
            if (this.loaded) {
                if (this.equipmentStatistics) {
                    this.startPeriod = new Date(this.equipmentStatistics.start)
                    this.endPeriod = new Date(this.equipmentStatistics.end)
                }
            }
        }
    },
    methods: {
        ...mapGetters('equipmentStatistics', ['getCurrentEquipmentStatistics']),
        ...mapActions('equipmentStatistics', ['fetchEquipmentStatistics']),
        async saveStartDate(value) {
            this.startPeriod = new Date(value);
            await this.fetchStatistics()
        },
        async saveEndDate(value) {
            this.endPeriod = new Date(value);
            await this.fetchStatistics()
        },
        async fetchStatistics() {
            if (!!this.startPeriod && !!this.endPeriod && this.startPeriod.getTime() >= this.endPeriod.getTime()) {
                this.startPeriod.setMinutes(this.endPeriod.getMinutes() - 5)
            }
            this.loaded = false
            await this.fetchEquipmentStatistics(
                {
                    ids: this.equipmentIds,
                    start: this.startPeriod ? this.startPeriod.toISOString() : null,
                    stop: this.endPeriod ? this.endPeriod.toISOString() : null
                }
            )
            let query = this.$route.query;
            this.$router.push({
                name: 'EquipmentStatistics',
                query: {
                    ...query,
                    startPeriod: this.startPeriod,
                    endPeriod: this.endPeriod,
                },
            });
            this.loaded = !!this.equipmentStatistics
        },
        getMaxTime() {
            if (this.startPeriod && this.endPeriod) {
                var sameDay = this.startPeriod.getFullYear() === this.endPeriod.getFullYear() &&
                    this.startPeriod.getMonth() === this.endPeriod.getMonth() &&
                    this.startPeriod.getDate() === this.endPeriod.getDate()
                var sameHour = sameDay && this.startPeriod.getHours() === this.endPeriod.getHours()
                console.log(sameHour)
                return {
                    hours: sameDay ? this.endPeriod.getHours() : 25,
                    minutes: sameHour ? (this.endPeriod.getMinutes() - 1) : 61
                }
            }
            return null
        },
        getDatasets() {
            let result = []
            console.log(this.equipmentStatistics.equipmentStatisticsDtos)
            for (let i = 0; i < this.equipmentStatistics.equipmentStatisticsDtos.length; i++) {
                let dto = this.equipmentStatistics.equipmentStatisticsDtos[i]
                result.push({
                    data: dto.equipmentData.map(x => {
                        x.x = x.time
                        return x
                    }),
                    borderColor: this.colors[i],
                    label: 'U',
                    parsing: {
                        yAxisKey: 'u'
                    },
                })
            }
            console.log(result)
            return result
        },
        getOptions() {
            return {
                locale: 'RU',
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0.4,
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            font: {
                                // family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                size: 20,
                                weight: 'bold',
                            }
                        }
                    },
                    decimation: {
                        enabled: true,
                    },
                    tooltip: {
                        titleAlign: 'center',
                        bodyAlign: 'center',
                        usePointStyle: true,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';

                                const index = context.dataIndex;
                                const value = context.dataset.data[index];

                                if (label) {
                                    label = ' ' + label + ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2)
                                        + (
                                            value.enabledDuringPassiveTime ? `, включено вне рабочего времени` :
                                                value.disabledDuringActiveTime ? `, выключено в рабочее время` :
                                                    (!value.enabledDuringPassiveTime && value.enabled) ? ', включено' :
                                                        ', выключено'
                                        );
                                }
                                return label;
                            }
                        }
                    },
                },
                borderWidth: 1,
                pointHoverBackgroundColor: function (context) {
                    var transitivity = 1;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` :
                                (value.enabled && !value.enabledDuringPassiveTime) ? `rgb(3, 213, 3, ${transitivity})` :
                                    `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointBackgroundColor: function (context) {
                    var transitivity = 0.5;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` :
                                (value.enabled && !value.enabledDuringPassiveTime) ? `rgb(3, 213, 3, ${transitivity})` :
                                    `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointBorderColor: function (context) {
                    var transitivity = 0.2;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` :
                                (value.enabled && !value.enabledDuringPassiveTime) ? `rgb(3, 213, 3, ${transitivity})` :
                                    `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointHoverBorderColor: function (context) {
                    var transitivity = 0.5;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` :
                                (value.enabled && !value.enabledDuringPassiveTime) ? `rgb(3, 213, 3, ${transitivity})` :
                                    `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointBorderWidth: 2,
                pointHoverBorderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                cubicInterpolationMode: 'default',
                scales: {
                    y: {
                        display: true,
                        title: {
                            color: 'rgba(0,0,0, 1)',
                            display: true,
                            text: 'U',
                            font: {
                                // family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                size: 15,
                            }
                        },
                        min: 0,
                    },
                    x: {
                        adapters: {
                            date: {
                                locale: 'ru-RU'
                            }
                        },
                        min: this.startPeriod,
                        max: this.endPeriod,
                        type: 'time',
                        time: {
                            displayFormats: {
                                hour: 'hh:mm dd MMMM',
                            }
                        },
                        display: true,
                        title: {
                            color: 'rgba(0, 0, 0, 1)',
                            display: true,
                            text: 'Время замера',
                            font: {
                                // family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                size: 15,
                            }
                        },
                    },
                }
            }
        }
    }
}
</script>

<style scoped>
.container {
    margin: 20px 70px 20px 70px;
}
.equipment-table {
    width: 100%;
    height: 15px;
    border-radius: 0;
    border-width: 1px;
    font-size: 15px;
    outline: none;
    margin: 10px 10px 10px 10px;
    border-collapse: collapse;
}
.equipment-table tr {
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.69);
}

.equipment-table td {
    /*padding: 5px;*/
    width: auto;
}

.equipment-table .label {
    font-weight: bold;
    text-align: right;
    padding-right: 30px;
}

.equipment-table caption {
    font-weight: bold;
    text-align: center;
}

.up-not-schedule {
    color: rgb(255, 186, 0, 1);
}

.down-not-schedule {
    color: rgb(0, 0, 0, 1);
}

.down-schedule {
    color: rgb(255, 0, 0, 1);
}

.up-schedule {
    color: rgb(3, 213, 3, 1);
}

.choose-unit {
    font-size: 30px;
}

a, a:visited, a:active {
    color: rgb(0, 0, 0);

}

a:hover {
    color: rgb(0, 85, 144);
    text-decoration: underline;

}

caption::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px; /* Adjust spacing between square and text */
}

.color1::before {
    background-color: rgba(194, 45, 45, 0.5); /* Replace with your desired color */
}

.color2::before {
    background-color: rgba(19, 101, 19, 0.5); /* Replace with your desired color */
}

.color3::before {
    background-color: rgba(0, 0, 255, 0.5); /* Replace with your desired color */
}

.color4::before {
    background-color: rgba(0, 0, 0, 0.5); /* Replace with your desired color */
}

.color5::before {
    background-color: rgba(255, 186, 0, 0.5); /* Replace with your desired color */
}

</style>