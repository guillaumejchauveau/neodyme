<template>
    <div id="tracksList" :class="{active: isOpen}">
        <div class="tracksList-hoverZone"></div>
        
        <button key="tracksList-open"
                v-if="tracksListItems.length && !isOpen"
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
                             :waypointItem="waypointItem"
                             @scrollItems="scrollItems"></tracks-list-content>
    </div>
</template>

<script>
    import TracksListContent from './TracksListContent'
    
    export default {
        components: {
            TracksListContent
        },
        computed  : {
            distanceToWaypoint() {
                return this.currentItem - this.waypointItem
            },
            maxWaypointScrollerAngle() {
                const controlPanelSize                      = 130 // TODO: ConfigStore
                const tracksListSize                        = controlPanelSize * 3 // TODO: ConfigStore
                const tracksListWaypointScrollerSize        = 45 // TODO: ConfigStore
                const tracksListWaypointScrollerAngularSize = Math.asin((tracksListWaypointScrollerSize / 2)
                                                                        / tracksListSize) * 2 // TODO: ConfigStore
                const defaultMaxWaypointScrollerAngle       = Math.PI / 2.5 // TODO: ConfigStore
                
                const topDistance = this.windowSize.height / 2
                
                if ((tracksListSize + tracksListWaypointScrollerSize) > topDistance) {
                    return Math.PI / 2 - Math.acos(topDistance / (tracksListSize + tracksListWaypointScrollerSize)) - tracksListWaypointScrollerAngularSize
                } else {
                    return defaultMaxWaypointScrollerAngle
                }
            },
            waypointScroller() {
                const controlPanelSize             = 130 // TODO: ConfigStore
                const tracksListCloseSize          = 45 // TODO: ConfigStore
                const tracksListSize               = controlPanelSize * 3 // TODO: ConfigStore
                const tracksListCloseAngularHeight = Math.asin((tracksListCloseSize / 2)
                                                               / tracksListSize) * 2 // TODO: ConfigStore
                
                return Math.abs(this.waypointScrollerAngle) > tracksListCloseAngularHeight
            },
            waypointScrollerAngle() {
                const upperItemsCount  = this.waypointItem
                const downerItemsCount = this.tracksListItems.length - 1 - this.waypointItem
                
                const distanceRatio = this.distanceToWaypoint / ((upperItemsCount > downerItemsCount) ? upperItemsCount : downerItemsCount)
                
                return distanceRatio * this.maxWaypointScrollerAngle
            },
            waypointScrollerContainerStyle() {
                return `transform: translateY(-50%) rotate(${this.waypointScrollerAngle}rad);`
            }
        },
        data() {
            const controlPanelSize     = 130 // TODO: ConfigStore
            const tracksListItemHeight = 35 // TODO: ConfigStore
            
            const itemAngularHeight = Math.asin((tracksListItemHeight / 2)
                                                / controlPanelSize) * 2 // Calcule le sinus du triangle rectangle, l'arcsinus, double pour avoir l'angle entier (en radians).
            let maxItemCount        = Math.floor(Math.PI / itemAngularHeight) // Calcule le nombre d'elements entierement affichables.
            maxItemCount += 1 + (maxItemCount % 2 !== 0) // Ajoute le nombre d'elements partiellement affichables.
            
            return {
                currentItem    : 0,
                isOpen         : false,
                tracksListItems: [
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                ],
                waypointItem   : 2,
                windowSize     : { // TODO: ConfigStore
                    height: 0,
                    width : 0
                }
            }
        },
        methods   : {
            /**
             * Change l'element courant.
             * @param event
             */
            scrollItems(event) {
                const that = this
                this.$nextTick(function () {
                    that.currentItem += (event.deltaY ? ((event.deltaY < 0) ? -1 : 1) : 0) // Incremente ou decremente selon le signe.
                    if (that.currentItem < 0) {
                        that.currentItem = 0
                    }
                    if (that.currentItem > that.tracksListItems.length - 1) {
                        that.currentItem = that.tracksListItems.length - 1
                    }
                })
            },
            getWindowSize() { // TODO: ConfigStore
                this.windowSize.height = window.innerHeight
                this.windowSize.width  = window.innerWidth
            }
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowSize) // TODO: ConfigStore
                this.getWindowSize()
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowSize) // TODO: ConfigStore
        }
    }
</script>

<style src="./style.scss"></style>
