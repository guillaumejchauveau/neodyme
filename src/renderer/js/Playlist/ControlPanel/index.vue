<template>
    <div id="controlPanel">
        <div class="controlPanel-position-indicator" :style="positionIndicatorStyle"></div>
        <div class="controlPanel-content">
            <div class="controlPanel-position">{{ formattedTime(position) }}</div>
            <div class="controlPanel-controls">
                <button class="controlPanel-control main"
                        :class="{pause: playerIs('PLAYING')}"
                        :title="playerIs('PLAYING') ? 'Pause' : 'Lire'"
                        :disabled="!tracksCount || playerIs('LOADING')"
                        @click="$emit(playerIs('PLAYING') ? 'pause' : 'play')"
                        v-ripple><span></span></button>
                <button class="controlPanel-control previous"
                        title="Prescedent"
                        :disabled="currentTrackIndex <= 0 || playerIs('LOADING')"
                        @click="$emit('previous')"
                        v-ripple><span></span></button>
                <button class="controlPanel-control next"
                        title="Suivant"
                        :disabled="currentTrackIndex >= tracksCount-1 || playerIs('LOADING')"
                        @click="$emit('next')"
                        v-ripple><span></span></button>
                <button class="controlPanel-control stop"
                        title="Stop"
                        :disabled="currentTrackIndex === -1 || playerIs('LOADING')"
                        @click="$emit('stop')"
                        v-ripple><span></span></button>
            </div>
            <mdc-menu class="controlPanel-menu">
                <li class="mdc-list-item"
                    role="menuitem"
                    title="Effacer la liste de lecture"
                    :disabled="!tracksCount || playerIs('LOADING')"
                    @click="$emit('clear')">Effacer
                </li>
            </mdc-menu>
            <div class="controlPanel-duration">{{ formattedTime(duration) }}</div>
        </div>
    </div>
</template>

<script>
    import VueX from 'vuex'
    
    import MDCMenu from '../../MDC/Menu'
    
    export default {
        computed  : {
            ...VueX.mapState('playlist', ['currentTrackIndex']),
            ...VueX.mapState('playlist/player', ['position', 'duration']),
            ...VueX.mapGetters('playlist', ['tracksCount']),
            ...VueX.mapGetters('playlist/player', ['playerIs']),
            /**
             * Formate un temps en secondes en une chaine de caracteres minutes et secondes.
             * @param {Number} seconds - Le temps a formater (en secondes).
             * @returns {String} La chaine fomatee.
             */
            formattedTime() {
                return seconds => {
                    let minutes = Math.trunc(seconds / 60) + ''
                    seconds     = seconds % 60 + ''
                    minutes     = minutes.length < 2 ? `0${minutes}` : minutes
                    seconds     = seconds.length < 2 ? `0${seconds}` : seconds
                    
                    return `${minutes}:${seconds}`
                }
            },
            /**
             * Compile le style dynamique de l'indicateur de position.
             * @returns {String|Boolean} Le contenu de l'attribut style.
             */
            positionIndicatorStyle() {
                if (!this.duration) {
                    return false
                }
                
                return `transform: rotate(${45 + 180 * (this.position / this.duration)}deg);`
            }
        },
        components: {
            'mdc-menu': MDCMenu
        }
    }
</script>

<style src="./style.scss"></style>
