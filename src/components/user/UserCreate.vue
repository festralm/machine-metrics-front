<template>
    <div class="user-create">
        <h1 class="title">Создать пользователя</h1>
        <form @submit.prevent="createUser">
            <div class="form-group">
                <label for="name">Имя*</label>
                <input id="name" type="text" v-model="name" required/>
            </div>
            <div class="form-group">
                <label for="surname">Фамилия</label>
                <input id="surname" type="text" v-model="surname"/>
            </div>
            <div class="form-group">
                <button class="save-button" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: "UserCreate",
    data() {
        return {
            name: null,
            surname: null,
        };
    },
    methods: {
        ...mapActions('user', ['saveUser']),
        async createUser() {
            const userData = {
                name: this.name,
                surname: this.surname,
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