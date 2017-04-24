import {mapActions, mapState, mapMutations} from 'vuex'

import Fab from '../MDC/FAB'

import Displayer from './Displayer'
import Navigation from './Navigation'

export default {
  components: {
    Navigation,
    Displayer,
    Fab,
  },

  computed: {
    ...mapState('panel', ['currentPanelConfig']),
  },

  methods: {
    ...mapMutations ('playlist', {
      clearPlaylist: 'CLEAR_TRACKS'
    }),
    ...mapActions ('playlist', {
      addCriteriaSets: 'addCriteriaSets'
    }),

    /**
     * Lit tout les titre correspondant aux elements affiche.
     */
    playAll () {
      this.clearPlaylist()
      this.addCriteriaSets(this.currentPanelConfig.criteriaSet)
      //PLAY
    }
  }
}
