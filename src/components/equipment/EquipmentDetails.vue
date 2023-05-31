<template>
    <div class="equipment-detail" v-if="equipment">
        <h1 class="title">{{ equipment.name }}</h1>
        <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
        <div v-if="canDelete() || canUpdate()" class="button-group">
            <button v-if="canUpdate()" class="edit-button cron-button"
                    @click="goTo({name: 'EquipmentEdit', params: {id: equipment.id}})">Редактировать
            </button>
            <button v-if="canDelete()" class="delete-button cron-button" @click="deleteCurrentEquipment()">Удалить
            </button>
        </div>
        <div class="my-chart">
            <EquipmentDataChart :key="componentKey" v-if="equipment" :equipmentId="$route.params.id"/>
        </div>
        <div>
            <p class="cron-p">Расписание получения данных</p>
        </div>
        <div class="equipment-schedule" v-if="equipmentSchedule">
            <table class="equipment-table">
                <tr class="name">
                    <td class="label"><label for="enabled">Включено:</label></td>
                    <td class="value">{{ equipmentSchedule.enabled ? "Да" : "Нет" }}</td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="data-service">Сервис данных:</label></td>
                    <td class="value">{{
                            equipmentSchedule.dataService ? equipmentSchedule.dataService.name : "-"
                        }}
                    </td>
                </tr>
                <tr class="name">
                    <td class="label"><label for="cron-expression">Выражение Cron:</label></td>
                    <td class="value">{{ equipmentSchedule.cron ? equipmentSchedule.cron.name : "-" }}</td>
                </tr>
                <tr class="button">
                    <td class="label"></td>
                    <td class="value">
                        <button class="cron-button" v-if="canEditInfo()" @click="showOrCloseModal(true)">Изменить
                        </button>
                    </td>
                </tr>
                <EquipmentScheduleCreateModal v-if="showModal" :equipmentSchedule="equipmentSchedule"
                                              @close="showOrCloseModal(false)"
                                              @save="createEquipmentSchedule"></EquipmentScheduleCreateModal>
            </table>
        </div>
        <div>
            <p class="cron-p">График работы</p>
        </div>
        <div class="schedule-expressions-list">
            <div v-if="equipmentScheduleList && equipmentScheduleList.length > 0">
                <table class="equipment-table" v-for="schedule in equipmentScheduleList" :key="schedule.id">
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
                    <tr class="button">
                        <td class="label"></td>
                        <td class="value">
                            <button class="cron-button" @click="showOrCloseScheduleModal(true, schedule.id)">
                                Редактировать
                            </button>
                            <button class="cron-button delete-button" v-if="canDelete()"
                                    @click="deleteSchedule(schedule.id)">Удалить
                            </button>
                        </td>
                    </tr>
                    <tr class="button">
                        <td class="label"></td>
                        <td class="value">
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                <p>Нет доступных расписаний</p>
            </div>
            <table class="equipment-table">
                <tr class="button">
                    <td class="label"></td>
                    <td class="value">
                        <button class="cron-button schedule-button" v-if="canEditInfo()"
                                @click="showOrCloseScheduleModal(true)">Задать график
                            работы
                        </button>
                    </td>
                </tr>
            </table>
            <ScheduleCreateModal v-if="showScheduleModal" :editingSchedule="editingSchedule" :isDefault="false"
                                 @close="showOrCloseScheduleModal(false)"
                                 @save="createSchedule"></ScheduleCreateModal>
        </div>
        <table class="equipment-table equipment-info">
            <tr class="name">
                <td class="label"><label for="inventory-number">Инвентарный номер</label></td>
                <td class="value"><span id="inventory-number">{{ equipment.inventoryNumber }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="acquisition-source">Источник приобретения</label></td>
                <td class="value"><span id="acquisition-source">{{ equipment.acquisitionSource }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="cost">Стоимость</label></td>
                <td class="value"><span id="cost">{{ equipment.cost }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="initial-cost">Начальная стоимость (балансовая стоимость)</label></td>
                <td class="value"><span id="initial-cost">{{ equipment.initialCost }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="residualCost">Остаточная стоимость</label></td>
                <td class="value"><span id="residualCost">{{ equipment.residualCost }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="residuaadNamelCost">Имя оборудования в AD</label></td>
                <td class="value"><span id="adName">{{ equipment.adName }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="ipAddress">IP-адрес оборудования</label></td>
                <td class="value"><span id="ipAddress">{{ equipment.ipAddress }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="kfuDevelopmentProgramApplication">Заявка программы развития КФУ</label>
                </td>
                <td class="value">
                    <div id="kfuDevelopmentProgramApplication">
              <span v-for="value in equipment.kfuDevelopmentProgramApplication" :key="value">
                  {{ value }}
              </span>
                    </div>
                </td>
            </tr>
            <tr class="name">
                <td class="label"><label for="warrantyServiceForRepresentativesOfAForeignParty">Гарантийное обслуживание
                    (оборудования)
                    представителями иностранной стороны</label></td>
                <td class="value"><input id="warrantyServiceForRepresentativesOfAForeignParty" type="checkbox" disabled
                                         v-model="equipment.warrantyServiceForRepresentativesOfAForeignParty"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="kfuDevelopmentProgramPriorityDirection">Приоритетное направление программы
                    развития КФУ</label></td>
                <td class="value">
                    <div id="kfuDevelopmentProgramPriorityDirection">
              <span v-for="value in equipment.kfuDevelopmentProgramPriorityDirection" :key="value">
                  {{ value }}
              </span>
                    </div>
                </td>
            </tr>
            <tr class="name">
                <td class="label"><label for="russiaDevelopmentPriorityDirection">Приоритетное направление развития
                    науки и техники РФ</label></td>
                <td class="value">
                    <div id="russiaDevelopmentPriorityDirection">
              <span v-for="value in equipment.russiaDevelopmentPriorityDirection" :key="value">
                  {{ value }}
              </span>
                    </div>
                </td>
            </tr>
            <tr class="name">
                <td class="label"><label for="area">Область применения</label></td>
                <td class="value"><span id="area">{{ equipment.area }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="researchObjects">Объекты исследования</label></td>
                <td class="value"><span id="researchObjects">{{ equipment.researchObjects }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="indicators">Определяемые показатели (величины, параметры)</label></td>
                <td class="value"><span id="indicators">{{ equipment.indicators }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="additionalFeatures">Дополнительные возможности</label></td>
                <td class="value"><span id="additionalFeatures">{{ equipment.additionalFeatures }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="purpose">Назначение</label></td>
                <td class="value"><span id="purpose">{{ equipment.purpose ? equipment.purpose.name : null }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="usageType">Тип использования</label></td>
                <td class="value"><span id="usageType">{{
                        equipment.usageType ? equipment.usageType.name : null
                    }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="verificationRequired">Требуется поверка оборудования</label></td>
                <td class="value"><input id="verificationRequired" type="checkbox" disabled
                                         v-model="equipment.verificationRequired"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="type">Тип оборудования</label></td>
                <td class="value"><span id="type">{{ equipment.type }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="factoryNumber">Заводской номер</label></td>
                <td class="value"><span id="factoryNumber">{{ equipment.factoryNumber }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="manufacturerCountry">Страна-изготовитель</label></td>
                <td class="value"><span id="manufacturerCountry">{{
                        equipment.manufacturerCountry ? equipment.manufacturerCountry.name : null
                    }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="manufactureYear">Год изготовления</label></td>
                <td class="value"><span id="manufactureYear">{{ equipment.manufactureYear }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="manufacturer">Фирма-изготовитель</label></td>
                <td class="value"><span id="manufacturer">{{ equipment.manufacturer }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="supplier">Фирма-поставщик</label></td>
                <td class="value"><span id="supplier">{{ equipment.supplier }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="deliveryDate">Дата поставки</label></td>
                <td class="value"><span id="deliveryDate">{{ formatDate(equipment.deliveryDate) }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="commissioningDate">Дата ввода в эксплуатацию</label></td>
                <td class="value"><span id="commissioningDate">{{ formatDate(equipment.commissioningDate) }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="brand">Марка</label></td>
                <td class="value"><span id="brand">{{ equipment.brand }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="providingServicesToThirdPartiesPossibility">Возможность оказания услуг
                    сторонним
                    организациям</label></td>
                <td class="value"><input id="providingServicesToThirdPartiesPossibility" type="checkbox" disabled
                                         v-model="equipment.providingServicesToThirdPartiesPossibility"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="collectiveFederalCenterUse">Оборудование федерального центра коллективного
                    пользования</label></td>
                <td class="value"><input id="collectiveFederalCenterUse" type="checkbox" disabled
                                         v-model="equipment.collectiveFederalCenterUse"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="unique">Уникальное оборудование</label></td>
                <td class="value"><input id="unique" type="checkbox" disabled v-model="equipment.unique"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="collectiveInterdisciplinaryCenterUse">Междисциплинарный центр
                    коллективного пользования</label></td>
                <td class="value"><input id="collectiveInterdisciplinaryCenterUse" type="checkbox" disabled
                                         v-model="equipment.collectiveInterdisciplinaryCenterUse"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="portalPublicationCardReadiness">Готовность карточки к публикации на
                    портале</label></td>
                <td class="value"><input id="portalPublicationCardReadiness" type="checkbox" disabled
                                         v-model="equipment.portalPublicationCardReadiness"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="installationLocation">Место установки</label></td>
                <td class="value"><span id="installationLocation">{{ equipment.installationLocation }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="unit">Подразделение</label></td>
                <td class="value"><span id="unit">{{ equipment.unit ? equipment.unit.name : null }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="responsiblePerson">Лицо, ответственное за функционирование
                    оборудования</label></td>
                <td class="value"><span id="responsiblePerson">{{ equipment.responsiblePerson }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="status">Статус оборудования</label></td>
                <td class="value"><span id="status">{{ equipment.status ? equipment.status.name : null }}</span></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="lastOperationDate">Дата последней операции</label></td>
                <td class="value"><span id="lastOperationDate">{{ formatDate(equipment.lastOperationDate) }}</span></td>
            </tr>
        </table>


    </div>
</template>

<script>
import EquipmentDataChart from '@/components/chart/EquipmentDataChart.vue'
import EquipmentScheduleCreateModal from "@/components/equipment/EquipmentScheduleCreateModal.vue";
import {mapActions, mapGetters} from 'vuex'
import ScheduleCreateModal from "@/components/schedule/ScheduleCreateModal.vue";

export default {
    name: "EquipmentDetails",
    components: {ScheduleCreateModal, EquipmentScheduleCreateModal, EquipmentDataChart},
    data() {
        return {
            showModal: false,
            showScheduleModal: false,
            editingSchedule: {},
            componentKey: 0,
        }
    },
    computed: {
        equipment() {
            return this.getCurrentEquipment()
        },
        equipmentSchedule() {
            return this.getCurrentEquipmentSchedule()
        },
        equipmentScheduleList() {
            return this.getEquipmentScheduleList()(this.$route.params.id)
        },
        role() {
            return this.getRole();
        },
        photoUrl() {
            return this.getEquipmentPhoto()(this.$route.params.id);
        },
    },
    async created() {
        const equipmentId = this.$route.params.id;
        await this.fetchEquipmentById(equipmentId);
        await this.fetchEquipmentScheduleById(equipmentId);
        await this.fetchByEquipmentId(equipmentId);
        await this.fetchEquipmentPhoto({id: equipmentId, path: this.equipment.photoPath});
    },
    methods: {
        ...mapActions('schedule', ['fetchByEquipmentId', 'deleteSchedule', 'saveSchedule']),
        ...mapGetters('schedule', ['getEquipmentScheduleList']),
        ...mapActions('equipment', ['fetchEquipmentById', 'deleteEquipment']),
        ...mapGetters('equipment', ['getCurrentEquipment']),
        ...mapActions('equipmentSchedule', ['fetchEquipmentScheduleById', 'saveEquipmentSchedule']),
        ...mapGetters('equipmentSchedule', ['getCurrentEquipmentSchedule']),
        ...mapGetters('auth', ['getRole']),
        ...mapActions('photo', ['fetchEquipmentPhoto']),
        ...mapGetters('photo', ['getEquipmentPhoto']),
        formatDate(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        },
        async deleteCurrentEquipment() {
            await this.deleteEquipment(this.equipment.id);
            this.$router.push({name: 'EquipmentList'});
        },
        async createEquipmentSchedule(equipmentSchedule) {
            equipmentSchedule.id = this.$route.params.id
            if (!equipmentSchedule.dataServiceId) {
                equipmentSchedule.dataServiceId = null
            }
            if (!equipmentSchedule.cronId) {
                equipmentSchedule.cronId = null
            }
            const response = await this.saveEquipmentSchedule(equipmentSchedule)
            if (response.ok) {
                this.showOrCloseModal(false)
                this.$router.push({name: 'EquipmentDetails', params: {id: response.updatedEquipmentSchedule.id}})
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
        },
        showOrCloseScheduleModal(show, id) {
            this.showScheduleModal = show
            this.editingSchedule = this.equipmentScheduleList.filter(x => x.id === id)[0]
        },
        async createSchedule(scheduleData) {
            scheduleData.equipmentId = this.$route.params.id
            const response = await this.saveSchedule(scheduleData)
            if (response.ok) {
                this.showOrCloseScheduleModal(false)
                this.componentKey++;
            }
        },
        canUpdate() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
        canEditInfo() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        goTo(obj) {
            this.$router.push(obj)
        }
    },
}
</script>

<style scoped>
.equipment-detail {
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

.photo {
    width: 200px;
    height: 200px;
    margin-top: 20px;
    padding-right: 20px;
}

.equipment-table {
    width: 100%;
    border-collapse: collapse;
}

.equipment-info {
    margin-bottom: 30px;
}

.equipment-table tr {
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 85, 144, 0.69);
}

tr.button {
    border-bottom: 0 solid rgba(0, 85, 144, 0.69);
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


input[type=checkbox] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 85, 144, 0.27);
    border-radius: 3px;
    background-color: #fff;
}

input[type=checkbox]:checked {
    background-color: rgba(0, 85, 144, 0.27);
    border: 2px solid rgb(0, 85, 144);
}

.cron-p {
    font-size: 20px;
}

.cron-button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 150px;
    height: 30px;
    color: white;
    font-weight: bold;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
}

.cron-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-button {
    margin-left: 20px;
    background-color: rgba(144, 0, 0, 0.69);
}

.schedule-button {
    width: 200px;
    background-color: rgba(0, 85, 144, 0.69);
    margin-bottom: 10px;
}

.button-group {
    margin-top: 20px;
}
</style>