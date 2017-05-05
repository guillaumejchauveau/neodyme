<template>
  <div class="list">
    <table class="list_table">
      <tr class="list_table_header">
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('trackNumber')">N°</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
<<<<<<< HEAD
                  :class="{sortActive: getActiveSortCriterionType === 'trackNumber', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
=======
                  :class="[{sortDefault: sortCriteriaTypes.trackNumber === 'default'}, {sortInvert: sortCriteriaTypes.trackNumber === 'invert'}]"
                  @click="revertSort('trackNumber')"><span></span></button>
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
        </td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('title')">NOM</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
<<<<<<< HEAD
                  :class="{sortActive: getActiveSortCriterionType === 'title', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button></td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('album')">ALBUM</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
                  :class="{sortActive: getActiveSortCriterionType === 'album', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
=======
                  :class="[{sortDefault: sortCriteriaTypes.title === 'default'}, {sortInvert: sortCriteriaTypes.title === 'invert'}]"
                  @click="revertSort('title')"><span></span></button></td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('album')">ALBUM</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
                  :class="[{sortDefault: sortCriteriaTypes.album === 'default'}, {sortInvert: sortCriteriaTypes.album === 'invert'}]"
                  @click="revertSort('album')"><span></span></button>
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
        </td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('artist')">ARTISTE</span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector"
<<<<<<< HEAD
                  :class="{sortActive: getActiveSortCriterionType === 'artist', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
=======
                  :class="[{sortDefault: sortCriteriaTypes.artist === 'default'}, {sortInvert: sortCriteriaTypes.artist === 'invert'}]"
                  @click="revertSort('artist')"><span></span></button>
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
        </td>
        <td class="list_table_header_tag">
          <span class="list_table_header_sortCriteriaTypeSelector" @click="activateSort('duration')">
            <span class="durationIcon"></span>
          </span>
          <button class="list_table_header_tag_sortCriteriaTypeOrderSelector durationIcon"
<<<<<<< HEAD
                  :class="{sortActive: getActiveSortCriterionType === 'duration', sortInvert : isRevertSort}"
                  @click="toggleRevertSort()"><span></span></button>
        </td>
      </tr>
      <list-row v-for="element in getCurrentPanelElements.decisiveCriteriaSets"
                :key="element"
                :element="element"
                :class="{last : element === (getCurrentPanelElements.decisiveCriteriaSets[getCurrentPanelElements.decisiveCriteriaSets.length-1])}"
=======
                  :class="[{sortDefault: sortCriteriaTypes.duration === 'default'}, {sortInvert: sortCriteriaTypes.duration === 'invert'}]"
                  @click="revertSort('duration')"><span></span></button>
        </td>
      </tr>
      <list-row v-for="element in sortedElements"
                :key="element"
                :element="element"
                :class="{last : element === (sortedElements[sortedElements.length-1])}"
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
                @play="play(element)"></list-row>
    </table>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
