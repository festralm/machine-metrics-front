<template>
  <div class="user-edit" v-if="formData">
    <h1 class="title">Изменить пользователя</h1>
    <form @submit.prevent="updateUser">
        <table class="equipment-table">
            <tr class="name">
                <td class="label"><label for="firstName">Имя</label></td>
                <td class="value"><input id="firstName" type="text" v-model="formData.firstName" required/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="lastName">Фамилия</label></td>
                <td class="value"><input id="lastName" type="text" v-model="formData.lastName" required/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="password">Пароль</label></td>
                <td class="value"><input id="password" type="password" v-model="formData.password"/></td>
            </tr>
            <tr class="name">
                <td class="label"><label for="role">Роль</label></td>
                <td class="value"><select id="role" v-model="formData.roleName">
                    <option value=""></option>
                    <option v-for="role in roles" :key="role.id" :value="role.description">{{
                            role.description
                        }}
                    </option>
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

.equipment-table input[type=text], .equipment-table input[type=email], .equipment-table select, .equipment-table input[type=password], .equipment-table input[type=number] {
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