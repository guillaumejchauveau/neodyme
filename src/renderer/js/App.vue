<template>
  <div>
    <viewDisplayer></viewDisplayer>
  </div>
</template>

<script>
    import Store from './Store'

    import viewDisplayer from './View/viewDisplayer/viewDisplayer.vue'

    export default {
        data () {
            return {
                text: 'Hello World'
            }
        },
        components: {
          viewDisplayer,
        },
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
        store  : Store,
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

<style>
    @import "loader";

</style>
