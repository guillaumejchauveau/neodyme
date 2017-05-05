<template>
  <div class="c-playlist">
    <div class="c-playlist__content">
      <tracks-list @trackAction="trackActionHandler"></tracks-list>
      <control-panel @play="$nextTick(play)"
                     @pause="$nextTick(pause)"
                     @stop="$nextTick(stop)"
                     @previous="$nextTick(previous)"
                     @next="$nextTick(next)"
                     @clear="$nextTick(clear)"></control-panel>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
