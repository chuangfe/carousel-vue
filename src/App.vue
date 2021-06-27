<template>
  <div id="app">
    <!-- 控制顯示 items nav 的容器. -->
    <div class="carousel-container" :class="{ menu: isMenu }">
      <div class="items-container"></div>
      <Menu />
    </div>
  </div>
</template>

<script>
import Menu from "./components/Menu/index.vue";

export default {
  name: "App",
  data() {
    return { isMenu: true };
  },
  components: { Menu },
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

  &.menu {
    transform: translateY(-50%);
  }
}

.items-container {
  width: 100%;
  height: 50%;
  background-color: #333;
  position: relative;
}
</style>
