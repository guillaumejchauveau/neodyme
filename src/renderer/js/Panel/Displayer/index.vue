<template>
  <div class="displayer">
      <div class="displayer_items" v-if="currentPanelConfig.criterionType !== 'title'">
          <item v-for="item in sortedCriteriaSets" :key="item" :criteriaSet="item"></item>
      </div>
    <list v-if="currentPanelConfig.criterionType === 'title'"></list>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
