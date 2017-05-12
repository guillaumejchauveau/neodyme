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
     * Lit tout les titres correspondants aux elements affiches.
     * @throws {Error} Lance une exception si l'effacement de la liste de lecture echoue.
     */
    playAll () {
      // Arrete et efface la liste de lecture.
      this.clear().then(() => {
        // Ajoute les ensembles de criteres determinants courants a la liste de lecture.
        this.getCurrentPanelElements
            .decisiveCriteriaSets
            .forEach(decisiveCriteriaSet => {
              this.addDecisiveCriteriaSet(decisiveCriteriaSet)
            })
        // Lance la lecture.
        this.play().catch(err => {
          throw new Error(err)
        })
      }).catch(err => {
        throw new Error(err)
      })
    }
  },

  /**
   * Fonction lancee quand le composant avant que le composant Panel soit monte.
   * Initialise le Panel en affichant le preset de panel initial.
   */
  beforeMount () {
    const initialPanel = this.$store.state.settings.panel.initialPanel
    this.setCustomPanelConfig(initialPanel)
  }
}
