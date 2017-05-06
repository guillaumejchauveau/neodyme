<template>
  <div class="mdc-menu-anchor">
    <button class="mdc-menu-anchor-btn" @click="toggle" v-ripple>
      <span class="mdc-menu-anchor-btn__icon" :class="{'mdc-menu-anchor-btn__icon--horiz': horiz}"></span>
    </button>
    <div class="mdc-simple-menu">
      <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
