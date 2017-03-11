<template>
  <div class="list">
    <table class="list_table">
      <listElement v-for="element in elements" :element="element"></listElement>
    </table>
  </div>
</template>

<script>
  import listElement from './listElement.vue'
  export default {
    name: 'list',
    data: () => {
      return {

      }
    },
    components: {
      listElement,
    },
    props: [
      'elements'
    ]
  }
</script>

<style>
  @import "loader";

  .list {
    position: relative;
    background-color: $bg-primary;
    width: 70%;
    margin: 0 15%;
    padding: 40px;
    top: 10px;
    border-radius: 2px;
    @include mdc-elevation(2);
    @include mdc-elevation-transition;
  }

  .list_table {

  }
</style>
