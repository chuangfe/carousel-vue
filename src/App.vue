<template>
  <div id="app">
    <!-- 控制顯示 items nav 的容器. -->
    <div class="carousel-container isNav">
      <div class="items-container"></div>
      <Nav />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav/index.vue";

export default {
  name: "App",
  components: { Nav },
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

// 控制顯示 items nav 的容器.
.carousel-container {
  width: 100%;
  height: 200%;
  transform: translateY(0%);

  &.isNav {
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
