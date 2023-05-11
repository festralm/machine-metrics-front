<template>
  <div class="user-item" @click="goToDetails">
    <div>
      <h2>{{ user.firstName }} {{ user.lastName }}</h2>
    </div>
    <button @click.stop="deleteUser(user.id)">Удалить</button>
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
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.user-item:hover {
  background-color: #f5f5f5;
}

.user-item h2 {
  text-align: left;
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}

.info-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}

.info-group label {
  font-size: 18px;
  margin-right: 10px;
  color: #444;
}

.info-group span {
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: #333;
}

.user-item button {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-item button:hover {
  background-color: #b71c1c;
}

.user-item button:focus {
  outline: none;
}

.user-item button:active {
  background-color: #ba000d;
}
</style>