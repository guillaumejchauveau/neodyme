<template>
  <div class="displayer">
<<<<<<< HEAD
    <div class="displayer_items"
         v-if="getCurrentPanelConfig.criterionType !== 'title'">
        <item v-for="item in getCurrentPanelElements.criteriaSets"
              :key="item"
              :criteriaSet="item"></item>
    </div>
    <list v-if="getCurrentPanelConfig.criterionType === 'title'"></list>
=======
      <div class="displayer_items" v-if="currentPanelConfig.criterionType !== 'title'">
          <item v-for="item in sortedCriteriaSets" :key="item" :criteriaSet="item"></item>
      </div>
    <list v-if="currentPanelConfig.criterionType === 'title'"></list>
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
