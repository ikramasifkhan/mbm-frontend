export default {
    namespaced: true,
    strict: true,
    state: {
        errors: null
    },
    
    mutations: {
        SET_VALIDATION_ERRORS(state, errors){
            state.errors = null
            state.errors = errors
        }
    },
}