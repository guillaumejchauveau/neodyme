<template>
  <div class="c-list">
    <table class="c-list__table">
      <tr class="c-list-header">
        <listheadertag tagValue="trackNumber" tagTitle="N°"></listheadertag>
        <listheadertag tagValue="title" tagTitle="NOM"></listheadertag>
        <listheadertag tagValue="album" tagTitle="ALBUM"></listheadertag>
        <listheadertag tagValue="artist" tagTitle="ARTISTE"></listheadertag>
        <listheadertag tagValue="duration" tagTitle=""></listheadertag>
      </tr>
      <listrow v-for="element in getCurrentPanelElements.decisiveCriteriaSets"
               :key="element"
               :element="element"
               :class="{'c-listrow--last': element ===
               (getCurrentPanelElements.decisiveCriteriaSets[getCurrentPanelElements.decisiveCriteriaSets.length - 1])}"
               @play="playNow(element)"></listrow>
    </table>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
