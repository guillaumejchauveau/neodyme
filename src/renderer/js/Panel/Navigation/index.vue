<template>
  <div class="navigation">
    <div class="navigation_card">
      <ul class="navigation_controls">
        <li class="controls_buttons">
          <ul>
            <li>
              <button class="back"
                      :class="{disabled: thereIsPreviousHistoryEntry}"
                      @click="backPanel()"
                      v-ripple><span></span></button>
            </li>
            <li>
              <button class="forward"
                      :class="{disabled: thereIsNextHistoryEntry}"
                      @click="forwardPanel()"
                      v-ripple><span></span></button>

            </li>
          </ul>
        </li>
        <li class="controls_titles">
          <ul>
            <li v-for="title in getHistoryConfigPanelsTitles"
                :class="{active: activeTitle === title}">
              <span class="title"
                    @click="setSelectedPanel(title)"><span class="text">{{title}}</span><span class="arrow"></span>
              </span>
            </li>
          </ul>
        </li>
        <li class="controls_links">
          <ul>
            <li v-for="panelLink in panelLinks">
              <button :class="[{current: activePanelPreset === panelLink}, panelLink]"
                      @click="setPreset(panelLink)"
                      v-ripple><span></span></button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
