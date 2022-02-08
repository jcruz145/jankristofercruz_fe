<template>
  <v-app>
    <v-app-bar app color="transparent" elevation="0">
      <v-toolbar-title>Jan Kristofer Cruz</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap')

$title-font: 'Roboto Condensed'

.v-application
  .v-toolbar__title // To pin point specific classes of some components
    font-family: $title-font, sans-serif !important
</style>
