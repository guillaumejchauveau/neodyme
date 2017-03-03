<template>
    <viewDisplayer></viewDisplayer>
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
    h1 {
        color : red;
    }
</style>
