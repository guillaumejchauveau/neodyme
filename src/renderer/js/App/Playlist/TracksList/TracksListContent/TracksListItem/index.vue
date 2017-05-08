<template>
  <div class="c-tracks-list-item"
       :style="itemStyle"
       @dblclick="$emit('trackAction', 'play', position)"
       @contextmenu.prevent="active = !active">
    <button class="c-tracks-list-item-menu-toggler" title="Ouvrir" @click.stop="active = !active" v-ripple>
      <span class="c-tracks-list-item-menu-toggler__icon"></span>
    </button>
    <ul v-if="active" class="c-tracks-list-item-menu">
      <tracks-list-item-action name="play" readableName="Lire" @trigger="trackAction"></tracks-list-item-action>
      <tracks-list-item-action name="remove" readableName="Supprimer" @trigger="trackAction"></tracks-list-item-action>
    </ul>
    <div v-if="!active" class="c-tracks-list-item__content">{{ data.title.value }}</div>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
