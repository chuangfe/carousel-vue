<script>
export default {
  name: "Nav",
  props: ["index", "isActive", "isMenu"],
  data() {
    return {
      /**
       * 避免 navigatorMouseenterHandler 函式未執行, 就執行 navigatorClickHandler 函式, 導致索引有問題.
       */
      navIndex: 0,
    };
  },
  computed: {
    // 白色長方形的移動座標.
    getDragLeft() {
      return {
        transform: "translateX(" + this.index * 31 + "px)",
      };
    },
  },
  methods: {
    // navigator 滑鼠移入事件.
    navigatorMouseenterHandler(i) {
      if (!this.isMenu) return false;

      // 紀錄 navIndex 的索引, 因為 dragClickHandler 吃不到索引的參數.
      this.navIndex = i;
      this.$emit("setIndex", i);
    },
    // navigator 滑鼠點擊事件.
    navigatorClickHandler(i) {
      if (!this.isMenu) return false;

      this.navIndex = i;
      this.$emit("setIndex", i);
      this.$emit("setActive", i);
      this.$emit("setMenu", false);
    },
    // 白色長方形點擊事件.
    dragClickHandler() {
      if (!this.isMenu) return false;

      this.$emit("setIndex", this.navIndex);
      this.$emit("setActive", this.navIndex);
      this.$emit("setMenu", false);
    },
  },
  watch: {
    // 每當 isMenu 改變時, 調整 navIndex.
    isMenu() {
      this.navIndex = this.index;
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
