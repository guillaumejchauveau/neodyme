<template>
  <div class="c-panel" :class="{'c-panel--tracks-list-opened': tracksListActive}">
    <navigation></navigation>
    <displayer></displayer>
    <fab class="c-panel__playall o-app-fab--fixed"><span class="mdc-fab__icon" @click="playAll()"></span></fab>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
