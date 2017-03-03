<template>
  <thumbnail></thumbnail>
</template>

<script>
import thumbnail from './displayThumbnails/thumbnail.vue'
import tab from './displayTab/tab.vue'
export default {
  name: 'viewDisplayer',
  data: () => {
    return {

    }
  },
  components: {
    thumbnail,
  },
}
</script>

<style>

</style>
