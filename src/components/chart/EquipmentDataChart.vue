<template>
    <div class="container">
        <div v-if="loaded" class="date-picker">
            <VueDatePicker v-model="startPeriod" @update:model-value="saveStartDate" auto-apply
                           :enable-time-picker="false"></VueDatePicker>
            <VueDatePicker v-model="endPeriod" @update:model-value="saveEndDate" auto-apply
                           :enable-time-picker="false"></VueDatePicker>
        </div>
        <div v-if="loaded" class="up-down-percent">
            <div class="up-down-hours">
                <span class="up-hours">{{ this.equipmentStatistics.upHours }} часов вкл</span> /
                <span class="down-hours">{{ this.equipmentStatistics.downHours }} часов выкл</span>
            </div>
            <div class="percent">{{ this.equipmentStatistics.upPercent.toFixed(2) }}% вкл</div>
        </div>
        <Line v-if="loaded" :data="data" :options="options"/>
    </div>
</template>

<script>
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {Line} from 'vue-chartjs'
import equipmentStore from '@/store/equipment.js'


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
            type: Number,
            required: true
        }
    },
    data() {
        return {
            loaded: false,
            options: {},
            startPeriod: null,
            endPeriod: null,
        }
    },
    computed: {
        equipmentStatistics() {
            return equipmentStore.state.currentEquipmentStatistics
        },
    },
    async created() {
        this.loaded = false
        await this.fetchStatistics()
        this.loaded = true
        this.data = {
            datasets: [
                {
                    data: this.equipmentStatistics.equipmentData.map(data => ({x: data.time, y: data.u})),
                    label: 'Статистика',
                    borderWidth: 1,
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ]
                }
            ]
        }
        this.startPeriod = new Date(this.equipmentStatistics.start)
        this.endPeriod = new Date(this.equipmentStatistics.end)
    },
    methods: {
        async saveStartDate(value) {
            this.startPeriod = new Date(value);
            await this.fetchStatistics()
        },
        async saveEndDate(value) {
            this.endPeriod = new Date(value);
            await this.fetchStatistics()
        },
        async fetchStatistics() {
            await equipmentStore.dispatch(
                'fetchEquipmentStatistics',
                {
                    id: this.equipmentId,
                    start: this.startPeriod ? this.startPeriod.toISOString() : null,
                    stop: this.endPeriod ? this.endPeriod.toISOString() : null
                }
            )
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