<template>
  <div class="item">
    <div class="item_picture">
      <div class="item_picture_background"></div>
      <img src="../../../static/img/test_cover.png" alt="Item Picture">
    </div>
    <div class="item_text">
      <h1 class="item_text_title">Item Name</h1>
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
  $item-width         : 130px;
  $item-height        : 180px;
  $item-picture-size  : .8;
  $item-picture-border-size : 3px;


  .item {
    background-color: white;
    user-select: none;
    margin      : 5px;
    width       : $item-width;
    height      : $item-height;
    box-shadow  : 0 2px 5px rgba(0, 0, 0, .25);
    transition: box-shadow .3s;
    cursor: pointer;
  }

  .item:hover {
    box-shadow  : 0 2px 15px rgba(0, 0, 0, .5);
  }

  .item:hover .item_picture_background {
    background-color: rgb(255, 193, 21);
    transform: scale(1.05);

  }

  .item_picture {
    position: relative;
    top: 0;
    width: $item-width;
    height: $item-width;
  }

  .item_picture_background {
    position: absolute;
    background-color  : rgb(200,200,200);
    top               : 0;
    margin            : $item-width *.1;
    width             : $item-width * $item-picture-size;
    height            : $item-width * $item-picture-size;
    border-radius     : 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, .5);
    transition: background-color .2s;
    transition: transform .2s;
  }


  img {
    position: absolute;
    border-radius: 50%;
    top               : 0;
    margin            : $item-picture-border-size + $item-width *.1 ;
    width             : $item-width * $item-picture-size - $item-picture-border-size * 2;
    height            : $item-width * $item-picture-size - $item-picture-border-size * 2;
    border-radius     : 50%;

  }

  .item_text {
    margin  : 0;
    width   : $item-width;
    height  : $item-height - $item-width;
  }

  h1 {
    margin: 0;
    top: 2px;
    font-size: 14px;
    text-align: center;
    font-weight: lighter;
  }

  h1:hover {
    text-decoration: underline;
  }


</style>
