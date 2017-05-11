<template>
  <div class="c-navigation">
    <ul class="c-navigation__content">
      <li class="c-navigation-buttons">
        <ul>
          <li>
            <button class="c-navigation-button c-navigation-button--back"
                    :class="{'c-navigation-button--disabled': !thereIsPreviousHistoryEntry}"
                    @click="backPanel()"
                    v-ripple>
              <span></span>
            </button>
          </li>
          <li>
            <button class="c-navigation-button c-navigation-button--forward"
                    :class="{'c-navigation-button--disabled': !thereIsNextHistoryEntry}"
                    @click="forwardPanel()"
                    v-ripple>
              <span></span>
            </button>

          </li>
        </ul>
      </li>
      <li class="c-navigation-titles">
        <ul>
          <li v-for="title in getHistoryConfigPanelsTitles"
              class="c-navigation-title"
              :class="{'c-navigation-title--active': getCurrentPanelConfig.title === title}">
            <span class="c-navigation-title__content"
                  @click="setSelectedPanel(title)">
              <span class="c-navigation-title__text">{{title}}</span>
              <span class="c-navigation-title__arrow"></span>
            </span>
          </li>
        </ul>
      </li>
      <li class="c-navigation-links">
        <ul>
          <li v-for="panelLink in panelLinks"
              class="c-navigation-link"
              :class="[{'c-navigation-link--current': activePanelPreset === panelLink},
              `c-navigation-link--${toSnakeCase(panelLink)}`]">
            <button @click="setPreset(panelLink)" v-ripple><span></span></button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss"></style>
