<template>
    <div class="modal">
        <div class="modal-content">
            <p>Изменить частоту сбора данных</p>
            <div class="equipment-schedule">
                <table class="equipment-table">
                    <tr class="name">
                        <td class="label"><label for="enabled" class="enabled">Включено</label></td>
                        <td class="value"><input id="enabled" type="checkbox"
                                                 v-model="equipmentScheduleCreate.enabled"/></td>
                    </tr>
                    <tr class="name">
                        <td class="label"><label for="data-service">Сервис данных</label></td>
                        <td class="value"><select id="data-service" v-model="equipmentScheduleCreate.dataServiceId">
                            <option value=""></option>
                            <option v-for="service in dataServices" :key="service.id" :value="service.id">{{
                                    service.name
                                }}
                            </option>
                        </select></td>
                    </tr>
                    <tr class="name">
                        <td class="label"><label for="cron-expression">Выражение Cron</label></td>
                        <td class="value"><select id="cron-expression" v-model="equipmentScheduleCreate.cronId">
                            <option value=""></option>
                            <option v-for="cron in cronExpressions" :key="cron.id" :value="cron.id">{{
                                    cron.name
                                }}
                            </option>
                        </select></td>
                    </tr>
                </table>
            </div>
            <div class="modal-buttons">
                <button class="button" @click="saveEquipmentSchedule">Сохранить</button>
                <button class="button delete-button" @click="$emit('close')">Отмена</button>
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
    background-color: #fefefe;
    padding: 20px;
    border-radius: 0.5rem;
}

p {
    font-size: 20px;
    padding-top: 0;
    margin-top: 10px;
}


input[type=checkbox] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    width: 16px;
    height: 16px;
    border: 2px solid rgb(0, 85, 144);
    border-radius: 3px;
    background-color: #fff;
    cursor: pointer;
}

input[type=checkbox]:checked {
    background-color: rgba(0, 85, 144, 0.69);
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