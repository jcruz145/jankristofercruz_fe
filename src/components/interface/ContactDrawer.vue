<template>
  <v-navigation-drawer v-model="drawer" absolute right temporary>
    <v-container>
      <v-btn icon class="mb-1" @click.stop="closeContactDrawer"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-btn href="https://www.instagram.com/jankristofercruz/" target="_blank"
        ><v-icon left>mdi-instagram</v-icon>@jankristofercruz</v-btn
      >
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["contactDrawerState"]),
    drawer: {
      set(value) {
        if (value) {
          this.openContactDrawer();
        } else {
          this.closeContactDrawer();
        }
      },
      get() {
        return this.contactDrawerState;
      },
    },
  },
  methods: {
    ...mapActions(["closeContactDrawer", "openContactDrawer"]),
  },
};
</script>

<style lang="sass" scoped>
</style>