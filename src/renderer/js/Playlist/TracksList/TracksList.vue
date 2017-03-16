<template>
    <div id="tracksList" :class="{active: isOpen}">
        <div class="tracksList-hoverZone"></div>
        <button class="tracksList-open" :class="{active: !isOpen}" @click="isOpen = true" v-ripple></button>
        <button class="tracksList-close" :class="{active: isOpen}" @click="isOpen = false" v-ripple><span></span></button>
        <div class="tracksList-content">
            
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: false
            }
        }
    }
</script>

<style src="./style.scss"></style>
