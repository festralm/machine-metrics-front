<template>
  <div id="app">
    <MenuBase/>
    <router-view/>
  </div>
</template>

<script>
import MenuBase from "@/components/menu/MenuBase.vue";

export default {
  name: 'App',
  components: {
    MenuBase,
  },
}
</script>

<style>
#app {
  text-align: center;
}
</style>
