<template>
  <div class="photo-aggregate-view__photo-mobile">
    <v-img
      :src="photoData.photo_object.photo.url"
      :max-width="maxWidth"
    ></v-img>
  </div>
</template>

<script>
import helper from "../../utility/helper";

export default {
  props: {
    photoData: {
      type: Object,
    },
  },

  data: () => ({
    maxWidth: 300,
    mounted: false,
  }),

  computed: {},

  watch: {},

  methods: {},

  mounted() {
    this.mounted = true;
    this.maxWidth = helper.getInnerWidth(this.$el.parentElement);
  },
};
</script>

<style lang="sass" scoped>
</style>