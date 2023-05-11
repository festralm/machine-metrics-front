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
            <router-link :to="{ name: 'UserList' }">Пользователи</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'ServiceList' }">Список сервисов</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'CronExpressionList' }">Список cron-выражений</router-link>
        </li>
        <button class="logout-button" @click="keycloakLogout">Выйти</button>
    </ul>

      <div v-if="authUser" class="user-info">
          <p>{{ authUser.firstName }} {{ authUser.lastName }}</p>
          <p>{{ authUser.realmRoles[0] }}</p>
      </div>
  </div>
</template>

<script>

import {logout} from "@/main";
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "MenuBase",
    computed: {
        authUser() {
            return this.getAuthUser()
        },
    },
    async created() {
        await this.fetchAuthUser()
    },
    methods: {
        ...mapActions('user', ['fetchAuthUser']),
        ...mapGetters('user', ['getAuthUser']),
        keycloakLogout() {
            window.localStorage.removeItem('keycloakToken')
            logout()
        }
    },
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
