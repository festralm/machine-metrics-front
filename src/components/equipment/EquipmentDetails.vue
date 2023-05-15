<template>
    <div class="equipment-detail" v-if="equipment">
        <h1 class="title">{{ equipment.name }}</h1>
        <img class="photo" :src="photoUrl" alt="Equipment Photo" v-if="photoUrl">
        <div class="info-group">
            <label for="inventory-number">Инвентарный номер</label>
            <span id="inventory-number">{{ equipment.inventoryNumber }}</span>
        </div>
        <div class="info-group">
            <label for="acquisition-source">Источник приобретения</label>
            <span id="acquisition-source">{{ equipment.acquisitionSource }}</span>
        </div>
        <div class="info-group">
            <label for="cost">Стоимость</label>
            <span id="cost">{{ equipment.cost }}</span>
        </div>
        <div class="info-group">
            <label for="initial-cost">Начальная стоимость (балансовая стоимость)</label>
            <span id="initial-cost">{{ equipment.initialCost }}</span>
        </div>
        <div class="info-group">
            <label for="residualCost">Остаточная стоимость</label>
            <span id="residualCost">{{ equipment.residualCost }}</span>
        </div>
        <div class="info-group">
            <label for="residuaadNamelCost">Имя оборудования в AD</label>
            <span id="adName">{{ equipment.adName }}</span>
        </div>
        <div class="info-group">
            <label for="ipAddress">IP-адрес оборудования</label>
            <span id="ipAddress">{{ equipment.ipAddress }}</span>
        </div>
        <div class="info-group">
            <label for="kfuDevelopmentProgramApplication">Заявка программы развития КФУ</label>
            <div id="kfuDevelopmentProgramApplication">
              <span v-for="value in equipment.kfuDevelopmentProgramApplication" :key="value">
                  {{ value }}
              </span>
            </div>
        </div>
        <div class="info-group">
            <label for="warrantyServiceForRepresentativesOfAForeignParty">Гарантийное обслуживание (оборудования)
                представителями иностранной стороны</label>
            <input id="warrantyServiceForRepresentativesOfAForeignParty" type="checkbox" disabled
                   v-model="equipment.warrantyServiceForRepresentativesOfAForeignParty"/>
        </div>
        <div class="info-group">
            <label for="kfuDevelopmentProgramPriorityDirection">Приоритетное направление программы развития КФУ</label>
            <div id="kfuDevelopmentProgramPriorityDirection">
              <span v-for="value in equipment.kfuDevelopmentProgramPriorityDirection" :key="value">
                  {{ value }}
              </span>
            </div>
        </div>
        <div class="info-group">
            <label for="russiaDevelopmentPriorityDirection">Приоритетное направление развития науки и техники РФ</label>
            <div id="russiaDevelopmentPriorityDirection">
              <span v-for="value in equipment.russiaDevelopmentPriorityDirection" :key="value">
                  {{ value }}
              </span>
            </div>
        </div>
        <div class="info-group">
            <label for="area">Область применения</label>
            <span id="area">{{ equipment.area }}</span>
        </div>
        <div class="info-group">
            <label for="researchObjects">Объекты исследования</label>
            <span id="researchObjects">{{ equipment.researchObjects }}</span>
        </div>
        <div class="info-group">
            <label for="indicators">Определяемые показатели (величины, параметры)</label>
            <span id="indicators">{{ equipment.indicators }}</span>
        </div>
        <div class="info-group">
            <label for="additionalFeatures">Дополнительные возможности</label>
            <span id="additionalFeatures">{{ equipment.additionalFeatures }}</span>
        </div>
        <div class="info-group">
            <label for="purpose">Назначение</label>
            <span id="purpose">{{ equipment.purpose }}</span>
        </div>
        <div class="info-group">
            <label for="usageType">Тип использования</label>
            <span id="usageType">{{ equipment.usageType }}</span>
        </div>
        <div class="info-group">
            <label for="verificationRequired">Требуется поверка оборудования</label>
            <input id="verificationRequired" type="checkbox" disabled v-model="equipment.verificationRequired"/>
        </div>
        <div class="info-group">
            <label for="type">Тип оборудования</label>
            <span id="type">{{ equipment.type }}</span>
        </div>
        <div class="info-group">
            <label for="factoryNumber">Заводской номер</label>
            <span id="factoryNumber">{{ equipment.factoryNumber }}</span>
        </div>
        <div class="info-group">
            <label for="manufacturerCountry">Страна-изготовитель</label>
            <span id="manufacturerCountry">{{ equipment.manufacturerCountry }}</span>
        </div>
        <div class="info-group">
            <label for="manufactureYear">Год изготовления</label>
            <span id="manufactureYear">{{ equipment.manufactureYear }}</span>
        </div>
        <div class="info-group">
            <label for="manufacturer">Фирма-изготовитель</label>
            <span id="manufacturer">{{ equipment.manufacturer }}</span>
        </div>
        <div class="info-group">
            <label for="supplier">Фирма-поставщик</label>
            <span id="supplier">{{ equipment.supplier }}</span>
        </div>
        <div class="info-group">
            <label for="deliveryDate">Дата поставки</label>
            <span id="deliveryDate">{{ formatDate(equipment.deliveryDate) }}</span>
        </div>
        <div class="info-group">
            <label for="commissioningDate">Дата ввода в эксплуатацию</label>
            <span id="commissioningDate">{{ formatDate(equipment.commissioningDate) }}</span>
        </div>
        <div class="info-group">
            <label for="brand">Марка</label>
            <span id="brand">{{ equipment.brand }}</span>
        </div>
        <div class="info-group">
            <label for="providingServicesToThirdPartiesPossibility">Возможность оказания услуг сторонним
                организациям</label>
            <input id="providingServicesToThirdPartiesPossibility" type="checkbox" disabled
                   v-model="equipment.providingServicesToThirdPartiesPossibility"/>
        </div>
        <div class="info-group">
            <label for="collectiveFederalCenterUse">Оборудование федерального центра коллективного пользования</label>
            <input id="collectiveFederalCenterUse" type="checkbox" disabled
                   v-model="equipment.collectiveFederalCenterUse"/>
        </div>
        <div class="info-group">
            <label for="unique">Уникальное оборудование</label>
            <input id="unique" type="checkbox" disabled v-model="equipment.unique"/>
        </div>
        <div class="info-group">
            <label for="collectiveInterdisciplinaryCenterUse">Междисциплинарный центр коллективного пользования</label>
            <input id="collectiveInterdisciplinaryCenterUse" type="checkbox" disabled
                   v-model="equipment.collectiveInterdisciplinaryCenterUse"/>
        </div>
        <div class="info-group">
            <label for="portalPublicationCardReadiness">Готовность карточки к публикации на портале</label>
            <input id="portalPublicationCardReadiness" type="checkbox" disabled
                   v-model="equipment.portalPublicationCardReadiness"/>
        </div>
        <div class="info-group">
            <label for="installationLocation">Место установки</label>
            <span id="installationLocation">{{ equipment.installationLocation }}</span>
        </div>
        <div class="info-group">
            <label for="unit">Подразделение</label>
            <span id="unit">{{ equipment.unit }}</span>
        </div>
        <div class="info-group">
            <label for="responsiblePerson">Лицо, ответственное за функционирование оборудования</label>
            <span id="responsiblePerson">{{ equipment.responsiblePerson }}</span>
        </div>
        <div class="info-group">
            <label for="status">Статус оборудования</label>
            <span id="status">{{ equipment.status }}</span>
        </div>
        <div class="info-group">
            <label for="lastOperationDate">Дата последней операции</label>
            <span id="lastOperationDate">{{ formatDate(equipment.lastOperationDate) }}</span>
        </div>

        <div class="equipment-schedule" v-if="equipmentSchedule">
            <div class="info-group">
                <label for="enabled">Включено:</label>
                <span id="enabled">{{ equipmentSchedule.enabled ? "Да" : "Нет" }}</span>
            </div>
            <div class="info-group">
                <label for="data-service">Сервис данных:</label>
                <span
                        id="data-service">{{
                    equipmentSchedule.dataService ? equipmentSchedule.dataService.name : ""
                    }}</span>
            </div>
            <div class="info-group">
                <label for="cron-expression">Выражение Cron:</label>
                <span id="cron-expression">{{ equipmentSchedule.cron ? equipmentSchedule.cron.name : "" }}</span>
            </div>
            <button v-if="canEditInfo()" @click="showOrCloseModal(true)">Изменить</button>
            <EquipmentScheduleCreateModal v-if="showModal" :equipmentSchedule="equipmentSchedule"
                                          @close="showOrCloseModal(false)"
                                          @save="createEquipmentSchedule"></EquipmentScheduleCreateModal>
        </div>
        <div>
            <EquipmentDataChart v-if="equipment" :equipmentId="$route.params.id"/>
        </div>
        <div v-if="canDelete() || canUpdate()" class="button-group">
            <router-link v-if="canUpdate()" class="edit-button"
                         :to="{name: 'EquipmentEdit', params: {id: equipment.id}}">
                Редактировать
            </router-link>
            <button v-if="canDelete()" class="delete-button" @click="deleteCurrentEquipment()">Удалить</button>
        </div>
    </div>
</template>

<script>
import EquipmentDataChart from '@/components/chart/EquipmentDataChart.vue'
import EquipmentScheduleCreateModal from "@/components/equipment/EquipmentScheduleCreateModal.vue";
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EquipmentDetails",
    components: {EquipmentScheduleCreateModal, EquipmentDataChart},
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        equipment() {
            return this.getCurrentEquipment()
        },
        equipmentSchedule() {
            return this.getCurrentEquipmentSchedule()
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
        this.fetchEquipmentPhoto({id: equipmentId, path: this.equipment.photoPath});
    },
    methods: {
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
        canUpdate() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canDelete() {
            return this.role === 'ADMIN'
        },
        canEditInfo() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
    },
}
</script>

<style scoped>
.equipment-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.title {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
    color: #3f51b5;
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

label {
    font-size: 18px;
    margin-right: 10px;
    color: #444;
}

span {
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f5f5f5;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.delete-button {
    font-size: 16px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.delete-button:hover {
    background-color: #d32f2f;
}

.delete-button:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.edit-button {
    font-size: 16px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-right: 10px;
}

.edit-button:hover {
    background-color: #1976d2;
}

.edit-button:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.photo {
    width: 400px;
    height: 400px;
}

</style>