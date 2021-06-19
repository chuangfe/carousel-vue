<script>
let items, background;

export default {
  name: "Nav",
  data() {
    return {
      len: 14,
      itemsLeft: 0,
      itemsBottom: 0,
      backgroundLeft: 0,
      backgroundBottom: 0,
    };
  },
  methods: {
    getSrc(num) {
      let index = num < 10 ? "0" + String(num) : String(num);

      // vue 綁定的 src, 需要以 dist 的目錄為基準.
      return "./images/nav/nav-item-" + index + ".png";
    },
    resizeHandler() {
      this.itemsLeft = items.offsetLeft;
      this.itemsBottom =
        window.innerHeight - items.offsetTop - items.offsetHeight;
      /**
       * 600 / 270 = 2 ... 60;
       * itemsLeft 的位置在第 2 個 270px 又加上 60px, 60px -270px, 代表第 3 個
       * 270px 的 left.
       */
      this.backgroundLeft = (this.itemsLeft % 270) - 270;
      this.backgroundBottom = (this.itemsBottom % 270) - 270 - 32;

      console.log(this.itemsLeft, this.itemsLeft % 270);
    },
  },
  mounted() {
    items = this.$el.querySelector(".items");
    background = this.$el.querySelector(".background-image");

    this.resizeHandler();
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
