<template>
    <div class="container">
        <div v-if="loaded">
            <div class="date-picker">
                <VueDatePicker v-model="startPeriod" @update:model-value="saveStartDate" auto-apply
                               :enable-time-picker="false"></VueDatePicker>
                <VueDatePicker v-model="endPeriod" @update:model-value="saveEndDate" auto-apply
                               :enable-time-picker="false"></VueDatePicker>
            </div>
            <div class="up-down-percent">
                <div class="up-down-hours">
                    <span class="up-hours">{{ this.equipmentStatistics.upHours }} часов вкл</span> /
                    <span class="down-hours">{{ this.equipmentStatistics.downHours }} часов выкл</span>
                </div>
                <div class="percent">{{ this.equipmentStatistics.upPercent.toFixed(2) }}% вкл</div>
            </div>
            <Line v-if="lineData" :data="lineData" :options="options"/>
        </div>
    </div>
</template>

<script>
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {Line} from 'vue-chartjs'
import {mapActions, mapGetters} from 'vuex'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
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
            lineData: null,
            options: {},
            startPeriod: null,
            endPeriod: null,
        }
    },
    computed: {
        equipmentStatistics() {
            return this.getCurrentEquipmentStatistics()
        },
    },
    async created() {
        await this.fetchStatistics()
        if (this.loaded) {
            console.log(this.equipmentStatistics.equipmentData.length)
            if (this.equipmentStatistics && this.equipmentStatistics.equipmentData && this.equipmentStatistics.equipmentData.length > 0) {
                this.lineData = {
                    datasets: [
                        {
                            data: this.equipmentStatistics.equipmentData.map(data => ({x: data.time, y: data.u})),
                            label: 'Статистика',
                            borderWidth: 1,
                        }
                    ]
                }
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

.up-down-percent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    margin-bottom: 1em;
}

.up-down-hours {
    display: flex;
    align-items: center;
}

.up-hours, .down-hours {
    margin: 0 0.5em;
}

.percent {
    font-weight: bold;
}
</style>