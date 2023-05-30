<template>
  <div class="user-list">
      <h1 class="title">Пользователи</h1>
      <div class="create-div">
          <router-link :to="{ name: 'UserCreate' }">
              <button class="create-button">Создать пользователя</button>
          </router-link>
      </div>
      <div v-if="userList && userList.length > 0">
          <div v-for="user in userList" :key="user.id">
              <user-item :user="user"/>
          </div>
      </div>
      <div v-else>
          <p class="no-user">Нет доступных пользователей</p>
      </div>
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

.create-div {
    margin: 30px 20px 0 0;
    display: flex;
    justify-content: flex-end;
}

.no-user {
    font-size: 30px;
}

.create-button {
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
}

.create-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}


</style>