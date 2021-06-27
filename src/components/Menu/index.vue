<script>
import debounce from "../../assets/script/debounce";

let items;

export default {
  name: "Menu",
  data() {
    return {
      index: 0,
      len: 14,
      itemsLeft: 0,
      itemsBottom: 0,
      contents: [
        {
          title: "WHO WE ARE",
          text: "Telling fascinating stories",
        },
        {
          title: "RALPH LAUREN",
          text: "Forget me not",
        },
        {
          title: "BOSE",
          text: "Treating the sound as a part of the picture",
        },
        {
          title: "INTERACTIVE DESIGNS",
          text: "We try to make the web a better world",
        },
        {
          title: "ADISSEO",
          text: "Attracting investors for a leading animal nutrition firm",
        },
        {
          title: "KINDY",
          text: "The fantastic adventures george the Sock",
        },
        {
          title: "SANOFI",
          text: "Capturing the richness of a major event",
        },
        {
          title: "WHAT'S HOT",
          text: "Our latest news",
        },
        {
          title: "TWIST",
          text: "The smallest glucose device",
        },
        {
          title: "CRISTAL D'ARQUES",
          text: "City of Light",
        },
        {
          title: "OUR CLIENTS",
          text: "It's about making a lasting impression",
        },
        {
          title: "WE OWN THE SKY",
          text: "Shape the mystery and romance of a brand",
        },
        {
          title: "CITROEN",
          text: "If you can imagine it you can build it",
        },
        {
          title: "CONTACT",
          text: "Say hello to Blacknegative!",
        },
      ],
    };
  },
  computed: {
    getBackgroundTransform() {
      let left = this.index * 133 * -1;
      let top = this.index * 136;
      return "translate(" + left + "px, " + top + "px)";
    },
    getDashedPosition() {
      /**
       * background-dashed 是已 270px * 270px 對齊 left bottom repeat.
       *
       * 600 / 270 = 2 ... 60;
       * itemsLeft 的位置在第 2 個 dashed 的 left 又加上 60px, 60px - 270px, 代表第 3 個 dashed 的 left.
       *
       * itemsBottom = window.innerHeight(可視區高度) - items.offsetTop(items 的top) - items.offsetHeight(items 的 height);
       * 32 是 dashed 270px - item 238px 得到的值.
       */
      let left = (this.itemsLeft % 270) - 270;
      let bottom = (this.itemsBottom % 270) - 270 - 32;

      return {
        left: left + "px",
        bottom: bottom + "px",
      };
    },
    getContentTransform() {
      let x = this.index * 30 * -1 + "rem";
      return {
        transform: "translateX(" + x + ")",
      };
    },
  },
  methods: {
    /**
     * 數值轉字串, 判斷長度補 0 字元或是不補字元.
     * num 數值.
     * len 希望的字串長度.
     * pad 補足長度的字元.
     */
    getPad(num, len, pad) {
      return String(num).padStart(len, pad);
    },
    getSrc(num) {
      const i = this.getPad(num, 2, "0");
      // vue 綁定的 src, 需要以 dist 的目錄為基準.
      return "./images/nav/nav-item-" + i + ".png";
    },
    titleClickHandler(num) {
      this.index = num;
    },
    resizeHandler() {
      // 獲取 items 的 offsetLeft offsetBottom.
      this.itemsLeft = items.offsetLeft;
      this.itemsBottom =
        window.innerHeight - items.offsetTop - items.offsetHeight;
    },
  },
  mounted() {
    items = this.$el.querySelector(".items");

    this.resizeHandler();
    window.addEventListener(
      "resize",
      debounce(this.resizeHandler, {
        // resize 事件 1 秒後執行事件函式.
        wait: 1000,
      })
    );
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
