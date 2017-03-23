export default {
    namespaced: true,
    state     : {
        windowSize: {
            height: 0,
            width : 0
        }
    },
    getters   : {
        setting(state) {
            return key => state[key]
        }
    },
    mutations : {
        UPDATE_WINDOW_SIZE(state) {
            state.windowSize.height = window.innerHeight
            state.windowSize.width  = window.innerWidth
        }
    }
}
