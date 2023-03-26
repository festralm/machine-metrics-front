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
        },
        async saveEquipment({state, commit}, equipmentData) {
            try {
                const response = await fetch(`${API_URL}/equipment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(equipmentData)
                })

                const newEquipment = await response.json()

                // Add the new equipment to the equipment list in the store
                commit('setEquipmentList', [...state.equipmentList, newEquipment])

                return newEquipment
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getEquipmentList: state => state.equipmentList
    }
})

export default equipment