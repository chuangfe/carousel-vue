<script>
export default {
  name: "Nav",
  props: ["index", "isActive", "isMenu"],
  data() {
    return {
      // 給 navigator-drag click 紀錄索引使用.
      navIndex: 0,
    };
  },
  computed: {
    getDragLeft() {
      return {
        transform: "translateX(" + this.index * 31 + "px)",
      };
    },
  },
  methods: {
    navigatorMouseenterHandler(i) {
      if (!this.isMenu) return false;

      // 紀錄 navIndex 的索引, 因為 dragClickHandler 吃不到索引的參數.
      this.navIndex = i;
      this.$emit("setIndex", i);
    },
    navigatorClickHandler(i) {
      if (!this.isMenu) return false;

      this.navIndex = i;
      this.$emit("setIndex", i);
      this.$emit("setActive", i);
      this.$emit("setMenu", false);
    },
    dragClickHandler() {
      if (!this.isMenu) return false;

      this.$emit("setIndex", this.navIndex);
      this.$emit("setActive", this.navIndex);
      this.$emit("setMenu", false);
    },
  },
  watch: {
    isMenu() {
      this.navIndex = this.index;
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
