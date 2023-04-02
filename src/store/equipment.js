import Vuex from 'vuex'

const API_URL = process.env.VUE_APP_API_URL
const equipment = new Vuex.Store({
    state: {
        equipmentList: [],
        currentEquipment: null
    },
    mutations: {
        setEquipmentList(state, equipmentList) {
            state.equipmentList = equipmentList
        },
        setCurrentEquipment(state, equipment) {
            state.currentEquipment = equipment
        },
        removeEquipmentFromList(state, equipmentId) {
            state.equipmentList = state.equipmentList.filter(equipment => equipment.id !== equipmentId)
        },
    },
    actions: {
        async fetchEquipmentList({commit}) {
            const response = await fetch(`${API_URL}/equipment`)
            const equipmentList = await response.json()
            commit('setEquipmentList', equipmentList)
        },
        async fetchEquipmentById({commit}, id) {
            try {
                const response = await fetch(`${API_URL}/equipment/${id}`)
                const equipment = await response.json()
                commit('setCurrentEquipment', equipment);
            } catch (error) {
                console.error(error);
            }
        },
        async saveEquipment({state, commit}, equipmentData) {
            try {
                let response
                let updatedEquipment

                if (equipmentData.id) {
                    response = await fetch(`${API_URL}/equipment/${equipmentData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(equipmentData)
                    })

                    updatedEquipment = await response.json()
                } else {
                    response = await fetch(`${API_URL}/equipment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(equipmentData)
                    })

                    updatedEquipment = await response.json()

                    commit('setEquipmentList', [...state.equipmentList, updatedEquipment])
                }

                return {updatedEquipment, headers: response.headers}
            } catch (error) {
                console.error(error)
            }
        },
        async deleteEquipment({commit}, equipmentId) {
            try {
                const response = await fetch(`${API_URL}/equipment/${equipmentId}`, {
                    method: 'DELETE'
                })

                commit('removeEquipmentFromList', equipmentId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getEquipmentList: state => state.equipmentList,
        getCurrentEquipment: state => state.currentEquipment
    }
})

export default equipment