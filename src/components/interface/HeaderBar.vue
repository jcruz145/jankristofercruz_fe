<template>
  <div class="header-bar">
    <div class="header-bar__title">
      Jan <br />
      Kristofer <br />Cruz
    </div>
  </div>
</template>

<script>
import fancy from "../../utility/fancy";

export default {
  props: {},

  data: () => ({
    mounted: false,
  }),

  mounted() {
    this.mounted = true;

    // fancy.flowInText(this.$el.querySelector(".header-bar__title"));
    // console.log(this.$el.querySelector(".header-bar__title"));
  },
};
</script>

<style lang="sass" scoped>
.header-bar
  display: flex
  width: 100%
  align-items: center
  justify-content: left
  padding: 1rem
  // position: sticky
  // position: -webkit-sticky
  // top: 0
  // left: 0
  z-index: 10
  &__title
    font-size: 20px
    font-family: 'Staatliches', sans-serif !important
    line-height: 19px
</style>