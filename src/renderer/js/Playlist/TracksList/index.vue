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
        data() {
            return {
                currentItem    : 0,
                isOpen         : false,
                tracksListItems: [],
                waypointItem   : -1
            }
        },
        computed  : {
            distanceToWaypoint() {
                return this.currentItem - this.waypointItem
            },
            maxWaypointScrollerAngle() {
                const tracksListSize                   = this.$store.state.settings.playlist.tracksList.size
                const tracksListWaypointScrollerHeight = this.$store.state.settings.playlist.tracksList.waypointScroller.height
                const topDistance                      = this.$store.state.settings.windowSize.height / 2
                
                if ((tracksListSize + tracksListWaypointScrollerHeight) > topDistance) {
                    let angle = Math.PI / 2 - Math.acos(topDistance / (tracksListSize + tracksListWaypointScrollerHeight))
                    angle -= this.$store.state.settings.playlist.tracksList.waypointScroller.angularHeight
                    return angle
                } else {
                    return this.$store.state.settings.playlist.tracksList.waypointScroller.defaultMaxAngle
                }
            },
            waypointScroller() {
                return this.waypointItem !== -1 &&
                       Math.abs(this.waypointScrollerAngle) > this.$store.state.settings.playlist.tracksList.close.angularHeight
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
            }
        },
        components: {
            TracksListContent
        }
    }
</script>

<style src="./style.scss"></style>
