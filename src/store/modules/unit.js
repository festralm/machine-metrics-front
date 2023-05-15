import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const unit = {
    namespaced: true,
    state: {
        unitList: [],
    },
    mutations: {
        setUnitList(state, unitList) {
            state.unitList = unitList
        },
        removeUnitFromList(state, unitId) {
            state.unitList = state.unitList.filter(unit => unit.id !== unitId)
        },
    },
    actions: {
        async fetchUnitList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/unit`)
                const unitList = await response.json()
                commit('setUnitList', unitList)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteUnit({commit}, unitId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/unit/${unitId}`, {
                    method: 'DELETE'
                })

                commit('removeUnitFromList', unitId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveUnit({state, commit}, unitData) {
            try {
                let response
                let savedUnit
                response = await fetchWithResponseCheck(`${API_URL}/unit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(unitData)
                })

                savedUnit = await response.json()

                commit('setUnitList', [...state.unitList, savedUnit])

                return {ok: true, savedUnit: savedUnit, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getUnitList: state => state.unitList,
    }
}

export default unit