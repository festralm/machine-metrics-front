<template>
    <div class="schedule-expressions-list">
        <h1 class="title">Список расписаний</h1>
        <!--        <div class="create-div">-->
        <!--            <button class="create-button" @click="showOrCloseModal(true)">Добавить расписание</button>-->
        <!--        </div>-->
        <div v-if="scheduleList.length > 0 || defaultSchedules.length > 0">
            <div class="default-schedules">
                <div class="equipment-item default-schedules-item" v-for="defaultSchedule in defaultSchedules"
                     :key="defaultSchedule.id">
                    <table class="equipment-table">
                        <tr class="name">
                            <td class="label"><label for="startTime">День недели</label></td>
                            <td class="value">{{ getWeekDayName(defaultSchedule.weekday) }}</td>
                        </tr>
                        <tr class="name">
                            <td class="label"><label for="startTime">Время начала</label></td>
                            <td class="value">{{ defaultSchedule.startTime }}</td>
                        </tr>
                        <tr class="name">
                            <td class="label"><label for="endTime">Время окончания</label></td>
                            <td class="value">{{ defaultSchedule.endTime }}</td>
                        </tr>
                    </table>
                    <div class="buttons">
                        <button class="edit-button" @click="showOrCloseModal(true, defaultSchedule.id)">Редактировать
                        </button>
                    </div>
                </div>
            </div>
            <div class="default-schedules">
                <div class="equipment-item default-schedules-item" v-for="schedule in scheduleList" :key="schedule.id">
                    <router-link :to="{ name: 'EquipmentDetails', params: { id: schedule.equipmentId }}">
                        <p class="equipment">Оборудование №{{ schedule.equipmentId }}</p>
                    </router-link>
                    <table class="equipment-table">
                        <tr class="name">
                            <td class="label"><label for="startTime">Время начала</label></td>
                            <td class="value">{{ schedule.startTime }}</td>
                        </tr>
                        <tr class="name">
                            <td class="label"><label for="endTime">Время окончания</label></td>
                            <td class="value">{{ schedule.endTime }}</td>
                        </tr>
                        <tr class="name">
                            <td class="label"><label for="date">Дата</label></td>
                            <td class="value">{{ formatDate(schedule.date) }}</td>
                        </tr>
                    </table>
                    <div class="buttons">
                        <button class="edit-button delete-button" v-if="canDelete()"
                                @click="deleteSchedule(schedule.id)">Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="no-equipment">Нет доступных расписаний</p>
        </div>
        <ScheduleCreateModal v-if="showModal" :editingSchedule="editingSchedule" :isDefault="true"
                             @close="showOrCloseModal(false)"
                             @save="createSchedule"></ScheduleCreateModal>
    </div>
</template>

<script>
import ScheduleCreateModal from '@/components/schedule/ScheduleCreateModal.vue';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "ScheduleList",
    components: {
        ScheduleCreateModal
    },
    data() {
        return {
            showModal: false,
            editingSchedule: null,
            weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        }
    },
    computed: {
        scheduleList() {
            return this.getScheduleList();
        },
        defaultSchedules() {
            return this.getDefaultScheduleList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchScheduleList();
        this.fetchDefaultScheduleList();
    },
    methods: {
        ...mapActions('schedule', ['fetchDefaultScheduleList', 'fetchScheduleList', 'deleteSchedule', 'saveDefaultSchedule']),
        ...mapGetters('schedule', ['getScheduleList', 'getDefaultScheduleList']),
        ...mapGetters('auth', ['getRole']),
        async createSchedule(scheduleData) {
            const response = await this.saveDefaultSchedule(scheduleData)
            if (response.ok) {
                this.showOrCloseModal(false)
                this.$router.push({name: 'ScheduleList'})
            }
        },
        showOrCloseModal(show, id) {
            this.showModal = show
            this.editingSchedule = this.defaultSchedules.filter(x => x.id === id)[0]
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
        formatDate(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        },
        getWeekDayName(weekday) {
            return this.weekdays[weekday - 1]
        },
    }
}
</script>

<style scoped>
.schedule-expressions-list {
    width: 85%;
    background-color: white;
    flex: 1;
}

.title {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    margin: 0;
    padding: 20px 0 20px 0;
    color: white;
}

.create-div {
    margin: 30px 20px 0 0;
    display: flex;
    justify-content: flex-end;
}

.create-button {
    background-color: rgb(0, 85, 144);
    font-size: 15px;
    width: 250px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.create-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.no-equipment {
    font-size: 30px;
}

.equipment-item {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.04);
    flex-direction: column;
    justify-content: center;
}


.edit-button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 150px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.edit-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-button {
    background-color: rgba(144, 0, 0, 0.69);
    width: 100px;
}

.buttons {
    margin-top: 10px;
}

.equipment-table {
    width: 100%;
    border-collapse: collapse;
}

.equipment-table tr {
    font-size: 15px;
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
    width: 350px;
}

.equipment-table .value {
    padding-left: 0;
    text-align: left;
    width: 250px;
}

.default-schedules {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
}

.default-schedules-item {
    width: 23%;
    margin: 7px 7px 7px 7px;
    box-sizing: border-box;
}

.equipment {
    font-weight: bold;
    padding: 0;
    margin: 5px;
    font-size: 15px;
}

a, a:visited, a:hover, a:active {
    color: rgb(0, 85, 144);
    text-decoration: underline;

}
</style>