<template>
    <div class="user-create">
        <h1 class="title">Создать пользователя</h1>
        <form @submit.prevent="createUser">
            <table class="equipment-table">
                <tr class="name">
                    <td class="label"><label for="firstName">Имя</label></td>
                    <td class="value"><input id="firstName" type="text" v-model="firstName" required/></td>
                </tr>
                <tr class="inventory-number">
                    <td class="label"><label for="lastName">Фамилия</label></td>
                    <td class="value"><input id="lastName" type="text" v-model="lastName" required/></td>
                </tr>
                <tr class="inventory-number">
                    <td class="label"><label for="email">Email</label></td>
                    <td class="value"><input id="email" type="email" v-model="email" required/></td>
                </tr>
                <tr class="inventory-number">
                    <td class="label"><label for="password">Пароль</label></td>
                    <td class="value"><input id="password" type="password" v-model="password" required/></td>
                </tr>
                <tr class="inventory-number">
                    <td class="label"><label for="role">Роль</label></td>
                    <td class="value"><select id="role" v-model="roleName">
                        <option value=""></option>
                        <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.description }}</option>
                    </select></td>
                </tr>
            </table>
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
                this.$router.push({name: 'UserDetails', params: {id: response.updatedUser.id}})
            }
        },
    },
};
</script>

<style scoped>
.user-create {
    width: 85%;
    background-color: white;
    flex: 1;
}

.title {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    margin: 0;
    padding: 20px 0 20px 0;
    color: white;
}

form {
    margin: 50px 150px 50px 150px;
}

.equipment-table input[type=text], .equipment-table input[type=email], .equipment-table input[type=password], .equipment-table input[type=number], .equipment-table select {
    width: 250px;
    height: 20px;
    border-radius: 0;
    border-width: 1px;
    outline: none;
    font-size: 15px;
}

.equipment-table select {
    margin-top: 1px;
    width: 255px;
    height: 23px;
}

.equipment-table tr {
    font-size: 15px;
    border-bottom: 1px solid #ccc;
}

.equipment-table td {
    width: 300px;
}

.save-button {
    background-color: rgb(0, 85, 144);
    font-size: 15px;
    width: 200px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
    margin-top: 20px;
}

.save-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
</style>