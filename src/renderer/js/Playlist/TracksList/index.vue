<template>
    <div id="tracksList" :class="{active}">
        <div class="tracksList-hoverZone"></div>
        
        <button key="tracksList-open"
                v-if="tracksCount && !active"
                class="tracksList-open"
                title="Ouvrir"
                @click="open"
                v-ripple></button>
        
        <transition-group name="tracksList-buttons-transition">
            <button key="tracksList-close"
                    v-if="active"
                    class="tracksList-close"
                    title="Fermer"
                    @click="close"
                    v-ripple><span></span></button>
            <div key="tracksList-waypoint-scroller-container"
                 v-if="waypointScroller && active"
                 class="tracksList-waypoint-scroller-container"
                 :style="waypointScrollerContainerStyle">
                <button class="tracksList-waypoint-scroller"
                        :class="{down: distanceToWaypoint < 0}"
                        title="Aller à la piste en cours"
                        @click="currentItem = waypointItemIndex"
                        v-ripple><span></span></button>
            </div>
        </transition-group>
        
        <tracks-list-content :currentItem="computedCurrentItem"
                             @scrollItems="scrollItemsHandler"
                             @trackAction="trackActionHandler"></tracks-list-content>
    </div>
</template>

<script>
    import VueX from 'vuex'
    import TracksListContent from './TracksListContent'
    
    export default {
        data() {
            return {
                currentItem         : 0,
                waypointItemTracking: false
            }
        },
        computed  : {
            ...VueX.mapState('playlist', {
                waypointItemIndex: 'currentTrackIndex'
            }),
            ...VueX.mapState('playlist/tracksList', {isActive: 'active'}),
            ...VueX.mapGetters('playlist', ['tracksCount']),
            /**
             * Determine si la liste des pistes doit etre ouverte ou fermee.
             * @returns {Boolean}
             */
            active() {
                return this.tracksCount && this.isActive
            },
            /**
             * Determine la valeur de l'element courant en prenant en compte l'option de suivi du point de repere.
             * @returns {Number}
             */
            computedCurrentItem() {
                if (this.currentItem === this.waypointItemIndex) {
                    this.waypointItemTracking = true
                }
                if (this.waypointItemIndex === -1) {
                    this.waypointItemTracking = false
                }
                
                return this.currentItem = this.waypointItemTracking ? this.waypointItemIndex : this.currentItem
            },
            /**
             * Calcule le nombre d'elements entre l'element courant et le point de repere.
             * @returns {Number} Le nombre d'element.
             */
            distanceToWaypoint() {
                return this.computedCurrentItem - this.waypointItemIndex
            },
            /**
             * Calcule l'angle au defilement maximum.
             * @returns {Number} L'angle (en radians).
             */
            maxWaypointScrollerAngle() {
                const tracksListSize                   = this.$store.state.settings.playlist.tracksList.size
                const tracksListWaypointScrollerHeight = this.$store.state.settings.playlist.tracksList.waypointScroller.height
                const topDistance                      = this.$store.state.settings.windowSize.height / 2
                
                if ((tracksListSize + tracksListWaypointScrollerHeight) > topDistance) { // Si la fenetre n'est pas suffisament haute.
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
                return this.waypointItemIndex !== -1 &&
                       Math.abs(this.waypointScrollerAngle) > this.$store.state.settings.playlist.tracksList.close.angularHeight
            },
            /**
             * Calcule l'angle du chariot de defilement par rapport a la distance entre l'element courant et le point de repere.
             * @returns {Number} L'angle (en radians).
             */
            waypointScrollerAngle() {
                // Calcule le nombre d'element au dessus/en dessous du point de repere.
                const upperItemsCount  = this.waypointItemIndex
                const downerItemsCount = this.tracksCount - 1 - this.waypointItemIndex
                
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
            ...VueX.mapMutations({
                                     open : 'playlist/tracksList/OPEN',
                                     close: 'playlist/tracksList/CLOSE'
                                 }),
            /**
             * Change l'element courant au defilement.
             * @param {MouseEvent} event - L'evenement capture.
             */
            scrollItemsHandler(event) {
                this.$nextTick(() => { // Attend la prochaine actualisation du DOM pour commencer.
                    if (this.waypointItemTracking) {
                        this.currentItem          = this.computedCurrentItem
                        this.waypointItemTracking = false
                    }
                    
                    this.currentItem += Math.sign(event.deltaY) // Incremente ou decremente selon le signe.
                    
                    // Verifie que la nouvelle valeur soit possible.
                    if (this.currentItem < 0) {
                        this.currentItem = 0
                    }
                    if (this.currentItem > this.tracksCount - 1) {
                        this.currentItem = this.tracksCount - 1
                    }
                })
            },
            /**
             * Transmet l'evenement trackAction.
             * @param {String} action - L'action a effectuer.
             * @param {Number} index  - L'index de la piste.
             */
            trackActionHandler(action, index) {
                this.$emit('trackAction', action, index)
            }
        },
        components: {
            TracksListContent
        }
    }
</script>

<style src="./style.scss"></style>
