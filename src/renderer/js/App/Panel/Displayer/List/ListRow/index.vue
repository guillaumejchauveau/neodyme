<template>
    <tr class="c-listrow"
        :class="{'c-listrow--play': currentPlayStatus === 'play',
                'c-listrow--pause': currentPlayStatus === 'pause',
                'c-listrow--selected': selected}"
        @click="selectListRow()"
        @dblclick="$emit('play')">
      <td class="c-listrow__value c-listrow__value--tracknumber" @click="$emit('play')">
        <span class="c-listrow-value-text c-listrow-value-text--tracknumber">{{element.criteria.trackNumber.value}}</span>
        <span class="c-listrow-value__playbutton"></span>
        <div class="c-listrow-value__play-anim">
          <span class="c-listrow-value__play-anim-bar"></span>
        </div>
      </td>
      <td class="c-listrow__value">
        <span class="c-listrow-value-text" @click="$emit('play')">{{element.criteria.title.value}}</span>
        <mdc-menu class="c-listrow-value__menu">
          <li class="mdc-list-item" role="menuitem" v-ripple @click="play()">Lire</li>
          <li class="mdc-list-item" role="menuitem" v-ripple @click="playAfter()">Lire après le titre en cours</li>
          <li class="mdc-list-item" role="menuitem" v-ripple @click="addToPlaylist()">Ajouter à la liste de lecture</li>
        </mdc-menu>
      </td>
      <td class="c-listrow__value" >
        <span class="c-listrow-value-text" @click="setPanelFromCriteria('album')">{{element.criteria.album.value}}</span>
      </td>
      <td class="c-listrow__value" >
        <span class="c-listrow-value-text" @click="setPanelFromCriteria('artist')">{{element.criteria.artist.value}}</span>
      </td>
      <td class="c-listrow__value">
        <span class="c-listrow-value-text">{{formattedTime(element.criteria.duration.value)}}</span>
      </td>
    </tr>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
