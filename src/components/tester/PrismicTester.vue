<template>
  <v-container>
    <h2>Response</h2>
    <pre v-html="JSON.stringify(response, null, 2)"></pre>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    response: null,
  }),

  computed: {},

  methods: {
    async getContent() {
      const response = await this.$prismic.client.query([
        this.$prismic.Predicates.at("my.photo_aggregate.uid", "home_aggregate"),
        // this.$prismic.Predicates.at("my.photo.uid", "test_photo_1"),
        // this.$prismic.Predicates.at(
        //   "my.photo_series.uid",
        //   "op-18-impassioned-souls"
        // ),
      ]);
      this.response = response;
    },
  },

  components: {},

  created() {
    this.getContent();
  },
};
</script>