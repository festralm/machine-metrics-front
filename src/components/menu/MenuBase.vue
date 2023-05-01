<template>
  <div class="menu">
    <router-link :to="{ name: 'Home' }">
      <img src="/logo.png" alt="Main Logo" class="logo">
    </router-link>
    <ul class="menu-items">
        <li>
            <router-link :to="{ name: 'EquipmentList' }">Оборудование</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'ServiceList' }">Список сервисов</router-link>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MenuBase"
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 200px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  height: 40px;
  margin-bottom: 20px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-items li {
  margin-bottom: 10px;
}

.menu-items li:first-child {
  margin-top: 0;
}
</style>
