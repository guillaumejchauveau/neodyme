<template>
  <div class="c-tracks-list" :class="{'c-tracks-list--active': active}">
    <div class="c-tracks-list__hover-zone"></div>

    <button v-if="tracksCount && !active"
            class="c-tracks-list__open"
            title="Ouvrir"
            @click="open"
            v-ripple></button>

    <transition-group name="js-tracks-list__buttons-transition">
      <button key="c-tracks-list__close"
              v-if="active"
              class="c-tracks-list__close"
              title="Fermer"
              @click="close"
              v-ripple><span></span></button>
      <div key="c-tracks-list__waypoint-scroller-container"
           v-if="waypointScroller && active"
           class="c-tracks-list__waypoint-scroller-container"
           :style="waypointScrollerContainerStyle">
        <button class="c-tracks-list__waypoint-scroller"
                :class="{'c-tracks-list__waypoint-scroller--down': distanceToWaypoint < 0}"
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

<script src="./script.js"></script>
<style src="./style.scss"></style>
