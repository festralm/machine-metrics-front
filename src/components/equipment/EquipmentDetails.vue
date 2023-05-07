<template>
  <div class="equipment-detail" v-if="equipment">
      <h1 class="title">{{ equipment.name }}</h1>
      <div class="info-group">
          <label for="inventory-number">Инвентарный номер:</label>
          <span id="inventory-number">{{ equipment.inventoryNumber }}</span>
      </div>
      <div class="info-group">
          <label for="cost">Стоимость:</label>
          <span id="cost">{{ equipment.cost }}</span>
      </div>
      <div class="info-group">
          <label for="source">Источник приобретения:</label>
          <span id="source">{{ equipment.source }}</span>
      </div>
      <div class="info-group">
          <label for="department">Подразделение:</label>
          <span id="department">{{ equipment.department }}</span>
      </div>
      <div class="info-group">
          <label for="responsible-person">Ответственное лицо:</label>
          <span id="responsible-person">{{ equipment.responsiblePerson }}</span>
      </div>
      <div class="info-group">
          <label for="status">Статус:</label>
          <span id="status">{{ equipment.status }}</span>
      </div>
      <div class="info-group">
          <label for="receipt-date">Дата поступления:</label>
          <span id="receipt-date">{{ formatDate(equipment.receiptDate) }}</span>
      </div>
      <div class="info-group">
          <label for="last-operation-date">Дата последней операции:</label>
          <span id="last-operation-date">{{ formatDate(equipment.lastOperationDate) }}</span>
      </div>
      <div class="equipment-schedule" v-if="equipmentSchedule">
          <div class="info-group">
              <label for="enabled">Включено:</label>
              <span id="enabled">{{ equipmentSchedule.enabled ? "Да" : "Нет" }}</span>
          </div>
          <div class="info-group">
              <label for="data-service">Сервис данных:</label>
              <span
                  id="data-service">{{ equipmentSchedule.dataService ? equipmentSchedule.dataService.name : "" }}</span>
          </div>
          <div class="info-group">
              <label for="cron-expression">Выражение Cron:</label>
              <span id="cron-expression">{{ equipmentSchedule.cron ? equipmentSchedule.cron.name : "" }}</span>
          </div>
          <button @click="showOrCloseModal(true)">Изменить</button>
          <EquipmentScheduleCreateModal v-if="showModal" :equipmentSchedule="equipmentSchedule"
                                        @close="showOrCloseModal(false)"
                                        @save="createEquipmentSchedule"></EquipmentScheduleCreateModal>
      </div>
      <div>
          <EquipmentDataChart v-if="equipment" :equipmentId="$route.params.id"/>
      </div>
      <div class="button-group">
          <router-link class="edit-button" :to="{name: 'EquipmentEdit', params: {id: equipment.id}}">Редактировать
          </router-link>
          <button class="delete-button" @click="deleteEquipment">Удалить</button>
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
        }
    },
    async created() {
        const equipmentId = this.$route.params.id
        await this.fetchEquipmentById(equipmentId)
        await this.fetchEquipmentScheduleById(equipmentId)
    },
    methods: {
        ...mapActions('equipment', ['fetchEquipmentById', 'deleteEquipment']),
        ...mapGetters('equipment', ['getCurrentEquipment']),
        ...mapActions('equipmentSchedule', ['fetchEquipmentScheduleById', 'saveEquipmentSchedule']),
        ...mapGetters('equipmentSchedule', ['getCurrentEquipmentSchedule']),
        formatDate(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        },
        async deleteEquipment() {
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
                const locationHeader = response.headers.get('location')

                if (locationHeader) {
                    this.$router.push(locationHeader)
                } else {
                    console.warn('Could not find Location header in response:', response)
                }
            }
        },
        showOrCloseModal(show) {
            this.showModal = show
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

</style>