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
  props: {
    photoOrSeries: {
      type: Object,
    },
  },

  data: () => ({}),

  computed: {
    src() {
      return this.photoOrSeries.photoObject.photo.url;
    },
    position() {
      return this.photoOrSeries.yPos + " " + this.photoOrSeries.xPos;
    },
  },

  methods: {},

  created() {
    console.log(JSON.stringify(this.photoOrSeries));
  },
};
</script>