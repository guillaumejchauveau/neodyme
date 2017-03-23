<template>
    <div id="app">
        <playlist></playlist>
    </div>
</template>

<script>
    import VueX from 'vuex'
    import Store from './Store'
    import Playlist from './Playlist'
    
    export default {
        components: {
            Playlist
        },
        methods   : {
            onWindowResizeHandler() {
                this.$nextTick(function () {
                    this.$store.commit('settings/UPDATE_WINDOW_SIZE')
                })
            }
        },
        store     : Store,
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.onWindowResizeHandler)
                this.$store.commit('settings/UPDATE_WINDOW_SIZE')
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onWindowResizeHandler)
        }
    }
</script>
