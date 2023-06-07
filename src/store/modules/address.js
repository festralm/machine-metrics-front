import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const address = {
    namespaced: true,
    state: {
        addressList: [],
    },
    mutations: {
        setAddressList(state, addressList) {
            state.addressList = addressList
        },
        removeAddressFromList(state, addressId) {
            state.addressList = state.addressList.filter(address => address.id !== addressId)
        },
    },
    actions: {
        async fetchAddressList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/address`)
                const addressList = await response.json()
                commit('setAddressList', addressList)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteAddress({commit}, addressId) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/address/${addressId}`, {
                    method: 'DELETE'
                })

                commit('removeAddressFromList', addressId)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveAddress({state, commit}, addressData) {
            try {
                let response
                let savedAddress
                response = await fetchWithResponseCheck(`${API_URL}/address`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addressData)
                })

                savedAddress = await response.json()

                commit('setAddressList', [...state.addressList, savedAddress])

                return {ok: true, savedAddress: savedAddress, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getAddressList: state => state.addressList,
    }
}

export default address