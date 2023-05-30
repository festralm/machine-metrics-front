<template>
    <div class="container">
        <div v-if="loaded">
            <Line v-if="lineData" :data="lineData" :options="options"/>
            <div class="up-down-percent">
                    <table class="equipment-table">
                        <tr class="name">
                            <td class="label">Вкл:</td>
                            <td class="value">{{ parseInt(this.equipmentStatistics.upMinutes / 60) }} часов
                                {{ this.equipmentStatistics.upMinutes % 60 }} минут
                            </td>
                        </tr>
                        <tr class="name">
                            <td class="label">Выкл:</td>
                            <td class="value">{{ parseInt(this.equipmentStatistics.downMinutes / 60) }} часов
                                {{ this.equipmentStatistics.downMinutes % 60 }} минут
                            </td>
                        </tr>
                        <tr class="name">
                            <td class="label">Вкл в нерабочее время:</td>
                            <td class="value">{{ parseInt(this.equipmentStatistics.upNotScheduleMinutes / 60) }} часов
                                {{ this.equipmentStatistics.upNotScheduleMinutes % 60 }} минут
                            </td>
                        </tr>
                        <tr class="name">
                            <td class="label">Вкл в рабочее время:</td>
                            <td class="value">{{ parseInt(this.equipmentStatistics.upScheduleMinutes / 60) }} часов
                                {{ this.equipmentStatistics.upScheduleMinutes % 60 }} минут ({{this.equipmentStatistics.upSchedulePercent.toFixed(2)}}%)
                            </td>
                        </tr>
                        <tr class="name">
                            <td class="label">Выкл в рабочее время:</td>
                            <td class="value">{{ parseInt(this.equipmentStatistics.downScheduleMinutes / 60) }} часов
                                {{ this.equipmentStatistics.downScheduleMinutes % 60 }} минут ({{ this.equipmentStatistics.downSchedulePercent.toFixed(2)}}%)
                            </td>
                        </tr>
                    </table>
                <div v-if="typeof equipmentStatistics.upPercent == 'number'" class="percent">
                    {{ this.equipmentStatistics.upPercent.toFixed(2) }}% вкл
                </div>
            </div>
            <div class="date-picker">
                <VueDatePicker v-model="startPeriod" @update:model-value="saveStartDate" auto-apply></VueDatePicker>
                <p></p>
                <VueDatePicker v-model="endPeriod" @update:model-value="saveEndDate" auto-apply></VueDatePicker>
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
        equipmentId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loaded: false,
            startPeriod: null,
            endPeriod: null,
        }
    },
    computed: {
        equipmentStatistics() {
            return this.getCurrentEquipmentStatistics()
        },
        lineData() {
            return {
                labels: this.equipmentStatistics.equipmentData.map(data => data.time),
                datasets: [
                    {
                        data: this.equipmentStatistics.equipmentData.map(x => {
                            x.x = x.time
                            return x
                        }),
                        label: 'U',
                        parsing: {
                            yAxisKey: 'u'
                        },
                    }
                ]
            }
        },
        options() {
            return {
                locale: 'RU',
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
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
                borderColor: 'rgba(0, 0, 0, 0.2)',
                pointHoverBackgroundColor: function (context) {
                    var transitivity = 1;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` : `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointBackgroundColor: function (context) {
                    var transitivity = 0.5;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` : `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointBorderColor: function (context) {
                    var transitivity = 0.2;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` : `rgba(0, 0, 0, ${transitivity})`;
                    }
                },
                pointHoverBorderColor: function (context) {
                    var transitivity = 0.5;
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    if (value) {
                        return value.enabledDuringPassiveTime ? `rgb(255, 186, 0, ${transitivity})` :
                            value.disabledDuringActiveTime ? `rgb(255, 0, 0, ${transitivity})` : `rgba(0, 0, 0, ${transitivity})`;
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
        },
    },
    async created() {
        await this.fetchStatistics()
        if (this.loaded) {
            if (this.equipmentStatistics && this.equipmentStatistics.equipmentData) {
                this.startPeriod = new Date(this.equipmentStatistics.start)
                this.endPeriod = new Date(this.equipmentStatistics.end)
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
            this.loaded = false
            await this.fetchEquipmentStatistics(
                {
                    id: this.equipmentId,
                    start: this.startPeriod ? this.startPeriod.toISOString() : null,
                    stop: this.endPeriod ? this.endPeriod.toISOString() : null
                }
            )
            this.loaded = !!this.equipmentStatistics
        },
    }
}
</script>

<style scoped>
.container {
    margin: 20px 70px 20px 70px;
}
.equipment-table {
    width: 600px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    font-size: 15px;
    outline: none;
    margin: 20px 20px 30px 20px;
    border-collapse: collapse;
}
.equipment-table tr {
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 85, 144, 0.69);
}
.equipment-table td {
    padding: 5px;
    width: auto;
}

.equipment-table .label {
    font-weight: bold;
    text-align: right;
    padding-right: 30px;
}

</style>