<template>
  <div class="c-control-panel">
    <div class="c-control-panel__position-indicator" :style="positionIndicatorStyle"></div>
    <div class="c-control-panel__content">
      <div class="c-control-panel__position">{{ formattedTime(position) }}</div>
      <div class="c-control-panel__controls">
        <button class="o-control-panel__control o-control-panel__control-btn o-control-panel__control--main"
                :class="{'o-control-panel__control--pause': playerIs('PLAYING'), 'o-control-panel__control--disabled': !tracksCount || playerIs('LOADING')}"
                :title="playerIs('PLAYING') ? 'Pause' : 'Lire'"
                @click="$emit(playerIs('PLAYING') ? 'pause' : 'play')"
                v-ripple><span></span></button>
        <button class="o-control-panel__control o-control-panel__control-btn o-control-panel__control--previous"
                :class="{'o-control-panel__control--disabled': currentTrackIndex <= 0 || playerIs('LOADING')}"
                title="Precedent"
                @click="$emit('previous')"
                v-ripple><span></span></button>
        <button class="o-control-panel__control o-control-panel__control-btn o-control-panel__control--next"
                :class="{'o-control-panel__control--disabled': currentTrackIndex >= tracksCount-1 || playerIs('LOADING')}"
                title="Suivant"
                @click="$emit('next')"
                v-ripple><span></span></button>
        <button class="o-control-panel__control o-control-panel__control-btn o-control-panel__control--stop"
                :class="{'o-control-panel__control--disabled': currentTrackIndex === -1 || playerIs('LOADING')}"
                title="Stop"
                @click="$emit('stop')"
                v-ripple><span></span></button>
      </div>
      <mdc-menu class="c-control-panel__menu">
        <li class="mdc-list-item o-control-panel-menu__action"
            :class="{'o-control-panel-menu__action--disabled': !tracksCount || playerIs('LOADING')}"
            role="menuitem"
            title="Effacer la liste de lecture"
            @click="$emit('clear')">Effacer
        </li>
      </mdc-menu>
      <div class="c-control-panel__duration">{{ formattedTime(duration) }}</div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
