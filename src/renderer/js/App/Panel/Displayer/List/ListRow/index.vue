<template>
  <tr class="c-listrow"
      :class="{'c-listrow--play': currentPlayStatus === 'play',
                'c-listrow--pause': currentPlayStatus === 'pause',
                'c-listrow--selected': selected}"
      @click="selectListRow()"
      @dblclick="$emit('play')">
    <td class="c-listrow__value c-listrow__value--tracknumber">
      <span class="c-listrow-value-text c-listrow-value-text--tracknumber">{{element.criteria.trackNumber.value}}</span>
      <span class="c-listrow-value__playbutton" @click.prevent.stop="$emit('play')"></span>
      <div class="c-listrow-value__play-anim">
        <span class="c-listrow-value__play-anim-bar"></span>
      </div>
    </td>
    <td class="c-listrow__value">
      <span class="c-listrow-value-text c-listrow-value-text--title c-listrow-value-text--clickable"
            @click.prevent.stop="$emit('play')">
        {{element.criteria.title.value}}
      </span>
      <mdc-menu class="c-listrow-value__menu">
        <mdc-menu-item @trigger="$emit('play')">Lire maintenant</mdc-menu-item>
        <mdc-menu-item @trigger="playAfter()">Lire après le titre en cours</mdc-menu-item>
        <mdc-menu-item @trigger="addToPlaylist()">Ajouter à la liste de lecture</mdc-menu-item>
      </mdc-menu>
    </td>
    <td class="c-listrow__value">
      <span class="c-listrow-value-text c-listrow-value-text--clickable"
            @click="setPanelFromCriteria('album')">{{element.criteria.album.value}}</span>
    </td>
    <td class="c-listrow__value">
      <span class="c-listrow-value-text c-listrow-value-text--clickable"
            @click="setPanelFromCriteria('artist')">{{element.criteria.artist.value}}</span>
    </td>
    <td class="c-listrow__value">
      <span class="c-listrow-value-text">{{formattedTime(element.criteria.duration.value)}}</span>
    </td>
  </tr>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
