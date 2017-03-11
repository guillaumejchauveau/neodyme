<template>
  <tr class="listElement">
    <td class="listElement_trackNumber">{{element.trackNumber}}</td>
    <td class="listElement_metadata">{{element.title}}</td>
    <td class="listElement_metadata">{{element.album}}</td>
    <td class="listElement_metadata">{{element.artist}}</td>
    <td class="listElement_metadata">{{element.duration}}</td>
  </tr>
</template>

<script>
  export default {
    name: 'listElement',
    data: () => {
      return {

      }
    },
    props: [
      'element'
    ]
  }
</script>

<style>
  @import "loader";
  .listElement {
    margin: 0;
    height: 40px;
    border-top-style: solid;
    border-bottom-style: solid;
    border-collapse: collapse;
    border-color: black;
  }
</style>
