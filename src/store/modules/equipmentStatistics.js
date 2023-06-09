import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const equipmentStatistics = {
    namespaced: true,
    state: {
        currentEquipmentStatistics: null,
    },
    mutations: {
        setCurrentEquipmentStatistics(state, equipmentStatistics) {
            state.currentEquipmentStatistics = equipmentStatistics
        },
    },
    actions: {
        async fetchEquipmentStatistics({commit}, data) {
            try {
                let url = `${API_URL}/equipment-data`;
                if (data.ids) {
                    url += `?ids=${data.ids}`;
                }
                if (data.start) {
                    url += `${data.ids ? '&' : '?'}start=${data.start}`;
                }
                if (data.stop) {
                    url += `${data.ids || data.start ? '&' : '?'}stop=${data.stop}`;
                }
                const response = await fetchWithResponseCheck(url)
                const equipmentStatistics = await response.json()
                commit('setCurrentEquipmentStatistics', equipmentStatistics);
            } catch (error) {
                console.error(error);
            }
        },
    },
    getters: {
        getCurrentEquipmentStatistics: state => state.currentEquipmentStatistics
    },
}

export default equipmentStatistics