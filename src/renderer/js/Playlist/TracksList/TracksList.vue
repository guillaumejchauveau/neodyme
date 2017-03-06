<template>
    <div id="tracksList" :class="{active: isOpen}">
        <div class="tracksList-hoverZone"></div>
        <div class="tracksList-open" :class="{active: !isOpen}" @click="isOpen = true"></div>
        <div class="tracksList-close" :class="{active: isOpen}" @click="isOpen = false"></div>
        <div class="tracksList-content">
            
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                isOpen: false
            }
        }
    }
</script>

<style src="./style.scss" scoped></style>
