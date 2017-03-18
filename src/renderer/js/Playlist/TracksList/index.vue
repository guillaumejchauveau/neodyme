<template>
    <div id="tracksList" :class="{active: isOpen}">
        <div class="tracksList-hoverZone"></div>
        <button v-if="tracksListItems.length" class="tracksList-open" :class="{active: !isOpen}" @click="isOpen = true" v-ripple></button>
        <button class="tracksList-close" :class="{active: isOpen}" @click="isOpen = false" v-ripple><span></span>
        </button>
        <div class="tracksList-content">
            <transition name="tracksList-items-transition">
                <div v-if="isOpen" class="tracksList-items" @mousewheel="scrollItems">
                    <tracks-list-item v-for="(item, index) in tracksListItems"
                                      :position="computeItemPosition(index)"
                                      :angular-height="itemAngularHeight"></tracks-list-item>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import TracksListItem from './TracksListItem'
    
    export default {
        components: {
            TracksListItem
        },
        data() {
            const controlPanelSize     = 130
            const tracksListItemHeight = 35
            
            const itemAngularHeight = Math.asin((tracksListItemHeight / 2)
                                                / controlPanelSize) * 2 // Calcule le sinus du triangle rectangle, l'arcsinus, double pour avoir l'angle entier (en radians).
            let maxItemCount        = Math.floor(Math.PI / itemAngularHeight) // Calcule le nombre d'elements entierement affichables.
            maxItemCount += 1 + (maxItemCount % 2 !== 0) // Ajoute le nombre d'elements partiellement affichables.
            
            return {
                currentItem    : 0,
                isOpen         : false,
                itemAngularHeight,
                maxItemCount,
                tracksListItems: [
                ]
            }
        },
        methods   : {
            computeItemPosition(index) {
                let distance = index - this.currentItem
                if (Math.abs(distance) > this.maxItemCount) {
                    distance = (distance ? ((distance < 0) ? -1 : 1) : 0) * (this.maxItemCount + 1)
                }
                
                return distance
            },
            scrollItems(e) {
                const that = this
                window.requestAnimationFrame(function () {
                    that.currentItem += (e.deltaY ? ((e.deltaY < 0) ? -1 : 1) : 0)
                    if (that.currentItem < 0) {
                        that.currentItem = 0
                    }
                    if (that.currentItem > that.tracksListItems.length - 1) {
                        that.currentItem = that.tracksListItems.length - 1
                    }
                })
            }
        }
    }
</script>

<style src="./style.scss"></style>
