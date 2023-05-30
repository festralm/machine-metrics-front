<template>
    <div class="user-detail" v-if="user">
        <h1 class="title">{{ user.firstName }} {{ user.lastName }}</h1>
        <table class="equipment-table">
            <tr class="name">
                <td class="label"><label for="surname">Email:</label></td>
                <td class="value">{{ user.username }}</td>
            </tr>
            <tr class="name">
                <td class="label"><label for="role">Роль:</label></td>
                <td class="value">{{ user.realmRoles[0] }}</td>
            </tr>
        </table>
        <div class="button-group">
            <button class="edit-button cron-button"
                    @click="goTo({name: 'UserEdit', params: {id: user.id}})">Редактировать
            </button>
            <button class="delete-button cron-button" @click="deleteCurrentUser()">Удалить</button>
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
        goTo(obj) {
            this.$router.push(obj)
        },
    },
}
</script>

<style scoped>
.user-detail {
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

.equipment-table {
    width: 100%;
    border-collapse: collapse;
}

.equipment-table tr {
    font-size: 13px;
    border-bottom: 1px solid rgba(0, 85, 144, 0.69);
}

.equipment-table td {
    padding: 5px;
    width: auto;
}

.equipment-table .label {
    font-weight: bold;
    text-align: right;
    padding-right: 30px;
    width: 350px;
}

.equipment-table .value {
    padding-left: 0;
    text-align: left;
    width: 350px;
}
.cron-button {
    background-color: rgba(0, 85, 144, 0.69);
    font-size: 15px;
    width: 150px;
    height: 30px;
    color: white;
    font-weight: bold;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
}

.cron-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}

.delete-button {
    margin-left: 20px;
    background-color: rgba(144, 0, 0, 0.69);
}

.button-group {
    margin-top: 20px;
}
</style>