import {mapActions, mapState, mapMutations} from 'vuex'
import Fab from '../MDC/FAB'
import Navigation from './Navigation'
import Displayer from './Displayer'


export default {
  components: {
    Navigation,
    Displayer,
    Fab
  },

  computed: {
    ...mapState('panel', ['currentPanelConfig']),
    ...mapState('playlist/tracksList', {
      tracksListOpened: 'active'})
  },

  methods: {
    ...mapMutations ('playlist', ['CLEAR_TRACKS']),
    ...mapActions ('playlist', ['addCriteriaSets']),
    ...mapActions ('panel', ['setPanelPreset', 'forceLoadCurrentPanelElements']),

    /**
     * Lit tout les titre correspondant aux elements affiche.
     */
    playAll () {
      this.CLEAR_TRACKS()
      this.addCriteriaSets(this.currentPanelConfig.criteriaSet)
      //PLAY
    }
  },

  /**
   * Fonction lancee quand le composant est monte.
   * Initialise le Panel en affichant le panelPreset initial.
   */
  mounted () {
    const initialPanel = this.$store.state.settings.panel.initialPanel

    this.setPanelPreset(initialPanel)
    this.forceLoadCurrentPanelElements()
  }
}
