<template>
  <div id="app">
      <div>
          <MenuBase/>
      </div>
      <div class="content">
          <router-view/>
      </div>
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

.content {
    margin-top: 60px; /* Add a top margin to avoid content overlay */
    background-color: rgb(0, 95, 160);
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    min-height: calc(100vh - 60px); /* Subtract menu height from viewport height */
    flex-direction: column;
}

* {
    font-family: 'Roboto', sans-serif;
}

html, body {
    margin: 0;
    padding: 0;
}
</style>
