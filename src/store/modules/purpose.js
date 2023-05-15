import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const purpose = {
    namespaced: true,
    state: {
        purposeList: [],
    },
    mutations: {
        setPurposeList(state, purposeList) {
            state.purposeList = purposeList
        },
        removePurposeFromList(state, purposeId) {
            state.purposeList = state.purposeList.filter(purpose => purpose.id !== purposeId)
        },
    },
    actions: {
        async fetchPurposeList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/purpose`)
                const purposeList = await response.json()
                commit('setPurposeList', purposeList)
            } catch (error) {
                console.log(error)
            }
        },
        async deletePurpose({commit}, purposeId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/purpose/${purposeId}`, {
                    method: 'DELETE'
                })

                commit('removePurposeFromList', purposeId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async savePurpose({state, commit}, purposeData) {
            try {
                let response
                let savedPurpose
                response = await fetchWithResponseCheck(`${API_URL}/purpose`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(purposeData)
                })

                savedPurpose = await response.json()

                commit('setPurposeList', [...state.purposeList, savedPurpose])

                return {ok: true, savedPurpose: savedPurpose, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getPurposeList: state => state.purposeList,
    }
}

export default purpose