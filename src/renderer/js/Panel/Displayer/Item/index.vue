<template>
  <div class="item">
    <div class="item_card" v-ripple  @click="setNextPanel(newCriterion)">
      <div class="item_card_picture">
        <div class="item_card_picture_background"></div>
        <img src="../../../../static/img/blank_cover.png">
      </div>
      <div class="item_card_text">
        <p class="item_card_text_title">{{itemName}}</p>
      </div>
  </div>
  <mdcMenu class="item_menu">
    <li class="mdc-list-item" role="menuitem" v-ripple @click="play()">Lire maintenant</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="playAfter()">Lire après le titre en cours</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="addToPlaylist()">Ajouter à la liste de lecture</li>
  </mdcMenu>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss"></style>
