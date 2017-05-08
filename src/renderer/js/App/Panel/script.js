/**
 * @file Script du composant 'Panel'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import Fab from '../../MDC/FAB'
import Navigation from './Navigation'
import Displayer from './Displayer'

export default {
  components: {
    Navigation,
    Displayer,
    Fab
  },

  computed: {
    ...mapGetters('panel', ['getCurrentPanelElements']),
    ...mapState('playlist', {tracksListOpened: 'tracksListActive'})
  },

  methods: {
    ...mapMutations('playlist', ['CLEAR_TRACKS']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['setCustomPanelConfig']),

    /**
     * Lit tout les titre correspondant aux elements affiche.
     */
    playAll () {
      this.CLEAR_TRACKS()
      this.getCurrentPanelElements
          .decisiveCriteriaSets
          .forEach(DCS => {
            this.addDecisiveCriteriaSet(DCS)
          })
      // TODO: PLAY
    }
  },

  /**
   * Fonction lancee quand le composant est monte.
   * Initialise le Panel en affichant le panelPreset initial.
   */
  beforeMount () {
    const initialPanel = this.$store.state.settings.panel.initialPanel
    this.setCustomPanelConfig(initialPanel)
  }
}
