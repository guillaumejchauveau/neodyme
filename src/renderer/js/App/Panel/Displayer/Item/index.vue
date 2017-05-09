<template>
  <div class="c-item">
    <div class="c-item__card" v-ripple  @click="setNextPanel(newCriterion)">
      <div class="c-item__picture">
        <div class="c-item__picture-background"></div>
          <img class="c-item__picture-img" src="../../../../../static/img/blank_cover.png" alt="blank">
      </div>
      <div class="c-item__text"
           :class="{'c-item__text--scrollable': isScrollingTextEnabled}">
        <span class="c-item__text-content">{{itemName}}</span>
      </div>
  </div>
  <mdc-menu class="c-item-menu">
    <mdc-menu-item @trigger="playNow()">Lire maintenant</mdc-menu-item>
    <mdc-menu-item @trigger="playAfter()">Lire après le titre en cours</mdc-menu-item>
    <mdc-menu-item @trigger="addToPlaylist()">Ajouter à la liste de lecture</mdc-menu-item>
  </mdc-menu>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss"></style>
