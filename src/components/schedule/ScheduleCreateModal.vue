<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Добавить расписание</h2>
            <div v-if="isDefault">
                <label for="weekday">День недели</label>
                <p id="weekday">{{ schedule.weekday }}</p>
            </div>
            <div>
                <label for="start-time">Время начала</label>
                <VueTimepicker id="start-time" v-model="schedule.startTime" :format="format"
                               :minute-interval="15"></VueTimepicker>
            </div>
            <div>
                <label for="end-time">Время окончания</label>
                <VueTimepicker id="end-time" v-model="schedule.endTime" :format="format"
                               :minute-interval="15"></VueTimepicker>
            </div>
            <div v-if="!isDefault">
                <label for="date">Дата</label>
                <VueDatePicker id="date" v-model="schedule.date" auto-apply
                               :enable-time-picker="false"></VueDatePicker>
            </div>
            <div class="modal-buttons">
                <button @click="saveSchedule">Сохранить</button>
                <button @click="$emit('close')">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
import VueTimepicker from 'vue3-timepicker';

export default {
    components: {
        VueTimepicker
    },
    name: "scheduleCreateModal",
    props: {
        editingSchedule: {
            type: Object,
            required: true,
        },
        isDefault: Boolean,
    },
    data() {
        return {
            format: 'HH:mm',
            schedule: {
                date: new Date(),
                startTime: "00:00",
                endTime: "00:00",
            },
        }
    },
    created() {
        if (this.editingSchedule) {
            this.schedule = {
                id: this.editingSchedule.id,
                date: this.editingSchedule.date,
                startTime: this.editingSchedule.startTime,
                endTime: this.editingSchedule.endTime,
                weekday: this.editingSchedule.weekday,
            };
        } else {
            this.schedule = {
                id: null,
                date: new Date(),
                startTime: "00:00",
                endTime: "00:00",
            };
        }
    },
    methods: {
        saveSchedule() {
            this.$emit('save', this.schedule);
        },
    },
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 0.5rem;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
}

input[type="text"] {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    width: 100%;
    margin-bottom: 1rem;
}

</style>