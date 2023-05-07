import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const dataService = {
    namespaced: true,
    state: {
        serviceList: [],
    },
    mutations: {
        setServiceList(state, serviceList) {
            state.serviceList = serviceList
        },
        removeServiceFromList(state, serviceId) {
            state.serviceList = state.serviceList.filter(service => service.id !== serviceId)
        },
    },
    actions: {
        async fetchServiceList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/data-service`)
                const serviceList = await response.json()
                commit('setServiceList', serviceList)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteService({commit}, serviceId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/data-service/${serviceId}`, {
                    method: 'DELETE'
                })

                commit('removeServiceFromList', serviceId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveService({state, commit}, serviceData) {
            try {
                let response
                let savedService
                response = await fetchWithResponseCheck(`${API_URL}/data-service`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(serviceData)
                })

                savedService = await response.json()

                commit('setServiceList', [...state.serviceList, savedService])

                return {ok: true, savedService, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getServiceList: state => state.serviceList,
    }
}

export default dataService