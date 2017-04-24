/**
 * @file Script du composant 'Displayer'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapActions, mapState} from 'vuex'

 /**
  * Classe Criterion.
  * @type {Criterion}
  */
 import Criterion from '../../Criterion'
 /**
  * Classe CriteriaSet.
  * @type {CriteriaSet}
  */
import CriteriaSet from '../../Criterion/CriteriaSet'

import Item from './Item'
import List from './List'

export default {
  components: {
    Item,
    List,
  },

  computed: {
    ...mapState ('panel', ['currentPanelConfig', 'currentPanelElements']),
    ...mapGetters ('panel', ['getCurrentPanelConfig']),

  },

  methods: {
    ...mapActions('panel', {
      setCustomPanel: 'setCustomPanel',
      setPreviousPanelConfig: 'setPreviousPanelConfig',
      loadCurrentPanelElements: 'loadCurrentPanelElements'
    }),
  },

  /**
   * Fonction lancee quand le composant est monte.
   * Initialise le Panel en affichant le panelPreset initial.
   */
  mounted(){
    const panelPresets = this.$store.state.settings.panel.panelPresets
    const initialPanel = this.$store.state.settings.panel.initialPanel

    this.setCustomPanel(panelPresets[initialPanel])
    this.loadCurrentPanelElements()
  }
}
