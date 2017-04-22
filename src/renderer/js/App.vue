<template>
  <div id="app">
    <playlist></playlist>
    <viewDisplayer></viewDisplayer>
  </div>
</template>

<script>
    import Store from './Store'

    import viewDisplayer from './View/viewDisplayer/viewDisplayer.vue'
    import Playlist from './Playlist'

    export default {
        methods   : {
            /**
             * Fonction declenchee a chaque redimensionnement de la fenetre.
             */
            windowResizeHandler() {
                this.$nextTick(() => {
                    this.$store.commit('settings/UPDATE_WINDOW_SIZE')
                })
            }
        },
        store     : Store,
        components: {
            viewDisplayer,
            Playlist
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', this.windowResizeHandler)
                this.$store.commit('settings/UPDATE_WINDOW_SIZE')
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.windowResizeHandler)
        }
    }
</script>
