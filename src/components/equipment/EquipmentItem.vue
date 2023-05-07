<template>
  <div class="equipment-item" @click="goToDetails">
    <div>
      <h2>{{ equipment.name }}</h2>
      <div class="info-group">
        <label>Инвентарный номер:</label>
        <span>{{ equipment.inventoryNumber }}</span>
      </div>
    </div>
    <button @click.stop="deleteEquipment(equipment.id)">Удалить</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "EquipmentItem",
  props: {
    equipment: {
      type: Object,
      required: true,
    },
  },
  methods: {
      ...mapActions('equipment', ['deleteEquipment']),
      goToDetails() {
          this.$router.push({name: 'EquipmentDetails', params: {id: this.equipment.id}})
      },
  },
}
</script>

<style scoped>
.equipment-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.equipment-item:hover {
  background-color: #f5f5f5;
}

.equipment-item h2 {
  text-align: left;
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}

.info-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}

.info-group label {
  font-size: 18px;
  margin-right: 10px;
  color: #444;
}

.info-group span {
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
}

.equipment-item button {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.equipment-item button:hover {
  background-color: #b71c1c;
}

.equipment-item button:focus {
  outline: none;
}

.equipment-item button:active {
  background-color: #ba000d;
}
</style>