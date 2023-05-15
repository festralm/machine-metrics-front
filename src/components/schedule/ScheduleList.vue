<template>
    <div class="schedule-expressions-list">
        <h1>Список расписаний</h1>
        <ul>
            <div v-if="scheduleList.length > 0 || defaultSchedule !== null">
                <li v-if="defaultSchedule">
                    <div class="info-group">
                        <label for="startTime">Время начала</label>
                        <span id="startTime">{{ defaultSchedule.startTime }}</span>
                    </div>
                    <div class="info-group">
                        <label for="endTime">Время окончания</label>
                        <span id="endTime">{{ defaultSchedule.endTime }}</span>
                    </div>
                    <button @click="showOrCloseModal(true, defaultSchedule.id)">Редактировать</button>
                </li>
                <li v-for="schedule in scheduleList" :key="schedule.id">
                    <div class="info-group">
                        <label for="startTime">Время начала</label>
                        <span id="startTime">{{ schedule.startTime }}</span>
                    </div>
                    <div class="info-group">
                        <label for="endTime">Время окончания</label>
                        <span id="endTime">{{ schedule.endTime }}</span>
                    </div>
                    <div class="info-group">
                        <label for="date">Дата</label>
                        <span id="date">{{ formatDate(schedule.date) }}</span>
                    </div>
                    <button @click="showOrCloseModal(true, schedule.id)">Редактировать</button>
                    <button v-if="canDelete()" @click="deleteSchedule(schedule.id)">Удалить</button>
                </li>
            </div>
            <div v-else>
                <p>Нет доступных расписаний</p>
            </div>
        </ul>
        <button @click="showOrCloseModal(true)">Добавить расписание</button>
        <ScheduleCreateModal v-if="showModal" :editingSchedule="editingSchedule" :isDefault="isDefault"
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
            isDefault: false,
        }
    },
    computed: {
        scheduleList() {
            return this.getScheduleList().filter(x => x.date != null);
        },
        defaultSchedule() {
            let defaultScheduleList = this.getScheduleList().filter(x => x.date == null);
            return defaultScheduleList.length > 0 ? defaultScheduleList[0] : null;
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchScheduleList();
    },
    methods: {
        ...mapActions('schedule', ['fetchScheduleList', 'deleteSchedule', 'saveSchedule']),
        ...mapGetters('schedule', ['getScheduleList']),
        ...mapGetters('auth', ['getRole']),
        async createSchedule(scheduleData) {
            const response = await this.saveSchedule(scheduleData)
            if (response.ok) {
                this.showOrCloseModal(false)
                this.$router.push({name: 'ScheduleList'})
            }
        },
        showOrCloseModal(show, id) {
            this.isDefault = false
            this.showModal = show
            if (id) {
                this.editingSchedule = this.scheduleList.filter(x => x.id === id)[0]
                if (!this.editingSchedule && this.defaultSchedule.id === id) {
                    this.editingSchedule = this.defaultSchedule
                    this.isDefault = true
                }
            } else {
                this.editingSchedule = null
            }
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
    }
}
</script>

<style scoped>
.schedule-expressions-list {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.schedule-expressions-list ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.schedule-expressions-list li {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    font-weight: bold;
}

.schedule-expressions-list button {
    margin-left: 1rem;
}

.info-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.info-group:last-of-type {
    border-bottom: none;
}
</style>