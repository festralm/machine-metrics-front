<template>
  <div class="equipment-item">
    <h2>{{ equipment.name }}</h2>
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

.equipment-item h2 {
  text-align: left;
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}
</style>