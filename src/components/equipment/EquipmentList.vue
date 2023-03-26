<template>
  <div class="equipment-list">
    <h1 class="title">Оборудование</h1>
    <div v-if="equipmentList.length > 0">
      <div v-for="equipment in equipmentList" :key="equipment.id">
        <equipment-item :equipment="equipment"/>
      </div>
    </div>
    <div v-else>
      <p class="no-equipment">Нет доступного оборудования</p>
    </div>
    <router-link :to="{ name: 'EquipmentCreate' }">
      <button class="create-button">Создать оборудование</button>
    </router-link>
  </div>
</template>

<script>
import EquipmentItem from './EquipmentItem.vue';
import {RouterLink} from 'vue-router';

export default {
  name: "EquipmentList",
  components: {
    EquipmentItem,
    RouterLink,
  },
  computed: {
    equipmentList() {
      return this.$store.getters.getEquipmentList;
    },
  },
  created() {
    if (!this.equipmentList.length) {
      this.$store.dispatch("fetchEquipmentList");
    }
  },
}
</script>

<style scoped>
.equipment-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #4a4a4a;
}

.no-equipment {
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.create-button {
  font-size: 18px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  margin-top: 10px;
  margin-right: 10px;
}
</style>