const auth = {
    namespaced: true,
    state: {
        role: null,
    },
    mutations: {
        setRole(state, role) {
            state.role = role
        },
    },
    actions: {},
    getters: {
        getRole: state => state.role,
    }
}

export default auth