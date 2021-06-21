<script>
import debounce from "../../assets/script/debounce";

let items;

export default {
  name: "Nav",
  data() {
    return {
      index: 0,
      len: 14,
      itemsLeft: 0,
      itemsBottom: 0,
      backgroundContainerLeft: 0,
      backgroundContainerBottom: 0,
    };
  },
  methods: {
    // 數值轉字串, 判斷長度補 0 字元或是不補字元.
    getPad(num, len, pad) {
      return String(num).padStart(len, pad);
    },
    getSrc(num) {
      let index = this.getPad(num, 2, "0");
      // vue 綁定的 src, 需要以 dist 的目錄為基準.
      return "./images/nav/nav-item-" + index + ".png";
    },
    resizeHandler() {
      this.itemsLeft = items.offsetLeft;
      this.itemsBottom =
        window.innerHeight - items.offsetTop - items.offsetHeight;
      /**
       * background-dashed 是已 270px * 270px 對齊 left bottom repeat.
       *
       * 600 / 270 = 2 ... 60;
       * itemsLeft 的位置在第 2 個 dashed 的 left 又加上 60px, 60px - 270px, 代表第 3 個 dashed 的 left.
       *
       * itemsBottom = window.innerHeight(可視區高度) - items.offsetTop(items 的top) - items.offsetHeight(items 的 height);
       * 32 是 dashed 270px - item 238px 得到的值.
       */
      this.backgroundContainerLeft = (this.itemsLeft % 270) - 270;
      this.backgroundContainerBottom = (this.itemsBottom % 270) - 270 - 32;
    },
  },
  mounted() {
    items = this.$el.querySelector(".items");

    this.resizeHandler();
    window.addEventListener(
      "resize",
      debounce(this.resizeHandler, { wait: 1000 })
    );
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
