<template>
    <div id="app">
        <playlist></playlist>
    </div>
</template>

<script>
    import Store from './Store'
    import Playlist from './Playlist'
    
    export default {
        methods: {
            /**
             * Fonction declenchee a chaque redimensionnement de la fenetre.
             */
            onWindowResizeHandler() {
                this.$nextTick(function () {
                    this.$store.commit('settings/UPDATE_WINDOW_SIZE')
                })
            }
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.onWindowResizeHandler)
                this.$store.commit('settings/UPDATE_WINDOW_SIZE')
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onWindowResizeHandler)
        },
        store     : Store,
        components: {
            Playlist
        }
    }
</script>
