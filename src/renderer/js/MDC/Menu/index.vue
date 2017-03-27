<template>
    <div class="mdc-menu-anchor">
        <button :class="{horiz}" @click="toggle" v-ripple><span></span></button>
        <div class="mdc-simple-menu">
            <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>

<script>
    import {MDCSimpleMenu} from '@material/menu'
    
    export default {
        props  : {
            horiz: {
                type     : Boolean,
                'default': false
            }
        },
        methods: {
            toggle() {
                this.menu.open = !this.menu.open
            }
        },
        mounted() {
            this.menu = new MDCSimpleMenu(this.$el.children[1])
        },
        beforeDestroy() {
            this.menu.destroy()
            delete this.menu
        }
    }
</script>

<style src="./style.scss"></style>
