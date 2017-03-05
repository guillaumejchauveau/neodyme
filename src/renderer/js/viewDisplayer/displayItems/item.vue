<template>
  <div class="item">
    <div class="item_picture">
      <div class="item_picture_background"></div>
      <img src="../../../static/img/blank_cover.png">
    </div>
    <div class="item_text">
      <p class="item_text_title">Item Name</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'item',
    data: () => {
      return {

      }
    },
  }
</script>

<style>
  @import "loader";


  /* ITEM */

  .item {
    width             : $item-width;
    height            : $item-height;
    margin            : 5px;
    background-color  : $bg-primary;
    box-shadow        : $shadow-depth-1-5;
    cursor            : pointer;
    user-select       : none;
    transition        : box-shadow $item-transition-hover-delay;
  }


  /* ITEM_PICTURE */

  .item_picture {
    position  : relative;
    top       : 0;
    width     : $item-width;
    height    : $item-width;
  }

  .item_picture_background {
    position          : absolute;
    top               : 0;
    width             : $item-width * $item-picture-size;
    height            : $item-width * $item-picture-size;
    margin            : $item-width *.1;
    border-radius     : 50%;
    background-color  : $bg-primary ;
    box-shadow        : $shadow-depth-1;
    transition        : background-color $item-transition-hover-delay;
    transition        : transform $item-transition-hover-delay;
  }

  img {
    position          : absolute;
    top               : 0;
    width             : $item-width * $item-picture-size - $item-picture-border-size * 2;
    height            : $item-width * $item-picture-size - $item-picture-border-size * 2;
    margin            : $item-picture-border-size + $item-width *.1 ;
    border-radius     : 50%;
  }


  /* ITEM_TEXT */

  .item_text {
    width   : $item-width;
    height  : $item-height - $item-width;
    margin  : 0;
  }

  p {
    margin      : 0 $item-width *.1;
    text-align  : center;
    font-weight : $font-weight-light;
  }


  /* ITEM:HOVER */

  .item:hover {
    box-shadow  : $shadow-depth-4;
  }

  .item:hover .item_picture_background {
    background-color  : $color-primary;
    transform         : scale(1.05);

  }

  p:hover {
    text-decoration: underline;
  }

</style>
