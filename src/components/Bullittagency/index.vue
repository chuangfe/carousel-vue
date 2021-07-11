<script>
import debounce from "../../assets/script/debounce";

let mask;

export default {
  name: "Bullittagency",
  props: ["isPlay"],
  data() {
    return {
      // X 軸, 一行有幾個正方形.
      col: 0,
      // Y 軸, 一列有幾個正方形.
      row: 0,
      // 文字的第一個索引.
      startIndex: 0,

      maskWidth: 0,
      maskHeight: 0,
      // 給與 mask 的 on class 開關, 用於控制 square 的 transition opacity 樣式.
      isOn: true,
      // 給與 mask 的 block class 開關, 在 square 全部消失後, 將 mask 隱藏.
      isBlock: true,
    };
  },

  methods: {
    getSquareClass(i) {
      let squareClass;

      switch (i) {
        // 第一行文字.
        // 背景圖片 bullittagency-square-wetryto.
        case this.startIndex:
          squareClass = "square-wetryto";
          break;

        // 第二行文字.
        // 背景圖片 square-m.
        case this.startIndex + this.col + 1:
          squareClass = "square-m";
          break;
        // 背景圖片 square-a.
        case this.startIndex + this.col + 2:
          squareClass = "square-a";
          break;
        // 背景圖片 square-k.
        case this.startIndex + this.col + 3:
          squareClass = "square-k";
          break;
        // 背景圖片 square-e.
        case this.startIndex + this.col + 4:
          squareClass = "square-e";
          break;

        // 第三行文字.
        // 背景圖片 square-t.
        case this.startIndex + this.col * 2 + 1:
          squareClass = "square-t";
          break;
        // 背景圖片 square-h.
        case this.startIndex + this.col * 2 + 2:
          squareClass = "square-h";
          break;
        // 背景圖片 square-e.
        case this.startIndex + this.col * 2 + 3:
          squareClass = "square-e";
          break;
        // 背景圖片 square-line.
        case this.startIndex + this.col * 2 + 4:
          squareClass = "square-line";
          break;
        // 背景圖片 square-w-bold.
        case this.startIndex + this.col * 2 + 5:
          squareClass = "square-w-bold";
          break;
        // 背景圖片 square-e-bold.
        case this.startIndex + this.col * 2 + 6:
          squareClass = "square-e-bold";
          break;
        // 背景圖片 square-b-bold.
        case this.startIndex + this.col * 2 + 7:
          squareClass = "square-b-bold";
          break;

        // 第四行文字.
        // 背景圖片 square-a.
        case this.startIndex + this.col * 3 + 1:
          squareClass = "square-a";
          break;
        // 背景圖片 square-line.
        case this.startIndex + this.col * 3 + 2:
          squareClass = "square-line";
          break;
        // 背景圖片 square-b-bold.
        case this.startIndex + this.col * 3 + 3:
          squareClass = "square-b-bold";
          break;
        // 背景圖片 square-e-bold.
        case this.startIndex + this.col * 3 + 4:
          squareClass = "square-e-bold";
          break;
        // 背景圖片 square-t-bold.
        case this.startIndex + this.col * 3 + 5:
          squareClass = "square-t-bold";
          break;
        // 背景圖片 square-t-bold.
        case this.startIndex + this.col * 3 + 6:
          squareClass = "square-t-bold";
          break;
        // 背景圖片 square-e-bold.
        case this.startIndex + this.col * 3 + 7:
          squareClass = "square-e-bold";
          break;
        // 背景圖片 square-r-bold.
        case this.startIndex + this.col * 3 + 8:
          squareClass = "square-r-bold";
          break;

        // 第五行文字.
        // 背景圖片 square-p.
        case this.startIndex + this.col * 4 + 1:
          squareClass = "square-p";
          break;
        // 背景圖片 square-l.
        case this.startIndex + this.col * 4 + 2:
          squareClass = "square-l";
          break;
        // 背景圖片 square-a.
        case this.startIndex + this.col * 4 + 3:
          squareClass = "square-a";
          break;
        // 背景圖片 square-c.
        case this.startIndex + this.col * 4 + 4:
          squareClass = "square-c";
          break;
        // 背景圖片 square-e.
        case this.startIndex + this.col * 4 + 5:
          squareClass = "square-e";
          break;
      }

      return squareClass;
    },

    createSquare() {
      // 為了打亂排序的陣列.
      const squaresArray = [];
      // 文檔碎片, 保存所有正方形的 dom, 避免畫面繪製太多次.
      const fragment = document.createDocumentFragment();

      // X 軸, 一行有幾個正方形.
      this.col = Math.ceil(window.innerWidth / 100);
      // Y 軸, 一列有幾個正方形.
      this.row = Math.ceil(window.innerHeight / 100);
      // 總共有幾個正方形.
      const calc = this.col * this.row;
      /**
       * Math.floor((row - 5) / 2) * col;
       * 文字需要 5 行正方形, / 2 代表文字上下的邊距空行, * col 代表第一個文字的索引位置.
       *
       * 文字需要 9 列的正方形, / 2 代表文字左右的邊距空行.
       */
      this.startIndex =
        Math.floor((this.row - 5) / 2) * this.col +
        Math.floor((this.col - 9) / 2);

      this.maskWidth = this.col * 100 + "px";
      this.maskHeight = this.row * 100 + "px";

      // 新建 square dom.
      for (let i = 0; i < calc; i++) {
        let square = document.createElement("div");
        square.style.transition =
          "opacity 0.1s ease-out " + ((i + 1) / calc) * 1.9 + "s";
        square.classList.add("square");
        squaresArray.push(square);
      }

      // 打亂 squaresArray 排序.
      squaresArray.sort((a, b) => {
        return Math.random() - 0.5;
      });

      squaresArray.forEach((square, i) => {
        let squareClass = this.getSquareClass(i);
        if (squareClass) square.classList.add(squareClass);
        fragment.appendChild(square);
      });

      mask.appendChild(fragment);
    },

    maskClickHandler() {
      this.isOn = false;
    },

    maskTransitionendHandler() {
      this.isBlock = false;
    },

    launchContainerClickHandler() {
      this.isOn = this.isBlock = true;
    },

    resizeHandler() {
      mask.innerHTML = "";
      this.createSquare();
    },
  },

  watch: {
    isPlay() {
      this.isOn = this.isBlock = true;
    },
  },

  mounted() {
    mask = this.$el.querySelector(".mask");

    window.addEventListener(
      "resize",
      debounce(this.resizeHandler, { wait: 1000 })
    );
    this.resizeHandler();
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
