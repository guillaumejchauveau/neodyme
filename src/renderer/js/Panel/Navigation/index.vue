<template>
  <div class="navigation">
    <div class="navigation_card">
      <button class="navigation_card_button back"
              :class="{disabled: isHistoryEmpty}"
              @click="backPanel()"
              title="Retour"
              v-ripple><span></span></button>
      <button v-for="panelLink in panelLinks"
              class="navigation_card_button"
              :class="[{current: activePanelPreset === panelLink}, panelLink]"
              @click="setPreset(panelLink)"
              v-ripple><span></span></button>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss"></style>
