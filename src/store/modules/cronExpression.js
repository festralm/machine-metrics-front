import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const cronExpression = {
    namespaced: true,
    state: {
        cronList: [],
    },
    mutations: {
        setCronList(state, cronList) {
            state.cronList = cronList
        },
        removeCronFromList(state, cronId) {
            state.cronList = state.cronList.filter(cron => cron.id !== cronId)
        },
    },
    actions: {
        async fetchCronExpressionsList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/cron`)
                const cronList = await response.json()
                commit('setCronList', cronList)
            } catch (error) {
                console.error(error)
            }
        },
        async deleteCronExpression({commit}, cronId) {
            try {
                const encodedId = encodeURIComponent(cronId);
                const response = await fetchWithResponseCheck(`${API_URL}/cron/${encodedId}`, {
                    method: 'DELETE'
                })

                commit('removeCronFromList', cronId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveCronExpression({state, commit}, cronData) {
            try {
                let response
                let savedCron
                response = await fetchWithResponseCheck(`${API_URL}/cron`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cronData)
                })

                savedCron = await response.json()

                commit('setCronList', [...state.cronList, savedCron])

                return {savedCron: savedCron, headers: response.headers}
            } catch (error) {
                console.error(error)
            }
        },
    },
    getters: {
        getCronList: state => state.cronList,
    }
}

export default cronExpression