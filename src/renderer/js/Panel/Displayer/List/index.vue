<template>
  <div class="list">
    <table class="list_table">
      <tr class="list_table_header">
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('trackNumber')">N°</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
                  :class="{sortActive: getActiveSortCriterionType === 'trackNumber', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('title')">NOM</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
                  :class="{sortActive: getActiveSortCriterionType === 'title', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button></td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('album')">ALBUM</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
                  :class="{sortActive: getActiveSortCriterionType === 'album', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('artist')">ARTISTE</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
                  :class="{sortActive: getActiveSortCriterionType === 'artist', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('duration')">
            <span class="durationIcon"></span>
          </span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector durationIcon"
                  :class="{sortActive: getActiveSortCriterionType === 'duration', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
      </tr>
      <list-row v-for="element in getCurrentPanelElements.decisiveCriteriaSets"
                :key="element"
                :element="element"
                :class="{last : element === (getCurrentPanelElements.decisiveCriteriaSets[getCurrentPanelElements.decisiveCriteriaSets.length-1])}"
                @play="play(element)"></list-row>
    </table>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
