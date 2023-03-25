<template>
  <div id="app">
    <equipment-list/>
  </div>
</template>

<script>
import EquipmentList from './components/equipment/EquipmentList.vue';

export default {
  name: 'App',
  components: {
    EquipmentList,
  },
}
</script>

<style>
#app {
  text-align: center;
}
</style>
