<script>
export default {
  name: "Adisseo",

  props: ["isPlay"],

  data() {
    return {
      isTop: false,
    };
  },

  watch: {
    isPlay() {
      this.isTop = false;
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
