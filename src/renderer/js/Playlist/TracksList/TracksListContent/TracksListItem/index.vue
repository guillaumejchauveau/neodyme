<template>
    <div class="tracksList-item"
         :style="itemStyle"
         @dblclick="$emit('trackAction', 'play', position)"
         @contextmenu.prevent="active = !active">
        <button :class="{active}" title="Ouvrir" @click.stop="active = !active" v-ripple><span></span></button>
        <ul v-if="active" class="tracksList-item-menu">
            <li>
                <button class="tracksList-item-menu-action play" title="Lire" @click="trackAction('play')" v-ripple>
                    <span></span>
                </button>
            </li>
            <li>
                <button class="tracksList-item-menu-action remove"
                        title="Supprimer"
                        @click="trackAction('remove')"
                        v-ripple>
                    <span></span>
                </button>
            </li>
        </ul>
        <div v-if="!active" class="tracksList-item-content">{{ data.title.value }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                angularHeight: this.$store.state.settings.playlist.tracksList.item.angularHeight,
                active       : false
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
        methods : {
            /**
             * Lance un evenement pour executer une action sur une piste.
             * @param {String} action - L'action a effectuer.
             */
            trackAction(action) {
                this.active = false
                this.$emit('trackAction', action, this.position)
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
