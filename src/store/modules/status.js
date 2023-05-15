import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const status = {
    namespaced: true,
    state: {
        statusList: [],
    },
    mutations: {
        setStatusList(state, statusList) {
            state.statusList = statusList
        },
        removeStatusFromList(state, statusId) {
            state.statusList = state.statusList.filter(status => status.id !== statusId)
        },
    },
    actions: {
        async fetchStatusList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/status`)
                const statusList = await response.json()
                commit('setStatusList', statusList)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteStatus({commit}, statusId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/status/${statusId}`, {
                    method: 'DELETE'
                })

                commit('removeStatusFromList', statusId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveStatus({state, commit}, statusData) {
            try {
                let response
                let savedStatus
                response = await fetchWithResponseCheck(`${API_URL}/status`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(statusData)
                })

                savedStatus = await response.json()

                commit('setStatusList', [...state.statusList, savedStatus])

                return {ok: true, savedStatus: savedStatus, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getStatusList: state => state.statusList,
    }
}

export default status