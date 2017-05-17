<template>
  <div class="c-playlist">
    <div class="c-playlist__content">
      <tracks-list @trackAction="trackActionHandler"></tracks-list>
      <control-panel @play="play"
                     @pause="pause"
                     @stop="stop"
                     @previous="previous"
                     @next="next"
                     @clear="clear"></control-panel>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
