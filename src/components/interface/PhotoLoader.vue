<template>
  <div class="photo-loader">
    <v-img
      :src="photo.url"
      :max-height="maxHeight"
      :max-width="maxWidth"
    ></v-img>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    maxHeight: 0,
    maxWidth: 0,
    mounted: false,
  }),

  methods: {
    refreshSizing() {
      const ratio = this.photo.dimensions.width / this.photo.dimensions.height;
      const parentStyle = getComputedStyle(this.$el.parentElement);
      this.maxHeight =
        this.$el.parentElement.clientHeight -
        (parseFloat(parentStyle.paddingTop) +
          parseFloat(parentStyle.paddingBottom));
      this.maxWidth = this.maxHeight * ratio;
      this.$el.style.width = `${this.maxWidth}px`;
      this.$el.style.height = `${this.maxHeight}px`;
    },
  },

  mounted() {
    this.mounted = true;
    this.refreshSizing();
  },
};
</script>

<style lang="sass" scoped>
.photo-loader
  display: flex
  justify-content: center
</style>