<template>
  <div class="user-item" @click="goToDetails">
    <div>
      <h2>{{ user.firstName }} {{ user.lastName }}</h2>
    </div>
    <button class="delete-button" @click.stop="deleteUser(user.id)">Удалить</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
      ...mapActions('user', ['deleteUser']),
      goToDetails() {
          this.$router.push({name: 'UserDetails', params: {id: this.user.id}})
      },
  },
}
</script>

<style scoped>
.user-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 20px 20px 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.02);
    cursor: pointer;
}

.user-item:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

.user-item h2 {
    font-size: 22px;
    color: #333;
    font-weight: bold;
    margin: 10px 20px 10px 20px;
}


.delete-button {
    background-color: rgba(144, 0, 0, 0.69);
    font-size: 15px;
    width: 100px;
    height: 35px;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    border-width: 1px;
    cursor: pointer;
}

.delete-button:hover {
    border-color: rgba(255, 255, 255, 0.27);
}
</style>