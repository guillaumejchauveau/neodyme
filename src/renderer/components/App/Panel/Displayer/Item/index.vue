<template>
  <div class="c-item">
    <div class="c-item__card" @click="setNextPanel" v-ripple>
      <div class="c-item__picture">
        <div class="c-item__picture-background"></div>
        <div class="c-item__picture-img"></div>
      </div>
      <div class="c-item__text">
        <span class="c-item__text-content"
              :class="{'c-item__text-content--shortened': isScrollingTextEnabled}">
          {{itemName}}
        </span>
        <span v-if="isScrollingTextEnabled"
              class="c-item__text-content c-item__text-content--scrollable"
              :style="`animation-duration: ${itemTextScrollingDuration}s;`"
              ref="scrollableText">
          {{itemName}}
        </span>
      </div>
    </div>
    <mdc-menu class="c-item-menu">
      <mdc-menu-item @trigger="playNow">Lire maintenant</mdc-menu-item>
      <mdc-menu-item @trigger="playAfter">Écouter après titre en cours</mdc-menu-item>
      <mdc-menu-item @trigger="addToPlaylist">Ajouter à la liste de lecture</mdc-menu-item>
    </mdc-menu>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
