<template>
  <div class="displayer">
    <div class="displayer_items"
         v-if="getCurrentPanelConfig.criterionType !== 'title'">
        <item v-for="item in getCurrentPanelElements.criteriaSets"
              :key="item"
              :criteriaSet="item"></item>
    </div>
    <list v-if="getCurrentPanelConfig.criterionType === 'title'"></list>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
