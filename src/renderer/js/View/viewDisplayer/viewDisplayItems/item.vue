<template>
  <div class="item">
    <div class="item_card" v-ripple  @click="setNextViewConfig(new Criterion(value, getNextViewConfigCriterionType))">
      <div class="item_card_picture">
        <div class="item_card_picture_background"></div>
        <img src="../../../../static/img/blank_cover.png">
      </div>
      <div class="item_card_text">
        <p class="item_card_text_title">{{value}}</p>
      </div>
  </div>
  <mdcMenu class="item_menu">
    <li class="mdc-list-item" role="menuitem" v-ripple @click="play()">Lire maintenant</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="playAfter()">Lire après le titre en cours</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="addToPlaylist()">Ajouter à la liste de lecture</li>
  </mdcMenu>
  </div>
</template>

<script>

import Criterion from '../../../Criterion'
import CriteriaSet from '../../../Criterion/CriteriaSet'

  import { mapGetters, mapActions} from 'vuex'
  import mdcMenu from '../../../MDC/Menu/index.vue'

  export default {
    name: 'item',

    components: {
      mdcMenu,
    },

    data: () => {
      return {

      }
    },

    props: ['value'],

    methods: {
      ...mapActions ({
        setNextViewConfig: 'view/setNextViewConfig'
      }),
      play () {
        console.log('PLAY')
      },
      playAfter () {
        console.log('PLAYAFTER')
      },
      addToPlaylist () {
        console.log('ADD2PL')
      },
    },

    computed: {
      ...mapGetters({
        getNextViewConfigCriterionType: 'view/getNextViewConfigCriterionType'
      })
    }
  }
</script>


<style src="./style.scss"></style>
