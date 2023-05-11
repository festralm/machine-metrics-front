<template>
  <div class="equipment-list">
    <h1 class="title">Оборудование</h1>
    <div v-if="equipmentList && equipmentList.length > 0">
      <div v-for="equipment in equipmentList" :key="equipment.id">
        <equipment-item :equipment="equipment"/>
      </div>
    </div>
    <div v-else>
      <p class="no-equipment">Нет доступного оборудования</p>
    </div>
      <div v-if="canCreate()">
          <router-link :to="{ name: 'EquipmentCreate' }">
              <button class="create-button">Создать оборудование</button>
          </router-link>
      </div>
  </div>
</template>

<script>
import EquipmentItem from './EquipmentItem.vue';
import {RouterLink} from 'vue-router';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "EquipmentList",
    components: {
        EquipmentItem,
        RouterLink,
    },
    computed: {
        equipmentList() {
            return this.getEquipmentList();
        },
        role() {
            return this.getRole();
        },
    },
    created() {
        this.fetchEquipmentList();
    },
    methods: {
        ...mapGetters('equipment', ['getEquipmentList']),
        ...mapActions('equipment', ['fetchEquipmentList']),
        ...mapGetters('auth', ['getRole']),
        canCreate() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        }
    },
}
</script>

<style scoped>
.equipment-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #4a4a4a;
  text-shadow: 1px 1px #eee;
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
  background-color: #2f2f3e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  margin-top: 10px;
  margin-right: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #0097a7;
}


</style>