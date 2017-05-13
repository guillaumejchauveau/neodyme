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
     * Recupere les noms des panel presets.
     * @returns {Array<String>} Les noms des panel presets.
     */
    panelLinks () {
      const panelPresets = this.$store.state.settings.panel.panelPresets
      // Liste des noms des panel presets.
      const panelLinks = []

      // Parcours tout les panel presets.
      for (const panelPreset in panelPresets) {
        // Verifie si panel preset est bien une propriete de panel presets.
        if (panelPresets.hasOwnProperty(panelPreset)) {
          // Ajoute le nom du panel preset a la liste.
          panelLinks.push(panelPreset)
        }
      }
      return panelLinks
    },

    /**
     * Recupere les titre des panel presets.
     * @returns {Object} Objet contenant les titres de panel presets.
     */
    panelLinksTitles () {
      const panelPresetsTitles = {}
      this.panelLinks.forEach(panelLink => {
        const title = this.$store
                          .state
                          .settings
                          .panel
                          .panelPresets[panelLink].title
        panelPresetsTitles[panelLink] = title.toLowerCase()
      })
      return panelPresetsTitles
    },

    /**
     * Verifie si le panel affiche est un panel preset.
     * @returns {String|null} Le nom du panel preset courant ou null si le panel en cours n'est pas un preset.
     */
    activePanelPreset () {
      const panelPresets = this.$store.state.settings.panel.panelPresets

      // Parcours tout les panel presets.
      for (const panelPreset in panelPresets) {
        // Verifie si panel preset est bien une propriete de panel presets,
        // et si le panel preset correspond a la configuration du panel courant.
        if (panelPresets.hasOwnProperty(panelPreset) && panelPresets[panelPreset] === this.getCurrentPanelConfig) {
          return panelPreset
        }
      }
      return null
    }
  },

  methods: {
    ...mapActions('panel', ['setCustomPanelConfig', 'setPreviousPanelConfig']),

    /**
     * Formate une chaine de caracteres en 'snake-case' avec une expression reguliere.
     * @param {String} string - La chaine a formater.
     * @returns {String} La chaine formatee.
     */
    toSnakeCase: string => string.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`),

    /**
     * Si possible revient sur le panel precedent, sinon ne fait rien.
     */
    backPanel () {
      // Verifie si l'historique permet un retour en arriere.
      if (this.thereIsPreviousHistoryEntry) {
        // Set la configuration du panel precedente.
        this.setPreviousPanelConfig()
      }
    },

    /**
     * Si possible accede au panel suivant dans l'historique, sinon ne fait rien.
     */
    forwardPanel () {
      // Verifie si l'historique permet un retour en arriere.
      if (this.thereIsNextHistoryEntry) {
        // Index dans l'historique de la configuration actuelle.
        const activePanelhistoryIndex = this.getHistoryConfigPanelsTitles
                                            .indexOf(this.getCurrentPanelConfig.title)
        // Set la configuration suivante dans l'historique.
        this.setCustomPanelConfig(activePanelhistoryIndex + 1)
      }
    },

    /**
     * Affiche un panel preset.
     * @param {String} preset - Le nom du panel preset a afficher.
     */
    setPreset (preset) {
      this.setCustomPanelConfig(preset)
    },

    /**
     * Affiche le panel de l'historique correspondant a un titre de panel.
     * @param {String} title - Le titre du panel de l'historique a afficher.
     */
    setSelectedPanel (title) {
      // Index dans l'historique du panel correspondant au titre.
      const historyIndex = this.getHistoryConfigPanelsTitles.indexOf(title)
      // Set la configuration de l'historique correspondante.
      this.setCustomPanelConfig(historyIndex)
    }
  }
}
