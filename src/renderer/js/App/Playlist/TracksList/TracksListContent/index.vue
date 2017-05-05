<template>
  <div class="c-tracks-list__content">
    <transition name="js-tracks-list__items-transition">
      <div v-if="active" class="c-tracks-list__items" @mousewheel="scrollItemsHandler">
        <div v-if="waypointItemIndex !== -1" class="c-tracks-list__waypoint" :style="waypointItemStyle"></div>
        <tracks-list-item v-for="(track, index) in this.$store.state.playlist.tracks"
                          :key="index"
                          :data="track.dcs.criteria"
                          :position="computeItemPosition(index)"
                          @trackAction="trackActionHandler"></tracks-list-item>
      </div>
    </transition>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
