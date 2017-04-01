<template>
    <div class="tracksList-content">
        <transition name="tracksList-items-transition">
            <div v-if="isOpen" class="tracksList-items" @mousewheel="dispatchScrollItemsEvent">
                <div v-if="waypointItemIndex !== -1" class="tracksList-waypoint" :style="waypointItemStyle"></div>
                <tracks-list-item v-for="(track, index) in this.$store.state.playlist.tracks"
                                  :key="index"
                                  :data="track.dcs.criteria"
                                  :position="computeItemPosition(index)"></tracks-list-item>
            </div>
        </transition>
    </div>
</template>

<script>
    import VueX from 'vuex'
    import TracksListItem from './TracksListItem'
    
    export default {
        data() {
            const itemAngularHeight = this.$store.state.settings.playlist.tracksList.item.angularHeight
            
            let maxItemCount = Math.floor(Math.PI / itemAngularHeight) // Calcule le nombre d'elements entierement affichables.
            maxItemCount += 1 + (maxItemCount % 2 !== 0) // Ajoute le nombre d'elements partiellement affichables.
            
            return {
                itemAngularHeight,
                maxItemCount
            }
        },
        computed  : {
            ...VueX.mapState('playlist', {
                waypointItemIndex: state => state.currentTrackIndex
            }),
            /**
             * Compile le style dynamique du point de repere.
             * @returns {String} Le contenu de l'attribut style.
             */
            waypointItemStyle() {
                return `transform: translateY(-50%) rotate(${this.computeItemPosition(this.waypointItemIndex) * this.itemAngularHeight}rad);`
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
             * Informe le composant principal d'un defilement.
             * @param {MouseEvent} event - L'evenement capture.
             */
            dispatchScrollItemsEvent(event) {
                this.$emit('scrollItems', event)
            }
        },
        components: {
            TracksListItem
        },
        props     : {
            isOpen     : {
                type    : Boolean,
                required: true
            },
            currentItem: {
                type    : Number,
                required: true
            }
        }
    }
</script>

<style src="./style.scss"></style>
