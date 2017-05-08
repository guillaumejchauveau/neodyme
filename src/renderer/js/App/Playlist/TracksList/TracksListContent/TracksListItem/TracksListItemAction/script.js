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
    name: {
      type: String,
      required: true
    },
    readableName: {
      type: String,
      required: true
    }
  }
}
