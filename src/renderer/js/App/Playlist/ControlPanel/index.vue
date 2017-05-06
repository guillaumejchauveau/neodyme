<template>
  <div class="c-control-panel">
    <div class="c-control-panel-position-indicator" :style="positionIndicatorStyle"></div>
    <div class="c-control-panel__content">
      <div class="c-control-panel-position">{{ formattedTime(position) }}</div>
      <div class="c-control-panel-controls">
        <button class="c-control-panel-control c-control-panel-control--btn c-control-panel-control--main"
                :class="{'c-control-panel-control--pause': playerIs('PLAYING'),
                'c-control-panel-control--disabled': !tracksCount || playerIs('LOADING')}"
                :title="playerIs('PLAYING') ? 'Pause' : 'Lire'"
                @click="$emit(playerIs('PLAYING') ? 'pause' : 'play')"
                v-ripple><span></span></button>
        <button class="c-control-panel-control c-control-panel-control--btn c-control-panel-control--previous"
                :class="{'c-control-panel-control--disabled': currentTrackIndex <= 0 || playerIs('LOADING')}"
                title="Precedent"
                @click="$emit('previous')"
                v-ripple><span></span></button>
        <button class="c-control-panel-control c-control-panel-control--btn c-control-panel-control--next"
                :class="{'c-control-panel-control--disabled': currentTrackIndex >= tracksCount - 1 ||
                playerIs('LOADING')}"
                title="Suivant"
                @click="$emit('next')"
                v-ripple><span></span></button>
        <button class="c-control-panel-control c-control-panel-control--btn c-control-panel-control--stop"
                :class="{'c-control-panel-control--disabled': currentTrackIndex === -1 || playerIs('LOADING')}"
                title="Stop"
                @click="$emit('stop')"
                v-ripple><span></span></button>
      </div>
      <mdc-menu class="c-control-panel-menu">
        <mdc-menu-item class="c-control-panel-menu-action"
                       :class="{'c-control-panel-menu-action--disabled': !tracksCount || playerIs('LOADING')}"
                       title="Effacer la liste de lecture"
                       @trigger="$emit('clear')">Effacer
        </mdc-menu-item>
      </mdc-menu>
      <div class="c-control-panel-duration">{{ formattedTime(duration) }}</div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
