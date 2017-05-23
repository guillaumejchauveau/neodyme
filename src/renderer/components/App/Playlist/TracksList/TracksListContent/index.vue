<template>
  <div class="c-tracks-list__content">
    <transition name="js-tracks-list-items__transition">
      <div v-if="active" class="c-tracks-list-items" @mousewheel.prevent="mouseWheelHandler">
        <div v-if="waypointItemIndex !== -1" class="c-tracks-list-waypoint" :style="waypointItemStyle"></div>
        <tracks-list-item v-for="(track, index) in $store.state.playlist.tracks"
                          :key="index"
                          :data="track.dcs.criteria"
                          :trackIndex="index"
                          :position="computeItemPosition(index)"></tracks-list-item>
      </div>
    </transition>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
