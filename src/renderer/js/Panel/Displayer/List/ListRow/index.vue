<template>
    <tr class="list-row"
        :class="{play: currentPlayStatus === 'play',
                pause: currentPlayStatus === 'pause',
                selected: selected}"
        @click="selectListRow()"
        @dblclick="$emit('play')">
      <td class="list-row_value trackNumber" @click="$emit('play')">
        <span class="trackNumber_value">{{element.criteria.trackNumber.value}}</span>
        <span class="playAnim">
          <span class="barA"></span><span class="barB"></span><span class="barC"></span>
        </span>
      </td>
      <td class="list-row_value title selectable">
        <span @click="$emit('play')">{{element.criteria.title.value}}</span>
        <mdc-menu class="list-row_menu">
          <li class="mdc-list-item" role="menuitem" v-ripple @click="play()">Lire</li>
          <li class="mdc-list-item" role="menuitem" v-ripple @click="playAfter()">Lire après le titre en cours</li>
          <li class="mdc-list-item" role="menuitem" v-ripple @click="addToPlaylist()">Ajouter à la liste de lecture</li>
        </mdc-menu>
      </td>
      <td class="list-row_value selectable" >
        <span @click="setPanelFromCriteria('album')">{{element.criteria.album.value}}</span>
      </td>
      <td class="list-row_value selectable" >
        <span @click="setPanelFromCriteria('artist')">{{element.criteria.artist.value}}</span>
      </td>
      <td class="list-row_value ">
        {{formattedTime(element.criteria.duration.value)}}
      </td>
    </tr>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
