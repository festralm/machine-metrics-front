import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const role = {
    namespaced: true,
    state: {
        roleList: [],
    },
    mutations: {
        setRoleList(state, roleList) {
            state.roleList = roleList
        },
    },
    actions: {
        async fetchRoleList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/role`)
                const roleList = await response.json()
                commit('setRoleList', roleList)
            } catch (error) {
                console.error(error)
            }
        },
    },
    getters: {
        getRoleList: state => state.roleList,
    }
}

export default role