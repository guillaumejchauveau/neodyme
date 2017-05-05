/**
 * @file Script du composant 'Navigation'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  computed: {
<<<<<<< HEAD
    ...mapGetters('panel', ['getHistoryConfigPanelsTitles',
                            'getCurrentPanelConfig',
                            'thereIsPreviousHistoryEntry',
                            'thereIsNextHistoryEntry']),
=======
    ...mapState('panel', ['currentPanelConfig', 'panelHistory']),
    ...mapGetters('panel', ['thereIsPreviousHistoryEntry', 'thereIsNextHistoryEntry']),

    navigationHistoryTitles () {
      const navigationHistoryTitles = []
      this.panelHistory.forEach( panelConfig => {
        navigationHistoryTitles.push(panelConfig.title)
      })
      return navigationHistoryTitles
    },
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127

    /**
     * Recupere les noms des panelPreset.
     * @returns {Array<String>} Les noms des panelPreset.
     */
    panelLinks () {
      const panelPresets = this.$store.state.settings.panel.panelPresets
      let panelLinks = [] //Array des noms des panelPreset.

      for (const panelPreset in panelPresets) {
        if (panelPresets.hasOwnProperty(panelPreset)) { //Verifie si panelPreset est bien une propriete de panelPresets.
          panelLinks.push(panelPreset)
        }
      }
      return panelLinks
    },

    /**
     * Verifie si le panel affiche est un panelPreset.
     * @returns {String|null} Le nom du panelPreset en cours ou null si le panel en cours n'est pas un preset.
     */
    activePanelPreset () {
      const panelPresets = this.$store.state.settings.panel.panelPresets

      for (const panelPreset in panelPresets) {
        if (panelPresets.hasOwnProperty(panelPreset)) { //Verifie si panelPreset est bien une propriete de panelPresets.
          if (panelPresets[panelPreset] === this.getCurrentPanelConfig) {
            return panelPreset
          }
        }
      }
      return null
    },

    activeTitle () {
<<<<<<< HEAD
      return this.getCurrentPanelConfig.title
=======
      return this.currentPanelConfig.title
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    }
  },

  methods: {
<<<<<<< HEAD
    ...mapActions('panel', ['setCustomPanelConfig',
                            'setPreviousPanelConfig']),
=======
    ...mapActions('panel', {
      setPanelPreset: 'setPanelPreset',
      setPreviousPanelConfig: 'setPreviousPanelConfig',
      loadCurrentPanelElements: 'loadCurrentPanelElements',
      setCurrentPanelConfigByHistoryIndex : 'setCurrentPanelConfigByHistoryIndex'
    }),
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    /**
     * Si possible reviens sur le panel precedent, sinon ne fait rien.
     * @returns {null} Si l'historique est vide.
     */
    backPanel () {
      if (this.thereIsPreviousHistoryEntry === true) {
        return null
      } else {
        this.setPreviousPanelConfig()
      }
    },

    forwardPanel () {
      if (this.thereIsNextHistoryEntry === true) {
        return null
      } else {
        const activePanelhistoryIndex = this.getHistoryConfigPanelsTitles.indexOf(this.activeTitle)
        this.setCustomPanelConfig(activePanelhistoryIndex +1)
      }
    },

    forwardPanel () {
      if (this.thereIsNextHistoryEntry === true) {
        return null
      } else {
        const activePanelhistoryIndex = this.navigationHistoryTitles.indexOf(this.activeTitle)
        this.setCurrentPanelConfigByHistoryIndex(activePanelhistoryIndex +1)
        this.loadCurrentPanelElements()
      }
    },

    /**
     * Affiche un panelPreset.
     * @param {String} preset - Le nom du panelPreset a afficher.
     */
    setPreset (preset) {
<<<<<<< HEAD
      this.setCustomPanelConfig(preset)
    },

    setSelectedPanel (index) {
      const historyIndex = this.getHistoryConfigPanelsTitles.indexOf(index)
      this.setCustomPanelConfig(historyIndex)
=======
      this.setPanelPreset(preset)
      this.loadCurrentPanelElements()
    },

    setSelectedPanel (index) {
      const historyIndex = this.navigationHistoryTitles.indexOf(index)
      this.setCurrentPanelConfigByHistoryIndex(historyIndex)
      this.loadCurrentPanelElements()
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
    }
  }
}
