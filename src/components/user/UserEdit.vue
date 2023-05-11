<template>
  <div class="user-edit" v-if="formData">
    <h1 class="title">Изменить пользователя</h1>
    <form @submit.prevent="updateUser">
        <div class="form-group">
            <label for="firstName">Имя</label>
            <input id="firstName" type="text" v-model="formData.firstName" required/>
        </div>
        <div class="form-group">
            <label for="lastName">Фамилия</label>
            <input id="lastName" type="text" v-model="formData.lastName" required/>
        </div>
        <div class="form-group">
            <label for="password">Пароль</label>
            <input id="password" type="password" v-model="formData.password"/>
        </div>
        <div class="form-group">
            <label for="role">Роль</label>
            <select id="role" v-model="formData.roleName">
                <option value=""></option>
                <option v-for="role in roles" :key="role.id" :value="role.description">{{ role.description }}</option>
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
  name: "UserEdit",
  data() {
    return {
      formData: {
          id: this.$route.params.id,
          firstName: null,
          lastName: null,
          password: null,
          roleName: null,
      }
    }
  },
  created() {
      const userId = this.$route.params.id;
      this.fetchUserById(userId);
      this.fetchRoleList();
  },
  methods: {
      ...mapActions('role', ['fetchRoleList']),
      ...mapGetters('role', ['getRoleList']),
      ...mapActions('user', ['saveUser', 'fetchUserById']),
      ...mapGetters('user', ['getCurrentUser']),
      updateUser() {
          this.formData.roleName = this.roles.filter(x => x.description === this.formData.roleName)[0].name
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
      roles() {
          return this.getRoleList();
      },
  },
  watch: {
    currentUser: {
      handler(user) {
        this.formData = {
            id: this.$route.params.id,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            roleName: user.realmRoles[0],
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