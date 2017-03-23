export default {
    namespaced: true,
    state     : {},
    getters   : {
        setting(state) {
            return key => state[key]
        }
    }
}
