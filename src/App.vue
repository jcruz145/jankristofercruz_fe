<template>
  <v-app>
    <header-bar></header-bar>
    <router-view />
  </v-app>
</template>

<script>
import HeaderBar from "./components/interface/HeaderBar.vue";
export default {
  name: "App",

  components: { HeaderBar },

  data: () => ({
    //
  }),

  computed: {},
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap')
@import './utility/fancy.sass'

$title-font: 'Staatliches'
</style>
