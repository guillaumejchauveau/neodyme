<template>
  <div class="c-displayer">
    <div class="c-displayer__items"
         v-if="getCurrentPanelConfig.criterionType !== 'title' && !isEmptyDisplayer">
      <item v-for="item in getCurrentPanelElements.criteriaSets"
            :key="item"
            :criteriaSet="item"></item>
    </div>
    <list v-if="getCurrentPanelConfig.criterionType === 'title' && !isEmptyDisplayer"></list>
    <div class="c-displayer__emptyscreen" v-if="isEmptyDisplayer">
      <div class="c-displayer__emptyscreen-text">Aucune piste trouvée</div>
      <div class="c-displayer__emptyscreen-logo">
        <div class="c-displayer__emptyscreen-logo-shadow"></div>
        <div class="c-displayer__emptyscreen-logo-main-circle">
          <div class="c-displayer__emptyscreen-logo-main-circle-black">
            <div class="c-displayer__emptyscreen-logo-main-circle-silver"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
