<<<<<<< HEAD
/**
 * @file Script du composant 'Panel'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import Fab from '../MDC/FAB'
import Navigation from './Navigation'
import Displayer from './Displayer'
=======
import {mapActions, mapState, mapMutations} from 'vuex'
import Fab from '../MDC/FAB'
import Navigation from './Navigation'
import Displayer from './Displayer'

>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

export default {
  components: {
    Navigation,
    Displayer,
    Fab
  },

  computed: {
<<<<<<< HEAD
    ...mapGetters('panel', ['getCurrentPanelElements']),
=======
    ...mapState('panel', ['currentPanelConfig']),
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    ...mapState('playlist/tracksList', {
      tracksListOpened: 'active'})
  },

  methods: {
<<<<<<< HEAD
    ...mapMutations('playlist', ['CLEAR_TRACKS']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet']),
    ...mapActions('panel', ['setCustomPanelConfig']),
=======
    ...mapMutations ('playlist', ['CLEAR_TRACKS']),
    ...mapActions ('playlist', ['addCriteriaSets']),
    ...mapActions ('panel', ['setPanelPreset', 'forceLoadCurrentPanelElements']),
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

    /**
     * Lit tout les titre correspondant aux elements affiche.
     */
    playAll () {
      this.CLEAR_TRACKS()
<<<<<<< HEAD
      this.getCurrentPanelElements
          .decisiveCriteriaSets
          .forEach( DCS => {
            this.addDecisiveCriteriaSet(DCS)
          })
=======
      this.addCriteriaSets(this.currentPanelConfig.criteriaSet)
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
      //PLAY
    }
  },

  /**
   * Fonction lancee quand le composant est monte.
   * Initialise le Panel en affichant le panelPreset initial.
   */
<<<<<<< HEAD
  beforeMount () {
    const initialPanel = this.$store.state.settings.panel.initialPanel
    this.setCustomPanelConfig(initialPanel)
=======
  mounted () {
    const initialPanel = this.$store.state.settings.panel.initialPanel

    this.setPanelPreset(initialPanel)
    this.forceLoadCurrentPanelElements()
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  }
}
