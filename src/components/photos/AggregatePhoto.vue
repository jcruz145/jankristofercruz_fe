<template>
  <div>
    <v-img
      :src="src"
      :position="position"
      contain
      max-height="600"
      max-width="1200"
    ></v-img>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper.js";

export default {
  // props: ["photoOrSeries"],

  props: {
    photoOrSeries: {
      type: Object,
    },
    position: {
      type: String,
    },
  },

  data: () => ({
    src: "",
  }),

  computed: {},

  methods: {
    async getAggregatePhoto(item) {
      switch (item.type) {
        case "photo_series":
          this.src = await prismicHelper.getCoverImageInSeries(
            this.$prismic,
            item.uid
          );
          break;

        case "photo":
          this.src = await prismicHelper.getImageByPhotoID(
            this.$prismic,
            item.uid
          );
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