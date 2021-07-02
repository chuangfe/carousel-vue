<template>
  <div id="app">
    <!-- 控制顯示 items nav 的容器. -->
    <div class="carousel-container" :class="{ menu: isMenu }">
      <div class="items-container"></div>
      <Menu
        :index="index"
        :isActive="isActive"
        :isMenu="isMenu"
        @setIndex="setIndexHandler"
        @setActive="setActiveHandler"
        @setMenu="setMenuHandler"
      />
    </div>
    <Nav
      :index="index"
      :isActive="isActive"
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
      // menu nav 使用的索引.
      index: 0,
      // nav navigator 的 active.
      isActive: 0,

      // 當前播放的 item.
      isPlay: 0,

      // 當前畫面的位置.
      isMenu: true,
    };
  },
  computed: {
    // items 移動的索引.
    calcIndex() {
      return this.index + 1;
    },
  },
  methods: {
    // 給 menu nav 使用的事件.
    setIndexHandler(i) {
      this.index = i;
    },
    // 給 menu nav 使用的事件.
    setActiveHandler(i) {
      this.isActive = i;
    },
    // 只有在 transitionend 事件才會執行.
    setPlayHandler() {
      // 畫面在 menu 時阻擋事件.
      if (!this.isMenu) return false;

      // items 的 length 比 navigator 多一個, 所以需要修改.
      this.isPlay = this.isActive + 1;
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
  background-color: #000;
  position: relative;
}
</style>
