import {mapState, mapGetters, mapActions} from 'vuex'

export default {

  computed: {
    ...mapState('panel', ['currentPanelConfig']),
    ...mapGetters('panel', {
      isHistoryEmpty: 'isHistoryEmpty'
    }),

    panelLinks () {
      const panelPresets = this.$store.state.settings.panel.panelPresets
      let panelLinks = []

      for (const panelPreset in panelPresets) {
        if (panelPresets.hasOwnProperty(panelPreset)) {
          panelLinks.push(panelPreset)
        }
      }
      return panelLinks
    },

    activePanelPreset () {
      const panelPresets = this.$store.state.settings.panel.panelPresets
      for (const panelPreset in panelPresets) {
        if (panelPresets.hasOwnProperty(panelPreset)) {
          if (panelPresets[panelPreset] === this.currentPanelConfig) {
            return panelPreset
          }
        }
      }
      return null
    }
  },

  methods: {
    ...mapActions('panel', {
      setPanelPreset: 'setPanelPreset',
      setPreviousPanelConfig: 'setPreviousPanelConfig',
      loadCurrentPanelElements: 'loadCurrentPanelElements'
    }),

    backPanel () {
      if (this.isHistoryEmpty === true) {
        return null
      } else {
        this.setPreviousPanelConfig()
        this.loadCurrentPanelElements()
      }
    },

    setPreset (preset) {
      this.setPanelPreset(preset)
      this.loadCurrentPanelElements()
    }
  }
}
