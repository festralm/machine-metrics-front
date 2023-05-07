<template>
  <div class="user-edit" v-if="formData">
    <h1 class="title">Изменить пользователя</h1>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="name">Имя*</label>
        <input id="name" type="text" v-model="formData.name" required/>
      </div>
      <div class="form-group">
        <label for="surname">Фамилия</label>
        <input id="surname" type="text" v-model="formData.surname"/>
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
  name: "UserEdit",
  data() {
    return {
      formData: {
        id: this.$route.params.id,
        name: null,
        surname: null,
      }
    }
  },
  created() {
      const userId = this.$route.params.id;
      this.fetchUserById(userId);
  },
  methods: {
      ...mapActions('user', ['saveUser', 'fetchUserById']),
      ...mapGetters('user', ['getCurrentUser']),
      updateUser() {
          this.formData.receiptDate = this.formData.receiptDate ? new Date(this.formData.receiptDate).toISOString() : null;
          this.formData.lastOperationDate = this.formData.lastOperationDate ? new Date(this.formData.lastOperationDate).toISOString() : null;
          this.saveUser(this.formData)
              .then((response) => {
                  this.$router.push({name: 'UserDetails', params: {id: response.updatedUser.id}})
              })
              .catch((error) => {
                  console.error(error)
              })
      },
  },
  computed: {
    currentUser() {
        return this.getCurrentUser() || {}
    },
  },
  watch: {
    currentUser: {
      handler(user) {
        this.formData = {
          id: this.$route.params.id,
          name: user.name,
          surname: user.surname,
        }
      },
      immediate: true, // update form data immediately after mounted
    },
  },
}
</script>

<style scoped>
.user-edit {
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