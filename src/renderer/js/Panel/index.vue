<template>
  <div class="panel" :class="{tracksListOpened: tracksListOpened}">
    <navigation></navigation>
    <displayer></displayer>
    <fab class="panel_playAllButton app-fab--fixed" ><span class="mdc-fab__icon" @click="playAll()"></span></fab>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
