<template>
  <div class="list">
    <table class="list_table">
      <list-row v-for="element in sortedElements" :key="element" :criteria="element"></list-row>
    </table>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss"></style>
