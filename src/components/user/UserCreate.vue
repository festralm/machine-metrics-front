<template>
    <div class="user-create">
        <h1 class="title">Создать пользователя</h1>
        <form @submit.prevent="createUser">
            <div class="form-group">
                <label for="firstName">Имя</label>
                <input id="firstName" type="text" v-model="firstName" required/>
            </div>
            <div class="form-group">
                <label for="lastName">Фамилия</label>
                <input id="lastName" type="text" v-model="lastName" required/>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="email" required/>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input id="password" type="password" v-model="password" required/>
            </div>
            <div class="form-group">
                <label for="role">Роль</label>
                <select id="role" v-model="roleName">
                    <option value=""></option>
                    <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.description }}</option>
                </select>
            </div>
            <div class="form-group">
                <button class="save-button" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "UserCreate",
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            roleName: null,
        };
    },
    computed: {
        roles() {
            return this.getRoleList();
        },
    },
    created() {
        this.fetchRoleList();
    },
    methods: {
        ...mapActions('role', ['fetchRoleList']),
        ...mapGetters('role', ['getRoleList']),
        ...mapActions('user', ['saveUser']),
        async createUser() {
            const userData = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                roleName: this.roleName,
            }

            const response = await this.saveUser(userData)
            if (response.ok) {
                this.$router.push({name: 'UserDetails', params: {id: response.updatedUser}})
            }
        },
    },
};
</script>

<style scoped>
.user-create {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
    color: #3f51b5;
}

.form-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
}

label {
    font-size: 18px;
    margin-right: 10px;
    color: #444;
}

input {
    flex-grow: 1;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
}

.save-button {
    background-color: #3f51b5;
    color: white;
    font-size: 18px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.save-button:hover {
    background-color: #2c3e50;
}
</style>