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
        methods : {
            onWindowResizeHandler() {
                this.$nextTick(function () {
                    this.$store.commit('settings/UPDATE_WINDOW_SIZE')
                })
            }
        },
        store   : Store,
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.onWindowResizeHandler)
                this.$store.commit('settings/UPDATE_WINDOW_SIZE')
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onWindowResizeHandler)
        }
    }
</script>

<style>
    @import "loader";
    
    h1 {
        color : $color-primary;
    }
</style>
