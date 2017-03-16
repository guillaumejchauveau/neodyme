<template>
    <div class="mdc-menu-anchor">
        <button :class="{horiz}" @click="toggleMenu" v-ripple><span></span></button>
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
        mounted() {
            this.setMenu()
        },
        methods: {
            setMenu() {
                this.menu = new MDCSimpleMenu(this.$el.children[1])
            },
            toggleMenu() {
                this.menu.open = !this.menu.open
            }
        }
    }
</script>

<style src="./style.scss"></style>
