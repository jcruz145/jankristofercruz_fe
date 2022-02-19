<template>
  <div class="mvp">
    <v-img
      :src="photo.url"
      :max-height="maxHeight"
      :max-width="maxWidth"
    ></v-img>
  </div>
</template>

<script>
export default {
  props: ["photo"],

  data: () => ({
    maxHeight: 0,
    maxWidth: 0,
  }),

  mounted() {
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
};
</script>

<style lang="sass" scoped>
.mvp
  display: flex
  justify-content: center
</style>