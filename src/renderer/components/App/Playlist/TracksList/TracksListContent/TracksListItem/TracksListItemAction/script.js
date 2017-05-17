/**
 * @file Composant TracksListItemAction.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

export default {
  computed: {
    ...VueX.mapGetters('playlist/player', ['playerIs'])
  },
  props: {
    /**
     * Nom interne de l'action.
     * @type {String}
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Nom affiche de l'action.
     * @type {String}
     */
    readableName: {
      type: String,
      required: true
    }
  }
}
