<template>

  <div class="items">
    <item></item>
    <item></item>
    <item></item>
    <item></item>
    <item></item>
    <item></item>
  </div>

</template>

<script>
import item from './displayitems/Item.vue'
import tab from './displayTab/tab.vue'
export default {
  name: 'viewDisplayer',
  data: () => {
    return {

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
