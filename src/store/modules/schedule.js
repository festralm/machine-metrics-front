import {fetchWithResponseCheck} from '../utils';

const API_URL = process.env.VUE_APP_API_URL
const schedule = {
    namespaced: true,
    state: {
        scheduleList: [],
        defaultScheduleList: [],
        equipmentScheduleList: [],
    },
    mutations: {
        setScheduleList(state, scheduleList) {
            state.scheduleList = scheduleList
        },
        setEquipmentScheduleList(state, data) {
            state.equipmentScheduleList[data.id] = data.scheduleList
        },
        addScheduleEquipmentList(state, data) {
            let initArray = state.equipmentScheduleList[data.equipmentId] ? state.equipmentScheduleList[data.equipmentId] : []
            state.equipmentScheduleList[data.equipmentId] = [...initArray, data]
        },
        setDefaultScheduleList(state, defaultScheduleList) {
            state.defaultScheduleList = defaultScheduleList
        },
        removeScheduleFromList(state, id) {
            state.scheduleList = state.scheduleList.filter(schedule => schedule.id !== id)
        },
        removeScheduleFromEquipmentList(state, id) {
            for (const [key, scheduleList] of Object.entries(state.equipmentScheduleList)) {
                state.equipmentScheduleList[key] = scheduleList.filter(schedule => schedule.id !== id)
            }
        },
        replaceScheduleInList(state, data) {
            const index = state.scheduleList.findIndex(item => item.id === data.id);

            if (index !== -1) {
                state.scheduleList.splice(index, 1, data.schedule);
            }
        },
        replaceScheduleInEquipmentList(state, data) {
            const index = state.equipmentScheduleList[data.schedule.equipmentId].findIndex(item => item.id === data.id);

            if (index !== -1) {
                state.equipmentScheduleList[data.schedule.equipmentId].splice(index, 1, data.schedule);
            }
        },
        replaceDefaultScheduleInList(state, data) {
            const index = state.defaultScheduleList.findIndex(item => item.id === data.id);

            if (index !== -1) {
                state.defaultScheduleList.splice(index, 1, data.schedule);
            }
        },
    },
    actions: {
        async fetchDefaultScheduleList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/schedule/default`)
                const scheduleList = await response.json()
                commit('setDefaultScheduleList', scheduleList)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchScheduleList({commit}) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/schedule`)
                const scheduleList = await response.json()
                commit('setScheduleList', scheduleList)
            } catch (error) {
                console.error(error)
            }
        },
        async fetchByEquipmentId({commit}, id) {
            try {
                const response = await fetchWithResponseCheck(`${API_URL}/schedule/equipment/${id}`)
                const scheduleList = await response.json()
                commit('setEquipmentScheduleList', {id: id, scheduleList: scheduleList})
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
                commit('removeScheduleFromEquipmentList', id)

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
                    if (scheduleData.equipmentId) {
                        commit('replaceScheduleInEquipmentList', {
                            id: scheduleId,
                            schedule: savedSchedule
                        })
                    }
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
                    if (scheduleData.equipmentId) {
                        commit('addScheduleEquipmentList', savedSchedule)
                    }
                }

                return {ok: true, savedSchedule: savedSchedule, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
        async saveDefaultSchedule({commit}, scheduleData) {
            try {
                let response
                let savedSchedule
                let scheduleId = scheduleData.id;
                response = await fetchWithResponseCheck(`${API_URL}/schedule/${scheduleId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(scheduleData)
                })
                savedSchedule = await response.json()
                commit('replaceDefaultScheduleInList', {
                    id: scheduleId,
                    schedule: savedSchedule
                })

                return {ok: true, savedSchedule: savedSchedule, headers: response.headers}
            } catch (error) {
                console.error(error)
                return {ok: false}
            }
        },
    },
    getters: {
        getScheduleList: state => state.scheduleList,
        getEquipmentScheduleList: (state) => (id) => {
            return state.equipmentScheduleList[id]
        },
        getDefaultScheduleList: state => state.defaultScheduleList,
    }
}

export default schedule