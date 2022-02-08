<template>
  <div>
    <v-img :src="src" contain max-height="600" max-width="1200"></v-img>
  </div>
</template>

<script>
export default {
  props: ["photoOrSeries"],

  data: () => ({
    src: "",
  }),

  computed: {},

  methods: {
    async getImageInPhoto(uid) {
      const response = await this.$prismic.client.query([
        this.$prismic.Predicates.at("my.photo.uid", uid),
      ]);
      return await response.results[0].data.photo.url;
    },
    async getImageInSeries(uid) {
      const response = await this.$prismic.client.query([
        this.$prismic.Predicates.at("my.photo_series.uid", uid),
      ]);
      return await this.getImageInPhoto(
        response.results[0].data.cover_image.uid
      );
    },

    async getAggregatePhoto(item) {
      switch (item.type) {
        case "photo_series":
          this.src = await this.getImageInSeries(item.uid);
          break;

        case "photo":
          this.src = await this.getImageInPhoto(item.uid);
          break;

        default:
          this.src = "";
          break;
      }
    },
  },

  created() {
    this.getAggregatePhoto(this.photoOrSeries);
  },
};
</script>