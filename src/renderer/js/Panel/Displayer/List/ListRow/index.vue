<template>
  <div class="list-row">
    <tr class="list-row">
      <td class="list-row_value list-row_trackNumber">{{criteria.criteria.trackNumber.value}}</td>
      <td class="list-row_value list-row_metadata">{{criteria.criteria.title.value}}</td>
      <td class="list-row_value list-row_metadata">{{criteria.criteria.album.value}}</td>
      <td class="list-row_value list-row_metadata">{{criteria.criteria.artist.value}}</td>
      <td class="list-row_value list-row_metadata">{{criteria.criteria.duration.value}}</td>
    </tr>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss"></style>
