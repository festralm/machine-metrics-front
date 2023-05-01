import Vuex from 'vuex'

const dataService = new Vuex.Store({
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
            // todo url
            const response = await fetch(`http://localhost:8083/api/v1/data-service`)
            const serviceList = await response.json()
            commit('setServiceList', serviceList)
        },
        async deleteService({commit}, serviceId) {
            try {
                const response = await fetch(`http://localhost:8083/api/v1/data-service/${serviceId}`, {
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
                response = await fetch(`http://localhost:8083/api/v1/data-service`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(serviceData)
                })

                savedService = await response.json()

                commit('setServiceList', [...state.serviceList, savedService])

                return {savedService, headers: response.headers}
            } catch (error) {
                console.error(error)
            }
        },
    },
    getters: {
        getServiceList: state => state.serviceList,
    }
})

export default dataService