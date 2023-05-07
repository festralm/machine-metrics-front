<template>
  <div class="equipment-edit" v-if="formData">
    <h1 class="title">Изменить оборудование</h1>
    <form @submit.prevent="updateEquipment">
      <div class="form-group">
        <label for="name">Название*</label>
        <input id="name" type="text" v-model="formData.name" required/>
      </div>
      <div class="form-group">
        <label for="inventory-number">Инвентарный номер</label>
        <input id="inventory-number" type="text" v-model="formData.inventoryNumber"/>
      </div>
      <div class="form-group">
        <label for="cost">Стоимость</label>
        <input id="cost" type="number" v-model="formData.cost"/>
      </div>
      <div class="form-group">
        <label for="source">Источник приобретения</label>
        <input id="source" type="text" v-model="formData.source"/>
      </div>
      <div class="form-group">
        <label for="department">Подразделение</label>
        <input id="department" type="text" v-model="formData.department"/>
      </div>
      <div class="form-group">
        <label for="responsible-person">Ответственное лицо</label>
        <input id="responsible-person" type="text" v-model="formData.responsiblePerson"/>
      </div>
      <div class="form-group">
        <label for="status">Статус</label>
        <input id="status" type="text" v-model="formData.status"/>
      </div>
      <div class="form-group">
        <label for="receipt-date">Дата поступления</label>
        <input id="receipt-date" type="date" v-model="formData.receiptDate"/>
      </div>
      <div class="form-group">
        <label for="last-operation-date">Дата последней операции</label>
        <input id="last-operation-date" type="date" v-model="formData.lastOperationDate"/>
      </div>
      <div class="form-group">
        <button class="save-button" type="submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: "EquipmentEdit",
  data() {
    return {
      formData: {
        id: this.$route.params.id,
        name: null,
        inventoryNumber: null,
        cost: null,
        source: null,
        department: null,
        responsiblePerson: null,
        status: null,
        receiptDate: null,
        lastOperationDate: null,
      }
    }
  },
  created() {
      const equipmentId = this.$route.params.id;
      this.fetchEquipmentById(equipmentId);
  },
  methods: {
      ...mapActions('equipment', ['saveEquipment', 'fetchEquipmentById']),
      ...mapGetters('equipment', ['getCurrentEquipment']),
      updateEquipment() {
          this.formData.receiptDate = this.formData.receiptDate ? new Date(this.formData.receiptDate).toISOString() : null;
          this.formData.lastOperationDate = this.formData.lastOperationDate ? new Date(this.formData.lastOperationDate).toISOString() : null;
          this.saveEquipment(this.formData)
              .then((response) => {
                  this.$router.push({name: 'EquipmentDetails', params: {id: response.updatedEquipment.id}})
              })
              .catch((error) => {
                  console.error(error)
              })
      },
  },
  computed: {
    currentEquipment() {
        return this.getCurrentEquipment() || {}
    },
  },
  watch: {
    currentEquipment: {
      handler(equipment) {
        this.formData = {
          id: this.$route.params.id,
          name: equipment.name,
          inventoryNumber: equipment.inventoryNumber,
          cost: equipment.cost,
          source: equipment.source,
          department: equipment.department,
          responsiblePerson: equipment.responsiblePerson,
          status: equipment.status,
          receiptDate: equipment.receiptDate ? new Date(equipment.receiptDate).toISOString().slice(0, 10) : null,
          lastOperationDate: equipment.lastOperationDate ? new Date(equipment.lastOperationDate).toISOString().slice(0, 10) : null,
        }
      },
      immediate: true, // update form data immediately after mounted
    },
  },
}
</script>

<style scoped>
.equipment-edit {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #3f51b5;
}

.form-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  margin-right: 10px;
  color: #444;
}

input {
  flex-grow: 1;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.save-button {
  background-color: #3f51b5;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #2c3e50;
}
</style>