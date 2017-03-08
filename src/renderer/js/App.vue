<template>
  <div>
    <viewDisplayer></viewDisplayer>

  </div>
</template>

<script>
    import viewDisplayer from './View/viewDisplayer/viewDisplayer.vue'
    export default {
        name: 'app',
        data: () => {
            return {
                text: 'Hello World'
            }
        },
        components: {
          viewDisplayer
        }
    }
</script>

<style>
    @import "loader";

</style>
