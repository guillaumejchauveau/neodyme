<template>
  <div class="c-tracks-list" :class="{'c-tracks-list--active': active}">
    <div class="c-tracks-list-hover-zone"></div>

    <button v-if="tracksCount && !active"
            class="c-tracks-list-open"
            title="Ouvrir"
            @click="openTracksList"
            v-ripple></button>

    <transition-group name="js-tracks-list-buttons__transition">
      <button key="c-tracks-list-close"
              v-if="active"
              class="c-tracks-list-close"
              title="Fermer"
              @click="closeTracksList"
              v-ripple>
        <span class="c-tracks-list-close__icon"></span>
      </button>
      <div key="c-tracks-list-waypoint-scroller__container"
           v-if="waypointScroller && active"
           class="c-tracks-list-waypoint-scroller__container"
           :style="waypointScrollerContainerStyle">
        <button class="c-tracks-list-waypoint-scroller"
                :class="{'c-tracks-list-waypoint-scroller--down': distanceToWaypoint < 0}"
                title="Aller à la piste en cours"
                @click="setCurrentItem(waypointItemIndex)"
                v-ripple>
          <span class="c-tracks-list-waypoint-scroller__icon"></span>
        </button>
      </div>
    </transition-group>

    <tracks-list-content></tracks-list-content>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
