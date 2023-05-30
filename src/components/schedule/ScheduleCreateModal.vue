<template>
    <div class="modal">
        <div class="modal-content">
            <p>Добавить расписание</p>
            <table class="equipment-table">
                <tr class="name" v-if="isDefault">
                    <td class="label"><label for="weekday">День недели</label></td>
                    <td class="value">{{ schedule.weekday }}</td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="start-time">Время начала</label></td>
                    <td class="value">
                        <VueTimepicker id="start-time" v-model="schedule.startTime" :format="format"
                                       :minute-interval="15"></VueTimepicker>
                    </td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="end-time">Время окончания</label></td>
                    <td class="value">
                        <VueTimepicker id="end-time" v-model="schedule.endTime" :format="format"
                                       :minute-interval="15"></VueTimepicker>
                    </td>
                </tr>
                <tr class="name" v-if="!isDefault">
                    <td class="label"><label for="date">Дата</label></td>
                    <td class="value">
                        <VueDatePicker id="date" v-model="schedule.date" auto-apply
                                       :enable-time-picker="false"></VueDatePicker>
                    </td>
                </tr>
                <tr class="name">
                    <td class="label">
                        <button class="button" @click="saveSchedule">Сохранить</button>
                    </td>
                    <td class="value">
                        <button class="button delete-button" @click="$emit('close')">Отмена</button>
                    </td>
                </tr>
            </table>
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
    background-color: #fefefe;
    padding: 20px;
    border-radius: 0.5rem;
}

p {
    font-size: 20px;
    padding-top: 0;
    margin-top: 10px;
}

.equipment-table select {
    width: 150px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    font-size: 15px;
}

.equipment-table tr {
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}

.equipment-table td {
    width: 150px;
}

.button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 120px;
    height: 30px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-button {
    margin-left: 10px;
    background-color: rgba(144, 0, 0, 0.69);
}


</style>