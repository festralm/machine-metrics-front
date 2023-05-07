import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const equipmentSchedule = {
    namespaced: true,
    state: {
        currentEquipmentSchedule: null,
    },
    mutations: {
        setCurrentEquipmentSchedule(state, equipmentSchedule) {
            state.currentEquipmentSchedule = equipmentSchedule
        },
    },
    actions: {
        async fetchEquipmentScheduleById({commit}, id) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/equipment-info/${id}`)
                var equipmentSchedule
                    equipmentSchedule = await response.json()
            } catch (error) {
                if (error.status === 404) {
                    equipmentSchedule = {enabled: false}
                } else {
                    console.error(error);
                }
            }
            commit('setCurrentEquipmentSchedule', equipmentSchedule);
        },
        async saveEquipmentSchedule({commit}, equipmentSchedule) {
            try {
                let response
                let updatedEquipmentSchedule
                response = await fetchWithResponseCheck(`${API_URL}/equipment-info`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(equipmentSchedule)
                })

                updatedEquipmentSchedule = await response.json()
                commit('setCurrentEquipmentSchedule', updatedEquipmentSchedule);

                return {ok: true, updatedEquipmentSchedule: updatedEquipmentSchedule, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getCurrentEquipmentSchedule: state => state.currentEquipmentSchedule
    },
}

export default equipmentSchedule