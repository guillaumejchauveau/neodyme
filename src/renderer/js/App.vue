<template>
  <h1>{{ text }}</h1>
</template>

<script>
  import Store from './Store'

  export default {
    data () {
      return {
        text: 'Hello World'
      }
    },
    methods: {
      /**
       * Fonction declenchee a chaque redimensionnement de la fenetre.
       */
      onWindowResizeHandler () {
        this.$nextTick(() => {
          this.$store.commit('settings/UPDATE_WINDOW_SIZE')
        })
      }
    },
    store: Store,
    mounted () {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onWindowResizeHandler)
        this.$store.commit('settings/UPDATE_WINDOW_SIZE')
      })
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onWindowResizeHandler)
    }
  }
</script>

<style>
  @import 'loader';

  h1 {
    color: $color-primary;
  }
</style>
