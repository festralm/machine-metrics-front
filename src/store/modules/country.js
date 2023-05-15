import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const country = {
    namespaced: true,
    state: {
        countryList: [],
    },
    mutations: {
        setCountryList(state, countryList) {
            state.countryList = countryList
        },
        removeCountryFromList(state, countryId) {
            state.countryList = state.countryList.filter(country => country.id !== countryId)
        },
    },
    actions: {
        async fetchCountryList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/country`)
                const countryList = await response.json()
                commit('setCountryList', countryList)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteCountry({commit}, countryId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/country/${countryId}`, {
                    method: 'DELETE'
                })

                commit('removeCountryFromList', countryId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveCountry({state, commit}, countryData) {
            try {
                let response
                let savedCountry
                response = await fetchWithResponseCheck(`${API_URL}/country`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(countryData)
                })

                savedCountry = await response.json()

                commit('setCountryList', [...state.countryList, savedCountry])

                return {ok: true, savedCountry: savedCountry, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getCountryList: state => state.countryList,
    }
}

export default country