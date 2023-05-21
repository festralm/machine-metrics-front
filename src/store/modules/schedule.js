import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const schedule = {
    namespaced: true,
    state: {
        scheduleList: [],
    },
    mutations: {
        setScheduleList(state, scheduleList) {
            state.scheduleList = scheduleList
        },
        removeScheduleFromList(state, id) {
            state.scheduleList = state.scheduleList.filter(schedule => schedule.id !== id)
        },
        replaceScheduleInList(state, data) {
            const index = state.scheduleList.findIndex(item => item.id === data.id);

            if (index !== -1) {
                state.scheduleList.splice(index, 1, data.schedule);
            }
        },
    },
    actions: {
        async fetchScheduleList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/schedule`)
                const scheduleList = await response.json()
                commit('setScheduleList', scheduleList)
            } catch (error) {
                console.error(error)
            }
        },
        async deleteSchedule({commit}, id) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/schedule/${id}`, {
                    method: 'DELETE'
                })

                commit('removeScheduleFromList', id)

                return response.ok
            } catch (error) {
                console.error(error)
            }
        },
        async saveSchedule({state, commit}, scheduleData) {
            try {
                let response
                let savedSchedule
                let scheduleId = scheduleData.id;
                if (scheduleId) {
                    response = await fetchWithResponseCheck(`${API_URL}/schedule/${scheduleId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(scheduleData)
                    })
                    savedSchedule = await response.json()
                    commit('replaceScheduleInList', {
                        id: scheduleId,
                        schedule: savedSchedule
                    })
                } else {
                    response = await fetchWithResponseCheck(`${API_URL}/schedule`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(scheduleData)
                    })
                    savedSchedule = await response.json()
                    commit('setScheduleList', [...state.scheduleList, savedSchedule])
                }

                return {ok: true, savedSchedule: savedSchedule, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getScheduleList: state => state.scheduleList,
    }
}

export default schedule