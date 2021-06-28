<template>
  <div id="app">
    <!-- 控制顯示 items nav 的容器. -->
    <div class="carousel-container" :class="{ menu: isMenu }">
      <div class="items-container"></div>
      <Menu
        :index="calcIndex"
        :isActive="calcActive"
        :isMenu="isMenu"
        @setIndex="setIndexHandler"
        @setActive="setActiveHandler"
        @setMenu="setMenuHandler"
      />
    </div>
    <Nav
      :index="calcIndex"
      :isActive="calcActive"
      :isMenu="isMenu"
      @setIndex="setIndexHandler"
      @setActive="setActiveHandler"
      @setMenu="setMenuHandler"
    />
  </div>
</template>

<script>
import Menu from "./components/Menu/index.vue";
import Nav from "./components/Nav/index.vue";

export default {
  name: "App",
  data() {
    return {
      // 這是給 Menu Nav 使用的.
      index: 0,
      // 當前播放的 component.
      isActive: 0,
      // 當前畫面的位置.
      isMenu: true,
    };
  },
  computed: {
    calcIndex() {
      return this.index < 2 ? 0 : this.index - 1;
    },
    calcActive() {
      return this.isActive < 2 ? 0 : this.isActive - 1;
    },
  },
  methods: {
    /**
     * 給 menu nav 使用的事件, i 是來自 menu nav 的索引, 而 items 的 0 是 load component, menu nav 的 0 是 items 的 1 component, 故從 component 取值的時候需要 + 1, 才不會有誤差.
     */
    setIndexHandler(i) {
      this.index = i + 1;
    },
    // 給 menu nav 使用的事件.
    setActiveHandler(i) {
      this.isActive = i + 1;
    },
    // 給 menu nav 使用的事件.
    setMenuHandler(b) {
      this.isMenu = b;
    },
  },
  components: { Menu, Nav },
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}

html {
  min-width: 800px;
  min-height: 600px;
  font-size: 16px;
  line-height: 1.5rem;
  overflow: hidden;
}

#app {
  position: relative;
  left: 0px;
  top: 0px;
}

// 控制顯示 items menu 的容器.
.carousel-container {
  width: 100%;
  height: 200%;
  transform: translateY(0%);
  transition: transform 0.4s ease-out;

  &.menu {
    transform: translateY(-50%);
  }
}

.items-container {
  width: 100%;
  height: 50%;
  background-color: red;
  position: relative;
}
</style>
