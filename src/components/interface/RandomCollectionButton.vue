<template>
  <v-btn elevation="0" :disabled="!initialized" @click="handleClick">
    <slot>View Random Collection</slot>
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    initialized: false,
  }),

  computed: {
    ...mapGetters(["availableCollections", "currentCollection"]),
  },

  methods: {
    ...mapActions(["retrieveAvailableCollections"]),
    async initializeData() {
      if (this.availableCollections.length <= 0) {
        await this.retrieveAvailableCollections(this.$prismic);
      }
      this.initialized = true;
    },
    handleClick() {
      let arr = this.availableCollections;
      arr = arr.filter((item) => {
        return !(this.currentCollection == item);
      });

      let i = Math.floor(Math.random() * arr.length);

      this.$router.push(`/collections/${arr[i]}`);
    },
  },

  created() {
    this.initializeData();
  },
};
</script>