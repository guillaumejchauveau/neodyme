<template>
    <div class="mdc-checkbox">
        <input type="checkbox" class="mdc-checkbox__native-control">
        <div class="mdc-checkbox__background">
            <svg version="1.1" class="mdc-checkbox__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
                <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
            </svg>
            <div class="mdc-checkbox__mixedmark"></div>
        </div>
    </div>
</template>

<script>
    import {MDCCheckbox} from '@material/checkbox'
    
    export default {
        mounted() {
            this.checkbox = new MDCCheckbox(this.$el)
        },
        beforeDestroy() {
            this.checkbox.destroy()
            delete this.checkbox
        }
    }
</script>

<style src="./style.scss"></style>
