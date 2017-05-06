<template>
  <li>
    <button class="c-tracks-list-item-action"
            :class="[`c-tracks-list-item-action--${name}`,
            {'c-tracks-list-item-action--disabled': playerIs('LOADING')}]"
            :title="readableName"
            @click="$emit('trigger', name)">
      <span></span>
    </button>
  </li>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
