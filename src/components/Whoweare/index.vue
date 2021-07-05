<script>
export default {
  name: "Whoweare",
  props: ["isPlay"],
  data() {
    return {
      isActive: -1,
    };
  },
  methods: {
    introduceContainerClickHandler(num) {
      this.isActive = this.isActive === num ? -1 : num;
    },
    introduceContainerMouseleaveHandler() {
      this.isActive = -1;
    },
  },
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
