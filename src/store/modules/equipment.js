import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const equipment = {
    namespaced: true,
    state: {
        equipmentPage: {},
        equipmentSearchPage: {},
        equipmentSearchList: {},
        currentEquipment: null,
    },
    mutations: {
        setEquipmentPage(state, equipmentPage) {
            state.equipmentPage = equipmentPage
        },
        setEquipmentSearchPage(state, equipmentSearchPage) {
            state.equipmentSearchPage = equipmentSearchPage
        },
        setEquipmentSearchList(state, equipmentSearchList) {
            state.equipmentSearchList = equipmentSearchList
        },
        setCurrentEquipment(state, equipment) {
            state.currentEquipment = equipment
        },
        removeEquipmentFromList(state, equipmentId) {
            state.equipmentPage.content = state.equipmentPage.content.filter(equipment => equipment.id !== equipmentId)
            state.equipmentPage.totalElements = state.equipmentPage.totalElements - 1
        },
        replaceEquipmentInList(state, data) {
            const index = state.equipmentPage.content.findIndex(item => item.id === data.id);

            if (index !== -1) {
                state.equipmentPage.content.splice(index, 1, data.equipment);
            }
        },
    },
    actions: {
        async fetchEquipmentPage({commit}, data) {
            try {
                const response = await fetchWithResponseCheck(
                    `${API_URL}/equipment` +
                    `?page=${data.page - 1}` +
                    `&size=${data.size}`
                )
                const equipmentPage = await response.json()
                commit('setEquipmentPage', equipmentPage)
            } catch (error) {
                console.log(error)
            }
        },
        async searchEquipmentPage({commit}, data) {
            try {
                const response = await fetchWithResponseCheck(
                    `${API_URL}/equipment/search-pageable` +
                    `?name=${data.name}` +
                    `&page=${data.page - 1}` +
                    `&size=${data.size}`
                )
                const equipmentSearchPage = await response.json()
                commit('setEquipmentSearchPage', equipmentSearchPage)
            } catch (error) {
                console.log(error)
            }
        },
        async searchEquipmentList({commit}, data) {
            try {
                const response = await fetchWithResponseCheck(
                    `${API_URL}/equipment/search?unit=${data.unit}`
                )
                const equipmentSearchList = await response.json()
                commit('setEquipmentSearchList', equipmentSearchList)
                return equipmentSearchList;
            } catch (error) {
                console.log(error)
            }
        },
        async fetchEquipmentById({commit}, id) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/equipment/${id}`)
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

                let equipmentId = equipmentData.id;
                if (equipmentId) {
                    response = await fetchWithResponseCheck(`${API_URL}/equipment/${equipmentId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(equipmentData)
                    })
                    updatedEquipment = await response.json()
                    commit('replaceEquipmentInList', {id: equipmentId, equipment: updatedEquipment})
                } else {
                    response = await fetchWithResponseCheck(`${API_URL}/equipment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(equipmentData)
                    })
                    updatedEquipment = await response.json()
                    let equipmentPage = state.equipmentPage;
                    let totalElements = equipmentPage.totalElements;
                    equipmentPage.totalElements = totalElements ? totalElements + 1 : totalElements
                    console.log(equipmentPage)
                    let content = equipmentPage.content;
                    equipmentPage.content = content ? [...content, updatedEquipment] : [updatedEquipment]
                    commit('setEquipmentPage', equipmentPage)
                }

                commit('setCurrentEquipment', updatedEquipment);

                return {ok: true, updatedEquipment, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
        async deleteEquipment({state, commit}, equipmentId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/equipment/${equipmentId}`, {
                    method: 'DELETE'
                })

                commit('removeEquipmentFromList', equipmentId)
                // todo check
                if (state.currentEquipment != null && state.currentEquipment.id === equipmentId) {
                    commit('setCurrentEquipment', null);
                }

                return response.ok
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getEquipmentPage: state => state.equipmentPage,
        getEquipmentSearchPage: state => state.equipmentSearchPage,
        getEquipmentSearchList: state => state.equipmentSearchList,
        getCurrentEquipment: state => state.currentEquipment
    }
}

export default equipment