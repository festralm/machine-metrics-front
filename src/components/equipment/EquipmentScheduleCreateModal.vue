<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Изменить расписание</h2>
            <div class="equipment-schedule">
                <div class="form-group">
                    <label for="enabled">Включено</label>
                    <input id="enabled" type="checkbox" v-model="equipmentScheduleCreate.enabled"/>
                </div>
                <div class="form-group">
                    <label for="data-service">Сервис данных</label>
                    <select id="data-service" v-model="equipmentScheduleCreate.dataServiceId">
                        <option value=""></option>
                        <option v-for="service in dataServices" :key="service.id" :value="service.id">{{
                            service.name
                            }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cron-expression">Выражение Cron</label>
                    <select id="cron-expression" v-model="equipmentScheduleCreate.cronId">
                        <option value=""></option>
                        <option v-for="cron in cronExpressions" :key="cron.id" :value="cron.id">{{ cron.name }}</option>
                    </select>
                </div>
            </div>
            <div class="modal-buttons">
                <button @click="saveEquipmentSchedule">Сохранить</button>
                <button @click="$emit('close')">Отмена</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EquipmentScheduleCreateModal",
    props: {
        equipmentSchedule: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            equipmentScheduleCreate: {
                enabled: this.equipmentSchedule.enabled,
                dataServiceId: this.equipmentSchedule.dataService ? this.equipmentSchedule.dataService.id : null,
                cronId: this.equipmentSchedule.cron ? this.equipmentSchedule.cron.id : null,
            },
        }
    },
    computed: {
        dataServices() {
            return this.getServiceList();
        },
        cronExpressions() {
            return this.getCronList();
        },
    },
    created() {
        this.fetchServiceList();
        this.fetchCronExpressionsList();
        this.equipmentScheduleCreate = {
            enabled: this.equipmentSchedule.enabled,
            dataServiceId: this.equipmentSchedule.dataService ? this.equipmentSchedule.dataService.id : null,
            cronId: this.equipmentSchedule.cron ? this.equipmentSchedule.cron.id : null,
        };
    },
    methods: {
        ...mapActions('dataService', ['fetchServiceList']),
        ...mapGetters('dataService', ['getServiceList']),
        ...mapActions('cronExpression', ['fetchCronExpressionsList']),
        ...mapGetters('cronExpression', ['getCronList']),
        saveEquipmentSchedule() {
            this.$emit('save', this.equipmentScheduleCreate);
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