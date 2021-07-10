<template>
  <div id="app">
    <!-- 控制顯示 items nav 的容器. -->
    <div
      class="carousel-container"
      :class="{ menu: isMenu }"
      @transitionend="carouselContainerTransitionend($event)"
    >
      <div
        class="items-container"
        :class="{ transition: isTransition }"
        :style="{ left: itemsContainerLeft }"
        @mousedown="itemsContainerMousedown($event)"
        @transitionend="itemsContainerTransitionend($event)"
      >
        <Loader :isLoaded="isLoaded" :isPlay="isPlay === 0" />
        <Whoweare :isPlay="isPlay === 1" />
        <Ralphlauren :isPlay="isPlay === 2" />
        <Bose :isPlay="isPlay === 3" />
        <Bullittagency :isPlay="isPlay === 4" />
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
      v-show="isPlay > 0"
    />
  </div>
</template>

<script>
import Menu from "./components/Menu/index.vue";
import Nav from "./components/Nav/index.vue";

import Loader from "./components/Loader/index.vue";
import LoaderHandler from "./components/Loader/LoaderHandler";
import Whoweare from "./components/Whoweare/index.vue";
import Ralphlauren from "./components/Ralphlauren/index.vue";
import Bose from "./components/Bose/index.vue";
import Bullittagency from "./components/Bullittagency/index.vue";

let carouselContainer, itemsContainer;

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
      // 離開 loader 頁面.
      isLoaderLeave: false,

      // items-container 滑鼠左鍵按下時的 x 座標.
      itemsContainerMousedownX: 0,
      // items-container 滑移動的距離.
      itemsContainerMousemoveX: 0,
      // items-container 當前的 offsetLeft.
      itemsContainerOffsetLeft: 0,
      // items-container 需要移動到的 left.
      itemsContainerLeft: 0,
      // items-container 是否有 transition 動畫.
      isTransition: false,
    };
  },
  computed: {
    // 給 items 使用的索引.
    calcActive() {
      return this.isActive + 1;
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
      this.setItemsContainerLeft();
    },
    // 只有在 transitionend 事件才會執行.
    setPlayHandler() {
      // items 的 length 比 navigator 多一個, 所以需要修改.
      this.isPlay = this.calcActive;
    },
    // 給 menu nav 使用的事件.
    setMenuHandler(b) {
      this.isMenu = b;
    },
    // 設置 itemsContainerLeft, 若使用 computed 可能會因為要素過多導致 bug.
    setItemsContainerLeft() {
      // 若未離開 loader 則返回 0.
      let active = this.isLoaderLeave ? this.calcActive : 0;

      this.itemsContainerLeft =
        // 等於 0, 代表無拖曳, 拖曳事件結束, 不是通過拖曳移動 item-container.
        this.itemsContainerMousemoveX === 0
          ? active * -100 + "%"
          : this.itemsContainerOffsetLeft +
            this.itemsContainerMousemoveX +
            "px";
    },
    // item-container 滑鼠左鍵按下事件.
    itemsContainerMousedown(e) {
      // 紀錄滑鼠按下的 X 座標.
      this.itemsContainerMousedownX = e.clientX;
      // 紀錄 item-container 當前的 offsetLeft.
      this.itemsContainerOffsetLeft = itemsContainer.offsetLeft;

      // 綁定拖曳事件.
      window.addEventListener("mousemove", this.windowMousemove);
      window.addEventListener("mouseup", this.windowMouseup);
    },
    // 拖曳事件.
    windowMousemove(e) {
      // 紀錄滑鼠按下左鍵後移動的距離.
      this.itemsContainerMousemoveX = e.clientX - this.itemsContainerMousedownX;
      // 停止 item-container 的 transition 樣式.
      this.isTransition = false;
      // 移動 item-container.
      this.setItemsContainerLeft();
    },
    // 拖曳事件.
    windowMouseup() {
      // 刪除拖曳事件.
      window.removeEventListener("mousemove", this.windowMousemove);
      window.removeEventListener("mouseup", this.windowMouseup);

      // 滑鼠向左拖曳.
      if (this.itemsContainerMousemoveX < -200) {
        // 已離開 loader 頁面.
        if (this.isLoaderLeave) this.isActive++;
        this.isLoaderLeave = true;
      }
      // 滑鼠向右拖曳.
      else if (this.itemsContainerMousemoveX > 200) {
        // 已離開 loader 頁面.
        if (this.isLoaderLeave) this.isActive--;
      }
      // 限制 this.isActive 的上下限.
      this.isActive =
        this.isActive < 0 ? 0 : this.isActive > 13 ? 13 : this.isActive;

      // 讓 menu nav 依照 index 調整 dom style.
      this.index = this.isActive;
      // 刪除拖曳相關資料.
      this.itemsContainerMousedownX = this.itemsContainerMousemoveX = this.itemsContainerOffsetLeft = 0;
      // item-container 加上動畫樣式.
      this.isTransition = true;
      // 設置 item-container left 樣式.
      this.setItemsContainerLeft();
    },
    // item-container 移動完後執行.
    itemsContainerTransitionend(e) {
      if (
        // 事件函式非目標觸發, 禁止執行函式.
        e.target !== itemsContainer ||
        // 未離開 loader 頁面, 禁止執行函式.
        !this.isLoaderLeave
      )
        return false;

      // 移除動畫.
      this.isTransition = false;

      // 有確實切換畫面.
      if (this.isPlay !== this.calcActive)
        // 切換 item 的動畫.
        this.setPlayHandler();
    },
    // carousel-container transitionend 事件, 就是畫面上下切換.
    carouselContainerTransitionend(e) {
      if (
        // 事件函式非目標觸發, 禁止執行函式.
        e.target !== carouselContainer ||
        // 畫面在 menu, 禁止執行函式.
        this.isMenu ||
        // 執行動畫後未切換頁面, 禁止執行函式.
        this.isPlay === this.calcActive
      )
        return false;

      this.setPlayHandler();
    },
  },
  components: { Menu, Nav, Loader, Whoweare, Ralphlauren, Bose, Bullittagency },
  mounted() {
    // 儲存 dom 變數, 使用在 transitionend 事件的判斷目標.
    carouselContainer = this.$el.querySelector(".carousel-container");
    itemsContainer = this.$el.querySelector(".items-container");

    // 假的讀取進度.
    const loaderMask = this.$el.querySelector(".loader .mask");
    const images = Array.from(this.$el.querySelectorAll("img"));

    // chrome 防止圖片拖放.
    images.forEach((img) => {
      img.draggable = false;
    });

    LoaderHandler.load({
      elements: images,
      callBack: (percentage) => {
        let num = 100 * percentage;
        loaderMask.style.transform = "translateX(" + num + "%)";

        // 讀取完成.
        if (num >= 100) this.isLoaded = true;
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
  width: 1500%;
  height: 50%;
  position: relative;
  display: flex;
  flex-wrap: nowrap;

  &.transition {
    transition: left 0.4s ease-in;
  }

  .module {
    width: calc(100% / 15);
    height: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
}
</style>
