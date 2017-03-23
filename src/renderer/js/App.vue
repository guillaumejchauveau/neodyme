<template>
    <h1>{{ text }}</h1>
</template>

<script>
    import VueX from 'vuex'
    import Store from './Store'
    
    export default {
        data () {
            return {
                text: 'Hello World'
            }
        },
        store   : Store
    }
</script>

<style>
    @import "loader";
    
    h1 {
        color : $color-primary;
    }
</style>
