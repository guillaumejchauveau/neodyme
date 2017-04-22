<template>
  <div class="list" v-ripple>
    <table class="list_table">
      <listElement v-for="element in sortedElements" :element="element"></listElement>
    </table>
  </div>
</template>


<script>
  import listElement from './listElement/listElement.vue'

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
      'elements'],

    computed: {
      sortedElements () {
        return this.elements.sort( (a, b) => {
          return parseFloat(a.trackNumber.value) - parseFloat(b.trackNumber.value)
        })
      }
    }
  }
</script>


<style src="./style.scss"></style>
