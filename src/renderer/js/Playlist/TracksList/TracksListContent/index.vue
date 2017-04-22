<template>
    <div class="tracksList-content">
        <transition name="tracksList-items-transition">
            <div v-if="active" class="tracksList-items" @mousewheel="scrollItemsHandler">
                <div v-if="waypointItemIndex !== -1" class="tracksList-waypoint" :style="waypointItemStyle"></div>
                <tracks-list-item v-for="(track, index) in this.$store.state.playlist.tracks"
                                  :key="index"
                                  :data="track.dcs.criteria"
                                  :position="computeItemPosition(index)"
                                  @trackAction="trackActionHandler"></tracks-list-item>
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
             * @param {Number} index - La position absolue.
             * @returns {Number} - La position relative.
             */
            computeItemPosition(index) {
                let distance = index - this.currentItem
                if (Math.abs(distance) > this.maxItemCount) {
                    distance = Math.sign(distance) * (this.maxItemCount + 1)
                }
                
                return distance
            },
            /**
             * Transmet l'evenement scrollItems.
             * @param {MouseEvent} event - L'evenement capture.
             */
            scrollItemsHandler(event) {
                this.$emit('scrollItems', event)
            },
            /**
             * Transmet l'evenement trackAction en convertissant la position relative en index de piste.
             * @param {String} action           - L'action a effectuer.
             * @param {Number} relativePosition - La position relative a l'element courant.
             */
            trackActionHandler(action, relativePosition) {
                const index = this.currentItem + relativePosition
                this.$emit('trackAction', action, index)
            }
        },
        components: {
            TracksListItem
        },
        props     : {
            currentItem: {
                type    : Number,
                required: true
            }
        }
    }
</script>

<style src="./style.scss"></style>
