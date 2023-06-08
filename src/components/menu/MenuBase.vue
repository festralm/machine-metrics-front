<template>
    <div class="menu">
        <div class="menu-item logo">
            <router-link :to="{ name: 'Home' }">
                <img
                    src="@/assets/logo.png"
                    alt="Main Logo"
                    class="logo"
                    width="50"
                >
            </router-link>
        </div>

        <div class="menu-item buttons">
            <div class="buttons-item">
                <router-link :to="{ name: 'EquipmentList' , query: {}}">Оборудование</router-link>
            </div>
            <div class="buttons-item">
                <router-link :to="{ name: 'EquipmentStatistics' , query: {}}">Статистика</router-link>
            </div>
            <div class="dropdown" v-if="hasAdminRights()">
                <span class="dropbtn buttons-item">
                    Администрирование
                </span>
                <ul class="dropdown-content">
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
                        <router-link :to="{ name: 'PurposeList' }">Список назначений оборудования</router-link>
                    </li>
                    <li v-if="canGetStatus()">
                        <router-link :to="{ name: 'StatusList' }">Список статусов</router-link>
                    </li>
                    <li v-if="canGetUnit()">
                        <router-link :to="{ name: 'UnitList' }">Список подразделений</router-link>
                    </li>
                    <li v-if="canGetAddress()">
                        <router-link :to="{ name: 'AddressList' }">Список адресов</router-link>
                    </li>
                    <li v-if="canGetUsageType()">
                        <router-link :to="{ name: 'UsageTypeList' }">Список типов использования оборудования
                        </router-link>
                    </li>
                    <li v-if="canGetSchedule()">
                        <router-link :to="{ name: 'ScheduleList' }">Список расписаний</router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="authUser" class="user-info menu-item">
            <div class="user-info-item names">
                <p class="name" v-if="authUser.lastName">{{ authUser.lastName }}</p>
                <p class="name" v-if="authUser.firstName">{{ authUser.firstName }}</p>
            </div>
            <div class="user-info-item logout">
                <button class="logout-button" @click="keycloakLogout">Выйти</button>
            </div>
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
        hasAdminRights() {
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
        canGetAddress() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetUsageType() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
        canGetSchedule() {
            return this.role === 'ADMIN' || this.role === 'MODERATOR'
        },
    },
}
</script>

<style scoped>

.menu {
    background-color: rgb(0, 85, 144);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
}

.menu ul {
    list-style: none;
}

.logo img {
    margin-left: 100px;
    padding-right: 80px;
}

.buttons {
    align-items: center;
    display: flex;
    color: white;
}

a, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
}

.buttons-item {
    cursor: pointer;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    font-size: 20px;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown-content li {
    text-decoration: none;
    display: block;
    text-align: left;
    padding-top: 10px;
    padding-bottom: 10px;
}

.dropdown-content li:last-child {
    padding-bottom: 20px;
}

.dropdown-content {
    color: white;
    font-weight: 600;
    display: none;
    position: absolute;
    background-color: rgb(0, 95, 160);
    min-width: 250px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 0 0 5px 5px;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropbtn {
    padding-top: 20px;
    padding-bottom: 20px;
}

.user-info {
    align-items: center;
    display: flex;
    color: white;
    margin-right: 50px;
}

.user-info .logout {
    width: 70px;
}

.logout-button {
    background-color: transparent;
    font-size: 15px;
    width: 80px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: rgba(255, 255, 255, 0.27);
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.logout-button:hover {
    border-color: white;
}

.logout {
    margin-left: 10px;;
}

.name {
    padding: 0;
    margin: 2px;
}

.names {
    width: 150px;
}
</style>
