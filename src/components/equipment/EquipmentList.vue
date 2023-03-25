<template>
  <div class="equipment-list">
    <h1>Оборудование</h1>
    <div v-for="equipment in equipmentList" :key="equipment.id">
      <equipment-item :equipment="equipment"/>
    </div>
  </div>
</template>

<script>
import EquipmentItem from './EquipmentItem.vue';
import {mapGetters} from "vuex";

export default {
  name: "EquipmentList",
  components: {
    EquipmentItem,
  },
  data() {
    return {
      equipmentList: [],
    };
  },
  computed: {
    ...mapGetters(["equipmentList"]),
  },
  mounted() {
    this.$store.dispatch("fetchEquipmentList");
  },
}
</script>

<style scoped>
.equipment-list {
  max-width: 800px;
  margin: 0 auto;
}
</style>