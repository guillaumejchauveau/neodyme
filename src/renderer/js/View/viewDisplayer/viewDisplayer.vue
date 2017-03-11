<template>
  <div class="viewDisplayer">
    <div class="items">
    <item v-for="item in items">{{item}}</item>
    </div>
      <!--<list :elements="Elements"></list>-->
  </div>
</template>

<script>
import item from './viewDisplayitems/Item.vue'
import list from './viewDisplayList/list.vue'
export default {
  name: 'viewDisplayer',
  data: () => {
    return {

      items: ['ItemName', 'ItemName', 'ItemName', 'ItemName', 'ItemName', 'ItemName']
    }
  },
  components: {
    item,
    list,
  },
}
</script>

<style>
  @import "loader";
  .items {
    display: flex;
    flex-flow: wrap;
  }

  .viewDisplayer {
    width: 70%;
    margin: 0 15%;
  }
</style>
