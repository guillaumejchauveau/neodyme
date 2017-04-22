<template>
  <div class="ELE">
    <tr class="listElement">
      <td class="listElement_value listElement_trackNumber">{{element.trackNumber.value}}</td>
      <td class="listElement_value listElement_metadata">{{element.title}}</td>
      <td class="listElement_value listElement_metadata">{{element.album}}</td>
      <td class="listElement_value listElement_metadata">{{element.artist}}</td>
      <td class="listElement_value listElement_metadata">{{element.duration}}</td>
    </tr>
  </div>

</template>


<script>
  export default {
    name: 'listElement',
    data: () => {
      return {

      }
    },
    props: [
      'element']
  }
</script>


<style src="./style.scss"></style>
