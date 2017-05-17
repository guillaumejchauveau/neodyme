<template>
  <td class="c-listheadertag" @click="activateSort(tagValue)">
    <span class="c-listheadertag-sort-type-selector"
          :class="`c-listheadertag-sort-type-selector--${tagValue}`"
          title="Trier par">{{tagTitle}}</span>
    <button class="c-listheadertag-sort-order-selector"
            :class="[`c-listheadertag-sort-order-selector--${tagValue}`,
            {'c-listheadertag-sort-order-selector--sort-active': getActiveSortCriterionType === tagValue,
            'c-listheadertag-sort-order-selector--sort-invert': isRevertSort}]"
            title="Inverser le tri">
      <span></span>
    </button>
  </td>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
