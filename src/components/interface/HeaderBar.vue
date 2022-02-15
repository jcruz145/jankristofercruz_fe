<template>
  <div class="header-bar">
    <div class="header-bar__title">
      Jan <br />
      Kristofer <br />Cruz
    </div>
    <div class="header-bar__spacer"></div>
    <div class="header-bar__nav">
      <v-btn icon @click.stop="openContactDrawer"
        ><v-icon>mdi-backburger</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script>
import fancy from "../../utility/fancy";
import { mapActions } from "vuex";

export default {
  props: {},

  data: () => ({
    mounted: false,
  }),

  methods: {
    ...mapActions(["openContactDrawer"]),
  },

  mounted() {
    this.mounted = true;
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
  &__title
    font-size: 20px
    font-family: 'Staatliches', sans-serif !important
    line-height: 19px
  &__spacer
    flex-grow: 99
    height: 100%
</style>