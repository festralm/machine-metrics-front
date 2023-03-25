<template>
  <div class="equipment-item">
    <h2>{{ equipment.name }}</h2>
    <p>ID: {{ equipment.id }}</p>
    <p>Статус: {{ equipment.status }}</p>
  </div>
</template>

<script>
export default {
  name: "EquipmentItem",
  props: {
    equipment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.equipment-item {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>