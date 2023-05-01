<template>
  <div class="equipment-create">
    <h1 class="title">Создать оборудование</h1>
    <form @submit.prevent="createEquipment">
      <div class="form-group">
        <label for="name">Название*</label>
        <input id="name" type="text" v-model="name" required/>
      </div>
      <div class="form-group">
        <label for="inventory-number">Инвентарный номер</label>
        <input id="inventory-number" type="text" v-model="inventoryNumber"/>
      </div>
      <!--      <div class="form-group">-->
      <!--        <label for="photo">Добавить фото</label>-->
      <!--        <input id="photo" type="file" accept="image/*" @change="onPhotoChange"/>-->
      <!--      </div>-->
      <div class="form-group">
        <label for="cost">Стоимость</label>
        <input id="cost" type="number" v-model="cost"/>
      </div>
      <div class="form-group">
        <label for="source">Источник приобретения</label>
        <input id="source" type="text" v-model="source"/>
      </div>
      <div class="form-group">
        <label for="department">Подразделение</label>
        <input id="department" type="text" v-model="department"/>
      </div>
      <div class="form-group">
        <label for="responsible-person">Ответственное лицо</label>
        <input id="responsible-person" type="text" v-model="responsiblePerson"/>
      </div>
      <div class="form-group">
        <label for="status">Статус</label>
        <input id="status" type="text" v-model="status"/>
      </div>
      <div class="form-group">
        <label for="receipt-date">Дата поступления</label>
        <input id="receipt-date" type="date" v-model="receiptDate"/>
      </div>
      <div class="form-group">
        <label for="last-operation-date">Дата последней операции</label>
        <input id="last-operation-date" type="date" v-model="lastOperationDate"/>
      </div>
      <div class="form-group">
        <button class="save-button" type="submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import equipmentStore from '@/store/equipment.js'

export default {
  name: "EquipmentCreate",
  data() {
    return {
      // photo: null,
      inventoryNumber: null,
      name: null,
      cost: null,
      source: null,
      department: null,
      responsiblePerson: null,
      status: null,
      receiptDate: null,
      lastOperationDate: null,
    };
  },
  methods: {
    async createEquipment() {
      const equipmentData = {
        inventoryNumber: this.inventoryNumber,
        name: this.name,
        cost: this.cost,
        source: this.source,
        department: this.department,
        responsiblePerson: this.responsiblePerson,
        status: this.status,
        receiptDate: this.receiptDate ? new Date(this.receiptDate).toISOString() : null,
        lastOperationDate: this.lastOperationDate ? new Date(this.receiptDate).toISOString() : null,
      }

      try {
        const response = await equipmentStore.dispatch('saveEquipment', equipmentData)
        const locationHeader = response.headers.get('location')

        if (locationHeader) {
          this.$router.push(locationHeader)
        } else {
          console.warn('Could not find Location header in response:', response)
        }

        // Do something with the new equipment, e.g. show a success message, redirect to the equipment list, etc.

      } catch (error) {
        console.error(error)
      }
    },
    onPhotoChange(event) {
      this.photo = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.equipment-create {
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