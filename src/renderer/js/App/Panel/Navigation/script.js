/**
 * @file Script du composant 'Navigation'.
 * @author Paul Charpentier <paul.charpentier.99@gmail.com>
 * @copyright Paul Charpentier 2017.
 */

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'navigation',

  computed: {
    ...mapGetters('panel', [
      'getHistoryConfigPanelsTitles',
      'getCurrentPanelConfig',
      'thereIsPreviousHistoryEntry',
      'thereIsNextHistoryEntry'
    ]),

    /**
     * Recupere les noms des panelPreset.
     * @returns {Array<String>} Les noms des panelPreset.
     */
    panelLinks () {
      const panelPresets = this.$store.state.settings.panel.panelPresets
      const panelLinks = [] // Array des noms des panelPreset.

      for (const panelPreset in panelPresets) {
        // Verifie si panelPreset est bien une propriete de panelPresets.
        if (panelPresets.hasOwnProperty(panelPreset)) {
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
        // Verifie si panelPreset est bien une propriete de panelPresets.
        if (panelPresets.hasOwnProperty(panelPreset) && panelPresets[panelPreset] === this.getCurrentPanelConfig) {
          return panelPreset
        }
      }
      return null
    },

    activeTitle () {
      return this.getCurrentPanelConfig.title
    }
  },

  methods: {
    ...mapActions('panel', ['setCustomPanelConfig', 'setPreviousPanelConfig']),

    toSnakeCase: string => string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`),

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
        this.setCustomPanelConfig(activePanelhistoryIndex + 1)
      }
    },

    /**
     * Affiche un panelPreset.
     * @param {String} preset - Le nom du panelPreset a afficher.
     */
    setPreset (preset) {
      this.setCustomPanelConfig(preset)
    },

    setSelectedPanel (index) {
      const historyIndex = this.getHistoryConfigPanelsTitles.indexOf(index)
      this.setCustomPanelConfig(historyIndex)
    }
  }
}
