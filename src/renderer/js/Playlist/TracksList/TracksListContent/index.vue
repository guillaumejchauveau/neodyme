<template>
    <div class="tracksList-content">
        <transition name="tracksList-items-transition">
            <div v-if="isOpen" class="tracksList-items" @mousewheel="dispatchScrollItemsEvent">
                <div v-if="waypointItem !== false" class="tracksList-waypoint" :style="waypointItemStyle"></div>
                <tracks-list-item v-for="(item, index) in tracksListItems"
                                  :position="computeItemPosition(index)"
                                  :angular-height="itemAngularHeight"></tracks-list-item>
            </div>
        </transition>
    </div>
</template>

<script>
    import TracksListItem from './TracksListItem'
    
    export default {
        components: {
            TracksListItem
        },
        computed  : {
            waypointItemStyle() {
                return `transform: translateY(-50%) rotate(${this.computeItemPosition(this.waypointItem) * this.itemAngularHeight}rad);`
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
                itemAngularHeight,
                maxItemCount,
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
                ]
            }
        },
        props     : {
            isOpen      : {
                type    : Boolean,
                required: true
            },
            currentItem : {
                type    : Number,
                required: true
            },
            waypointItem: {
                type    : Number,
                required: true
            }
        },
        methods   : {
            /**
             * Calcule la position d'un element par rapport a l'element courant.
             * @param {number} index - La position absolue.
             * @returns {number} - La position relative.
             */
            computeItemPosition(index) {
                let distance = index - this.currentItem
                if (Math.abs(distance) > this.maxItemCount) {
                    distance = (distance ? ((distance < 0) ? -1 : 1) : 0) * (this.maxItemCount + 1)
                }
                
                return distance
            },
            /**
             * Informe le composant principal d'un defilement d'elements.
             * @param {MouseEvent} event - L'evenement original.
             */
            dispatchScrollItemsEvent(event) {
                this.$emit('scrollItems', event)
            }
        }
    }
</script>

<style src="./style.scss"></style>
