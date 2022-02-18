<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

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
