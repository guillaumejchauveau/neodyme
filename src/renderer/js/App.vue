<template>
  <div>
    <viewDisplayer></viewDisplayer>

  </div>
</template>

<script>
    import viewDisplayer from './viewDisplayer/viewDisplayer.vue'
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
