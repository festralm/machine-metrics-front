import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const user = {
    namespaced: true,
    state: {
        equipmentPhotos: [],
    },
    mutations: {
        setPhoto(state, data) {
            state.equipmentPhotos[data.id] = data.photo
        },
    },
    actions: {
        async fetchEquipmentPhoto({commit}, data) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/photo/${data.path}`)
                if (response.ok) {
                    const photoUrl = URL.createObjectURL(await response.blob());
                    commit('setPhoto', {id: data.id, photo: photoUrl});
                }
            } catch (error) {
                console.error(error);
            }
        },
        async uploadPhoto(_, data) {
           await fetchWithResponseCheck(
                `${API_URL}/photo`,
                {
                    method: 'POST',
                    body: data,
                }
            )
        },
    },
    getters: {
        getEquipmentPhoto: (state) => (id) => {
            return state.equipmentPhotos[id]
        },
    }
}

export default user