<template>

  <div class="items">
    <item v-for="item in items">{{item}}</item>
  </div>

</template>

<script>
import item from './displayitems/Item.vue'
import tab from './displayTab/tab.vue'
export default {
  name: 'viewDisplayer',
  data: () => {
    return {
      items: ['ItemName 0', 'ItemName 1', 'ItemName 2', 'ItemName 3', 'ItemName 4', 'ItemName 5',]
    }
  },
  components: {
    item,
    tab,
  },
}
</script>

<style>

  .items {
    display: flex;
    flex-flow: wrap;
  }

  .tab {

  }
</style>
