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
<<<<<<< HEAD
              <button class="forward"
=======
              <button class="foward"
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
                      :class="{disabled: thereIsNextHistoryEntry}"
                      @click="forwardPanel()"
                      v-ripple><span></span></button>

            </li>
<<<<<<< HEAD
=======
            <li v-for="panelLink in panelLinks">
              <button :class="[{current: activePanelPreset === panelLink}, panelLink]"
                      @click="setPreset(panelLink)"
                      v-ripple><span></span></button>
            </li>
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
          </ul>
        </li>
        <li class="controls_titles">
          <ul>
<<<<<<< HEAD
            <li v-for="title in getHistoryConfigPanelsTitles"
=======
            <li v-for="title in navigationHistoryTitles"
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
                :class="{active: activeTitle === title}">
              <span class="title"
                    @click="setSelectedPanel(title)"><span class="text">{{title}}</span><span class="arrow"></span>
              </span>
            </li>
          </ul>
        </li>
<<<<<<< HEAD
        <li class="controls_links">
          <ul>
            <li v-for="panelLink in panelLinks">
              <button :class="[{current: activePanelPreset === panelLink}, panelLink]"
                      @click="setPreset(panelLink)"
                      v-ripple><span></span></button>
            </li>
          </ul>
        </li>
=======
>>>>>>> 5cbd9f646c37bfa0ea3d1a4b2468638d7951c127
      </ul>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped></style>
