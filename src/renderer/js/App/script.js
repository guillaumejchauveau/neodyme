/**
 * @file Composant principal.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import Store from '../Store'

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
    windowResizeHandler () {
      this.$nextTick(() => {
        this.$store.commit('settings/UPDATE_WINDOW_SIZE')
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.windowResizeHandler)
      this.$store.commit('settings/UPDATE_WINDOW_SIZE')
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.windowResizeHandler)
  },
  store: Store
}
