import Criterion from '../../Criterion'
import CriteriaSet from '../../Criterion/CriteriaSet'

import { mapGetters, mapActions, mapState} from 'vuex'

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

    setPreviousPanel () {
      this.setPreviousPanelConfig()
      this.loadCurrentPanelElements()
    }

  },
  mounted(){
    const panelPresets = this.$store.state.settings.panel.panelPresets
    const initialPanel = this.$store.state.settings.panel.initialPanel
    this.setCustomPanel(panelPresets[initialPanel])
    this.loadCurrentPanelElements()
  }
}
