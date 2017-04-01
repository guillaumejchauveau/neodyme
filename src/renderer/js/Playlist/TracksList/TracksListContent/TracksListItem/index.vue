<template>
    <div class="tracksList-item" :style="itemStyle">
        <div class="tracksList-item-menu" :class="{active: menuIsOpen}">
            <button @click.stop="menuIsOpen = !menuIsOpen" v-ripple><span></span></button>
            <div class="tracksList-item-menu-content">
            
            </div>
        </div>
        <div class="tracksList-item-content">{{ data.title.value }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                angularHeight: this.$store.state.settings.playlist.tracksList.item.angularHeight,
                menuIsOpen   : false
            }
        },
        computed: {
            /**
             * Compile le style dynamique de l'element.
             * @returns {String} Le contenu de l'attribut style.
             */
            itemStyle() {
                return `transform: translateY(-50%) rotate(${this.position * this.angularHeight}rad);`
            }
        },
        props   : {
            data    : {
                type    : Object,
                required: true
            },
            position: {
                type    : Number,
                required: true
            }
        }
    }
</script>

<style src="./style.scss"></style>
