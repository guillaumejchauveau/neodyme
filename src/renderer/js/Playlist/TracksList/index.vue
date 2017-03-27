<template>
    <div id="tracksList" :class="{active: isOpen}">
        <div class="tracksList-hoverZone"></div>
        
        <button key="tracksList-open"
                v-if="tracksCount && !isOpen"
                class="tracksList-open"
                @click="isOpen = true"
                v-ripple></button>
        
        <transition-group name="tracksList-buttons-transition">
            <button key="tracksList-close"
                    v-if="isOpen"
                    class="tracksList-close"
                    @click="isOpen = false"
                    v-ripple><span></span></button>
            <div key="tracksList-waypoint-scroller-container"
                 v-if="waypointScroller && isOpen"
                 class="tracksList-waypoint-scroller-container"
                 :style="waypointScrollerContainerStyle">
                <button class="tracksList-waypoint-scroller"
                        :class="{down: distanceToWaypoint < 0}"
                        @click="currentItem = waypointItem"
                        v-ripple><span></span></button>
            </div>
        </transition-group>
        
        <tracks-list-content :isOpen="isOpen"
                             :currentItem="currentItem"
                             @scrollItems="scrollItems"></tracks-list-content>
    </div>
</template>

<script>
    import VueX from 'vuex'
    import TracksListContent from './TracksListContent'
    
    export default {
        data() {
            return {
                currentItem : 0,
                isOpen      : false,
                waypointItem: this.$store.state.playlist.currentTrack
            }
        },
        computed  : {
            ...VueX.mapGetters('playlist', ['tracksCount']),
            /**
             * Calcule le nombre d'elements entre le courant et le point de repere.
             * @returns {Number} Le nombre d'element.
             */
            distanceToWaypoint() {
                return this.currentItem - this.waypointItem
            },
            /**
             * Calcule l'angle au defilement maximum.
             * @returns {Number} L'angle en radians.
             */
            maxWaypointScrollerAngle() {
                const tracksListSize                   = this.$store.state.settings.playlist.tracksList.size
                const tracksListWaypointScrollerHeight = this.$store.state.settings.playlist.tracksList.waypointScroller.height
                const topDistance                      = this.$store.state.settings.windowSize.height / 2
                
                // Verifie si la fenetre a une hauteur suffisante.
                if ((tracksListSize + tracksListWaypointScrollerHeight) > topDistance) {
                    // Calcule l'angle dynamiquement.
                    let angle = Math.PI / 2 - Math.acos(topDistance / (tracksListSize + tracksListWaypointScrollerHeight))
                    // Enleve la hauteur angulaire du chariot comme marge.
                    angle -= this.$store.state.settings.playlist.tracksList.waypointScroller.angularHeight
                    
                    return angle
                }
                
                return this.$store.state.settings.playlist.tracksList.waypointScroller.defaultMaxAngle
            },
            /**
             * Determine si le chariot de defilement doit etre affiche.
             * @returns {Boolean}
             */
            waypointScroller() {
                return this.waypointItem !== -1 &&
                       Math.abs(this.waypointScrollerAngle) > this.$store.state.settings.playlist.tracksList.close.angularHeight
            },
            /**
             * Calcule l'angle du chariot de defilement par rapport a la distance etre l'element courant et le point de repere.
             * @returns {Number} L'angle en radians.
             */
            waypointScrollerAngle() {
                // Calcule le nombre d'element au dessus/en dessous du point de repere.
                const upperItemsCount  = this.waypointItem
                const downerItemsCount = this.tracksCount - 1 - this.waypointItem
                
                // Choisi le plus grand nombre d'element de chaque cotes du point de repere comme reference.
                const distanceRatio = this.distanceToWaypoint / ((upperItemsCount > downerItemsCount) ? upperItemsCount : downerItemsCount)
                
                return distanceRatio * this.maxWaypointScrollerAngle
            },
            /**
             * Compile le style dynamique du chariot de defilement.
             * @returns {String} Le contenu de l'attribut style.
             */
            waypointScrollerContainerStyle() {
                return `transform: translateY(-50%) rotate(${this.waypointScrollerAngle}rad);`
            }
        },
        methods   : {
            /**
             * Change l'element courant au defilement.
             * @param {MouseEvent} event - L'evenement capture.
             */
            scrollItems(event) {
                const that = this
                
                this.$nextTick(function () { // Ne met a jour la variable qu'a chaque mise a jour du DOM.
                    that.currentItem += (event.deltaY ? ((event.deltaY < 0) ? -1 : 1) : 0) // Incremente ou decremente selon le signe.
                    
                    // Verifie si la nouvelle valeur ne depasse le nombre possible.
                    if (that.currentItem < 0) {
                        that.currentItem = 0
                    }
                    if (that.currentItem > that.tracksCount - 1) {
                        that.currentItem = that.tracksCount - 1
                    }
                })
            }
        },
        components: {
            TracksListContent
        }
    }
</script>

<style src="./style.scss"></style>
