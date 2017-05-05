<template>
  <div  class="item"
        :class="{scrollingEnabled: isScrollingTextEnabled}">
    <div class="item_card" v-ripple  @click="setNextPanel(newCriterion)">
      <div class="item_picture">
        <div class="picture_background"></div>
<<<<<<< HEAD
          <img src="../../../../static/img/blank_cover.png">
      </div>
      <div class="item_text">
        <span>{{itemName}}</span>
=======
        <img src="../../../../static/img/blank_cover.png">
      </div>
      <div class="item_text">
        <p>{{itemName}}</p>
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
      </div>
  </div>
  <mdc-menu class="item_menu">
    <li class="mdc-list-item" role="menuitem" v-ripple @click="play()">Lire maintenant</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="playAfter()">Lire après le titre en cours</li>
    <li class="mdc-list-item" role="menuitem" v-ripple @click="addToPlaylist()">Ajouter à la liste de lecture</li>
  </mdc-menu>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
