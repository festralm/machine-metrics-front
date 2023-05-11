<template>
    <div class="user-detail" v-if="user">
        <h1 class="title">{{ user.firstName }} {{ user.lastName }}</h1>
        <div class="info-group">
            <label for="surname">Email:</label>
            <span id="surname">{{ user.username }}</span>
        </div>
        <div class="info-group">
            <label for="role">Роль:</label>
            <span id="role">{{ user.realmRoles[0] }}</span>
        </div>
        <div class="button-group">
            <router-link class="edit-button" :to="{name: 'UserEdit', params: {id: user.id}}">Редактировать
            </router-link>
            <button class="delete-button" @click="deleteCurrentUser()">Удалить</button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "UserDetails",
    data() {
        return {
            showModal: false,
        }
    },
    computed: {
        user() {
            return this.getCurrentUser()
        },
    },
    async created() {
        const userId = this.$route.params.id
        await this.fetchUserById(userId)
    },
    methods: {
        ...mapActions('user', ['fetchUserById', 'deleteUser']),
        ...mapGetters('user', ['getCurrentUser']),
        formatDate(dateString) {
            if (!dateString) return ''
            const date = new Date(dateString)
            const day = date.getDate().toString().padStart(2, '0')
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        },
        async deleteCurrentUser() {
            await this.deleteUser(this.user.id);
            this.$router.push({name: 'UserList'});
        },
    },
}
</script>

<style scoped>
.user-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.title {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
    color: #3f51b5;
}

.info-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.info-group:last-of-type {
    border-bottom: none;
}

label {
    font-size: 18px;
    margin-right: 10px;
    color: #444;
}

span {
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #f5f5f5;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.delete-button {
    font-size: 16px;
    background-color: #f44336;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
}

.delete-button:hover {
    background-color: #d32f2f;
}

.delete-button:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.edit-button {
    font-size: 16px;
    background-color: #2196f3;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-right: 10px;
}

.edit-button:hover {
    background-color: #1976d2;
}

.edit-button:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

</style>