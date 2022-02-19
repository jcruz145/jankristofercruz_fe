<template>
  <div
    class="header-bar"
    :class="$vuetify.breakpoint.xsOnly ? 'horizontal' : ''"
  >
    <div class="header-bar__title" @click.stop="handleHomeClick">
      Jan <br />
      Kristofer <br />Cruz
    </div>
  </div>
</template>

<script>
import fancy from "../../utility/fancy";
import { mapActions } from "vuex";

export default {
  props: ["dark"],

  data: () => ({
    mounted: false,
  }),

  methods: {
    ...mapActions(["openContactDrawer"]),
    handleHomeClick(e) {
      this.$router.push("/");
    },
  },

  mounted() {
    this.mounted = true;
  },
};
</script>

<style lang="sass" scoped>
.header-bar
  position: absolute
  left: 0
  top: 0
  z-index: 1000
  display: flex
  align-items: top
  justify-content: left
  padding: 1rem
  background: black
  color: white
  height: 100vh
  border-right: 1px solid white
  &__title
    font-size: 20px
    font-family: 'Staatliches', sans-serif !important
    line-height: 19px
  &__spacer
    flex-grow: 99
    height: 100%
  &.horizontal
    height: auto
    width: 100vw
    border-right: 0
    border-bottom: 1px solid white
</style>