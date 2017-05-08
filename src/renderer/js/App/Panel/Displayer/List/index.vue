<template>
  <div class="c-list">
    <table class="c-list__table">
      <tr class="c-list-header">
        <td class="c-list-header-tag">
          <span class="c-list-header-tag-sort-type-selector" @click="activateSort('trackNumber')">N°</span>
          <button class="c-list-header-tag-sort-order-selector"
                  :class="{ 'c-list-header-tag-sort-order-selector--sort-active': getActiveSortCriterionType === 'trackNumber',
                            'c-list-header-tag-sort-order-selector--sort-invert': isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="c-list-header-tag">
          <span class="c-list-header-tag-sort-type-selector" @click="activateSort('title')">NOM</span>
          <button class="c-list-header-tag-sort-order-selector"
                  :class="{ 'c-list-header-tag-sort-order-selector--sort-active': getActiveSortCriterionType === 'title',
                            'c-list-header-tag-sort-order-selector--sort-invert': isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="c-list-header-tag">
          <span class="c-list-header-tag-sort-type-selector" @click="activateSort('album')">ALBUM</span>
          <button class="c-list-header-tag-sort-order-selector"
                  :class="{ 'c-list-header-tag-sort-order-selector--sort-active': getActiveSortCriterionType === 'album',
                            'c-list-header-tag-sort-order-selector--sort-invert': isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="c-list-header-tag">
          <span class="c-list-header-tag-sort-type-selector" @click="activateSort('artist')">ARTISTE</span>
          <button class="c-list-header-tag-sort-order-selector"
                  :class="{ 'c-list-header-tag-sort-order-selector--sort-active': getActiveSortCriterionType === 'artist',
                            'c-list-header-tag-sort-order-selector--sort-invert': isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="c-list-header-tag">
          <span class="c-list-header-tag-sort-type-selector" @click="activateSort('duration')">
            <span class="c-list-header-tag-sort-type-selector--duration-icon"></span>
          </span>
          <button class="c-list-header-tag-sort-order-selector c-list-header-tag-sort-order-selector--duration-icon"
                  :class="{ 'c-list-header-tag-sort-order-selector--sort-active': getActiveSortCriterionType === 'duration',
                            'c-list-header-tag-sort-order-selector--sort-invert': isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
      </tr>
      <list-row v-for="element in getCurrentPanelElements.decisiveCriteriaSets"
                :key="element"
                :element="element"
                :class="{'c-listrow--last' : element === (getCurrentPanelElements.decisiveCriteriaSets[getCurrentPanelElements.decisiveCriteriaSets.length-1])}"
                @play="playNow(element)"></list-row>
    </table>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss"></style>
