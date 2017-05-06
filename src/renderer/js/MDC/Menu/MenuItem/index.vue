<template>
  <li class="mdc-list-item" role="menuitem" @click="$emit('trigger')">
    <slot></slot>
  </li>
</template>
