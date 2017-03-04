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
  body {
    font-family: 'Arial';
    background-color: rgb(245,245,245);
  }
</style>
