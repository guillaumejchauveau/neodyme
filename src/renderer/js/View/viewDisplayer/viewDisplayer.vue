<template>
  <div class="viewDisplayer"  v-if="viewDisplayType !== 'list'">
    <button class="vd_backview"  v-if="!showBackButton" @click="setPreviousViewConfig" ><span></span></button>
    <div class="vd_items" v-if="viewDisplayType == 'items'">
    <item v-for="item in currentViewElements" :value="item"></item>
  </div>
    <list :elements="currentViewElements" v-if="viewDisplayType === 'list'"></list>
  </div>
</template>

<script>

import Criterion from '../../Criterion'
import CriteriaSet from '../../Criterion/CriteriaSet'

import { mapGetters, mapActions, mapState} from 'vuex'

import item from './viewDisplayitems/item.vue'
import list from './viewDisplayList/list.vue'
export default {
  name: 'viewDisplayer',
  components: {
    item,
    list,
  },
  computed: {
    ...mapState ('view', ['currentViewConfig', 'currentViewElements']),
    ...mapGetters ('view', {
      showBackButton: 'isHistoryEmpty',
      viewDisplayType: 'viewDisplayType',
      getCurrentViewConfigCriterionType: 'getCurrentViewConfigCriterionType',
    }),
  },

  methods: {
    ...mapActions('view', {
      setCustomView: 'setCustomView',
      setPreviousViewConfig: 'setPreviousViewConfig',
    }),
    test () {
      console.log(this.currentViewConfig.criterionType)
    }
  },

}
</script>

<style src="./style.scss"></style>
