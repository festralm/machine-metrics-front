<template>
  <div class="user-list">
    <h1 class="title">Пользователи</h1>
    <div v-if="userList && userList.length > 0">
      <div v-for="user in userList" :key="user.id">
        <user-item :user="user"/>
      </div>
    </div>
    <div v-else>
      <p class="no-user">Нет доступных пользователей</p>
    </div>
    <router-link :to="{ name: 'UserCreate' }">
      <button class="create-button">Создать пользователя</button>
    </router-link>
  </div>
</template>

<script>
import UserItem from './UserItem.vue';
import {RouterLink} from 'vue-router';
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "UserList",
    components: {
        UserItem,
        RouterLink,
    },
    computed: {
        userList() {
            return this.getUserList();
        },
    },
    created() {
        this.fetchUserList();
    },
    methods: {
        ...mapGetters('user', ['getUserList']),
        ...mapActions('user', ['fetchUserList']),
    },
}
</script>

<style scoped>
.user-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
}

.title {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #4a4a4a;
  text-shadow: 1px 1px #eee;
}

.no-user {
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
  color: #666;
}

.create-button {
  font-size: 18px;
  padding: 10px;
  background-color: #2f2f3e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  margin-top: 10px;
  margin-right: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #0097a7;
}


</style>