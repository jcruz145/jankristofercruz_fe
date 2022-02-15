<template>
  <v-app>
    <header-bar></header-bar>
    <contact-drawer></contact-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderBar from "./components/interface/HeaderBar.vue";
import ContactDrawer from "./components/interface/ContactDrawer.vue";
export default {
  name: "App",

  components: { HeaderBar, ContactDrawer },

  data: () => ({
    //
  }),

  computed: {},
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap')
@import './utility/fancy.sass'

$title-font: 'Staatliches'
</style>
