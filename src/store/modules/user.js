import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const user = {
    namespaced: true,
    state: {
        userList: [],
        currentUser: null,
    },
    mutations: {
        setUserList(state, userList) {
            state.userList = userList
        },
        setCurrentUser(state, user) {
            state.currentUser = user
        },
        removeUserFromList(state, userId) {
            state.userList = state.userList.filter(user => user.id !== userId)
        },
        replaceUserInList(state, data) {
            const index = state.userList.findIndex(item => item.id === data.id);

            if (index !== -1) {
                state.userList.splice(index, 1, data.user);
            }
        },
    },
    actions: {
        async fetchUserList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/user`)
                const userList = await response.json()
                commit('setUserList', userList)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUserById({commit}, id) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/user/${id}`)
                const user = await response.json()
                commit('setCurrentUser', user);
            } catch (error) {
                console.error(error);
            }
        },
        async saveUser({state, commit}, userData) {
            try {
                let response
                let updatedUser

                let userId = userData.id;
                if (userId) {
                    response = await fetchWithResponseCheck(`${API_URL}/user/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                    updatedUser = await response.json()
                    commit('replaceUserInList', {id: userId, user: updatedUser})
                } else {
                    response = await fetchWithResponseCheck(`${API_URL}/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                    updatedUser = await response.json()
                    commit('setUserList', [...state.userList, updatedUser])
                }

                commit('setCurrentUser', updatedUser);

                return {ok: true, updatedUser, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
        async deleteUser({state, commit}, userId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/user/${userId}`, {
                    method: 'DELETE'
                })

                commit('removeUserFromList', userId)
                if (state.currentUser != null && state.currentUser.id === userId) {
                    commit('setCurrentUser', null);
                }

                return response.ok
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getUserList: state => state.userList,
        getCurrentUser: state => state.currentUser
    }
}

export default user