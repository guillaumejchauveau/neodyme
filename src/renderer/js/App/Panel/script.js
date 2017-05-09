/**
 * @file Script du composant 'Panel'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapActions } from 'vuex'

/**
 * Composant MDC/FAB.
 */
import Fab from '../../MDC/FAB'
/**
 * Composant Navigation.
 */
import Navigation from './Navigation'
/**
 * Composant Displayer.
 */
import Displayer from './Displayer'

export default {
  name: 'panel',
  components: {
    'navigation': Navigation,
    'displayer': Displayer,
    'fab': Fab
  },

  computed: {
    ...mapGetters('panel', ['getCurrentPanelElements']),
    ...mapGetters('playlist', ['tracksListActive'])
  },

  methods: {
    ...mapActions('panel', ['setCustomPanelConfig']),
    ...mapActions('playlist', ['addDecisiveCriteriaSet', 'clear', 'play']),

    /**
     * Lit tout les titre correspondant aux elements affiche.
     */
    playAll () {
      this.clear().then(() => {
        this.getCurrentPanelElements
            .decisiveCriteriaSets
            .forEach(DCS => {
              this.addDecisiveCriteriaSet(DCS)
            })
        this.play(0)
      }).catch(err => {
        throw err
      })
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
