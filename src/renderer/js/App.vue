<template>
    <h1>{{ text }}</h1>
</template>

<script>
    export default {
        data () {
            return {
                text: 'Hello World'
            }
        }
    }
</script>

<style>
    @import "loader";
    
    h1 {
        color : $color-primary;
    }
</style>
