<template>
  <div id="app">
    <!-- 控制顯示 items nav 的容器. -->
    <div class="carousel-container" :class="{ menu: isMenu }">
      <div class="items-container" :style="getItemsContainerTransform">
        <Loader :isLoaded="isLoaded" />
        <div class="module">whoweare</div>
        <div class="module">ralphlauren</div>
        <div class="module">bose</div>
        <div class="module">bullittagency</div>
        <div class="module">adisseo</div>
        <div class="module">kindy</div>
        <div class="module">sanofi</div>
        <div class="module">news</div>
        <div class="module">twist</div>
        <div class="module">luminarc</div>
        <div class="module">client</div>
        <div class="module">ownthesky</div>
        <div class="module">citroen</div>
        <div class="module">contact</div>
      </div>
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
      v-show="isLoaded"
    />
  </div>
</template>

<script>
import Menu from "./components/Menu/index.vue";
import Nav from "./components/Nav/index.vue";

import Loader from "./components/Loader/index.vue";
import LoaderHandler from "./components/Loader/LoaderHandler";

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
      isMenu: false,

      // 讀取結束.
      isLoaded: false,
    };
  },
  computed: {
    // items 移動的索引.
    calcIsActive() {
      return this.isActive + 1;
    },
    // .item-container 的 transform 樣式.
    getItemsContainerTransform() {
      // let index = this.isLoaded ? this.calcIsActive : 0;
      // return {
      //   transform: "translateX(" + index * -100 + "vw)",
      // };
    },
  },
  methods: {
    // 給 menu nav 使用的事件.
    setIndexHandler(i) {
      this.index = i;
    },
    // 給 menu nav 使用的事件.
    setActiveHandler(i) {
      this.index = this.isActive = i;
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
  components: { Menu, Nav, Loader },
  mounted() {
    // 假的讀取進度.
    const loaderMask = this.$el.querySelector(".loader .mask");
    const images = Array.from(document.querySelectorAll("img"));
    LoaderHandler.load({
      elements: images,
      callBack: (percentage) => {
        let num = 100 * percentage;
        loaderMask.style.transform = "translateX(" + num + "%)";

        if (num === 100) this.isLoaded = true;
      },
    });
  },
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
  background-color: #000;
  transform: translateY(0%);
  transition: transform 0.4s ease-out;

  &.menu {
    transform: translateY(-50%);
  }
}

.items-container {
  width: 1500vw;
  height: 50%;
  transform: translateX(0vw);
  position: relative;
  display: flex;
  flex-wrap: nowrap;

  .module {
    width: 100vw;
    height: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
}
</style>
