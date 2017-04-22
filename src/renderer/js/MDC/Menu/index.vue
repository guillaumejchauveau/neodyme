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
        methods: {
            toggle() {
                this.mdc_menu_.open = !this.mdc_menu_.open
            }
        },
        props  : {
            horiz: {
                type     : Boolean,
                'default': false
            }
        },
        mounted() {
            this.mdc_menu_ = new MDCSimpleMenu(this.$el.children[1])
        },
        beforeDestroy() {
            this.mdc_menu_.destroy()
            delete this.mdc_menu_
        }
    }
</script>

<style src="./style.scss"></style>
