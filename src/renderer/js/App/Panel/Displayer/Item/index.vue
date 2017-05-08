<template>
  <div class="c-item">
    <div class="c-item__card" v-ripple  @click="setNextPanel(newCriterion)">
      <div class="c-item__picture">
        <div class="c-item__picture-background"></div>
          <img class="c-item__picture-img" src="../../../../../static/img/blank_cover.png">
      </div>
      <div class="c-item__text"
           :class="{'c-item__text--scrollable': isScrollingTextEnabled}">
        <span class="c-item__text-content">{{itemName}}</span>
      </div>
  </div>
  <mdc-menu class="c-item-menu">
    <li class="mdc-list-item" role="menuitem" v-ripple @click="play()">Lire maintenant</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="playAfter()">Lire après le titre en cours</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="addToPlaylist()">Ajouter à la liste de lecture</li>
  </mdc-menu>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
