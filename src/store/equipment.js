import Vuex from 'vuex'

const API_URL = process.env.VUE_APP_API_URL
const equipment = new Vuex.Store({
    state: {
        equipmentList: []
    },
    mutations: {
        setEquipmentList(state, equipmentList) {
            state.equipmentList = equipmentList
        }
    },
    actions: {
        async fetchEquipmentList({commit}) {
            const response = await fetch(`${API_URL}/equipment`)
            const equipmentList = await response.json()
            commit('setEquipmentList', equipmentList)
        }
    },
    getters: {
        getEquipmentList: state => state.equipmentList
    }
})

export default equipment