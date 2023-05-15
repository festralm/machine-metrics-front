import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const usageType = {
    namespaced: true,
    state: {
        usageTypeList: [],
    },
    mutations: {
        setUsageTypeList(state, usageTypeList) {
            state.usageTypeList = usageTypeList
        },
        removeUsageTypeFromList(state, usageTypeId) {
            state.usageTypeList = state.usageTypeList.filter(usageType => usageType.id !== usageTypeId)
        },
    },
    actions: {
        async fetchUsageTypeList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/usage-type`)
                const usageTypeList = await response.json()
                commit('setUsageTypeList', usageTypeList)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteUsageType({commit}, usageTypeId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/usage-type/${usageTypeId}`, {
                    method: 'DELETE'
                })

                commit('removeUsageTypeFromList', usageTypeId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveUsageType({state, commit}, usageTypeData) {
            try {
                let response
                let savedUsageType
                response = await fetchWithResponseCheck(`${API_URL}/usage-type`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usageTypeData)
                })

                savedUsageType = await response.json()

                commit('setUsageTypeList', [...state.usageTypeList, savedUsageType])

                return {ok: true, savedUsageType: savedUsageType, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getUsageTypeList: state => state.usageTypeList,
    }
}

export default usageType