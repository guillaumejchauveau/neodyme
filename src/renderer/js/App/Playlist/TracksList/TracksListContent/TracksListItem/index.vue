<template>
  <div class="c-tracks-list-item"
       :style="itemStyle"
       @dblclick="$emit('trackAction', 'play', position)"
       @contextmenu.prevent="active = !active">
    <button :class="{active}" title="Ouvrir" @click.stop="active = !active" v-ripple><span></span></button>
    <ul v-if="active" class="c-tracks-list-item__menu">
      <li>
        <button class="o-tracks-list-item-menu__action o-tracks-list-item-menu__action--play"
                :class="{'o-tracks-list-item__menu-action--disabled': playerIs('LOADING')}"
                title="Lire"
                @click="trackAction('play')">
          <span></span>
        </button>
      </li>
      <li>
        <button class="o-tracks-list-item-menu__action o-tracks-list-item-menu__action--remove"
                :class="{'o-tracks-list-item__menu-action--disabled': playerIs('LOADING')}"
                title="Supprimer"
                @click="trackAction('remove')">
          <span></span>
        </button>
      </li>
    </ul>
    <div v-if="!active" class="c-tracks-list-item__content">{{ data.title.value }}</div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
