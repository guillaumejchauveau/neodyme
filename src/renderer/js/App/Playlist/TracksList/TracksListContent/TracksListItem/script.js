/**
 * @file Composant TracksListItem.
 * @author Guillaume Chauveau <guillaume.j.chauveau@gmail.com>
 * @copyright Guillaume Chauveau 2017.
 */

import VueX from 'vuex'

export default {
  data () {
    return {
      angularHeight: this.$store.state.settings.playlist.tracksList.item.angularHeight,
      active: false
    }
  },
  computed: {
    ...VueX.mapGetters('playlist/player', ['playerIs']),
    /**
     * Compile le style dynamique de l'element.
     * @returns {String} Le contenu de l'attribut style.
     */
    itemStyle () {
      return `transform: translateY(-50%) rotate(${this.position * this.angularHeight}rad);`
    }
  },
  methods: {
    /**
     * Lance un evenement pour executer une action sur une piste.
     * @param {String} action - L'action a effectuer.
     */
    trackAction (action) {
      this.active = false
      this.$emit('trackAction', action, this.position)
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  }
}
