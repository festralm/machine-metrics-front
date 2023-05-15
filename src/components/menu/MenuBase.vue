<template>
  <div class="menu">
    <router-link :to="{ name: 'Home' }">
      <img src="/logo.png" alt="Main Logo" class="logo">
    </router-link>
    <ul class="menu-items">
        <li>
            <router-link :to="{ name: 'EquipmentList' }">Оборудование</router-link>
        </li>
        <li v-if="canGetUsers()">
            <router-link :to="{ name: 'UserList' }">Пользователи</router-link>
        </li>
        <li v-if="canGetDataService()">
            <router-link :to="{ name: 'ServiceList' }">Список сервисов</router-link>
        </li>
        <li v-if="canGetCron()">
            <router-link :to="{ name: 'CronExpressionList' }">Список cron-выражений</router-link>
        </li>
        <li v-if="canGetCountry()">
            <router-link :to="{ name: 'CountryList' }">Список стран</router-link>
        </li>
        <li v-if="canGetPurpose()">
            <router-link :to="{ name: 'PurposeList' }">Список назначений</router-link>
        </li>
        <li v-if="canGetStatus()">
            <router-link :to="{ name: 'StatusList' }">Список статусов</router-link>
        </li>
        <li v-if="canGetUnit()">
            <router-link :to="{ name: 'UnitList' }">Список подразделений</router-link>
        </li>
        <li v-if="canGetUsageType()">
            <router-link :to="{ name: 'UsageTypeList' }">Список типов использования</router-link>
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
        role() {
            return this.getRole();
        },
    },
    async created() {
        await this.fetchAuthUser()
    },
    methods: {
        ...mapActions('user', ['fetchAuthUser']),
        ...mapGetters('user', ['getAuthUser']),
        ...mapGetters('auth', ['getRole']),
        keycloakLogout() {
            window.localStorage.removeItem('keycloakToken')
            logout()
        },
        canGetUsers() {
            return this.role === 'ADMIN'
        },
        canGetCron() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetDataService() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetCountry() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetPurpose() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetStatus() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetUnit() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetUsageType() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
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
