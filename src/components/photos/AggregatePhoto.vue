<template>
  <div
    class="aggregate-image-container"
    :class="horizontal ? 'horizontal-aggregate-image-container' : ''"
  >
    <div
      class="aggregate-image-capsule"
      :class="horizontal ? 'horizontal-aggregate-image-capsule' : ''"
    >
      <v-img
        :src="src"
        :position="position"
        :max-height="maxHeight"
        :max-width="maxWidth"
        contain
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photoOrSeries: {
      type: Object,
    },
    containerHeight: {
      type: Number,
    },
    horizontalAggregateWidth: {
      type: Number,
    },
    horizontalAggregateCenterX: {
      type: Number,
    },
    scrolling: {
      type: Boolean,
    },
    horizontal: {
      type: Boolean,
    },
  },

  data: () => ({
    maxWidth: null,
    maxHeight: null,
    parallaxAmount: 200,
    mounted: false,
  }),

  computed: {
    src() {
      return this.photoOrSeries.photoObject.photo.url;
    },
    position() {
      return this.photoOrSeries.yPos + " " + this.photoOrSeries.xPos;
    },
  },

  watch: {
    containerHeight: function (value) {
      this.horizontal && (this.maxHeight = value);
    },
    scrolling: function (value) {
      this.horizontal && value ? this.unfocus() : this.focus();
    },
  },

  methods: {
    unfocus() {
      if (!this.mounted) return;
      this.$el.querySelector(
        ".horizontal-aggregate-image-capsule"
      ).style.transition = "500ms ease-in-out";
      this.$el.querySelector(
        ".horizontal-aggregate-image-capsule"
      ).style.transform = "translateX(0px)";
      this.$el.querySelector(
        ".horizontal-aggregate-image-capsule"
      ).style.opacity = "1";
    },
    focus() {
      if (!this.mounted) return;
      const itemCenterPos =
        this.$el.getBoundingClientRect().x + this.$el.clientWidth / 2;
      const centerDiff = this.horizontalAggregateCenterX - itemCenterPos;

      if (Math.abs(centerDiff) <= this.$el.clientWidth / 2) {
        // Picture is center and should be focused
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transition = "1s ease-in-out";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transform = "translateX(" + centerDiff + "px)";
      } else if (centerDiff > 0) {
        // Picture is to the right and should be pushed away to the right
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transition = "500ms ease-in-out";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transform = "translateX(-" + this.parallaxAmount + "px)";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.opacity = "0";
      } else {
        // Picture is left and should be pushed away to the left
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transition = "500ms ease-in-out";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transform = "translateX(+" + this.parallaxAmount + "px)";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.opacity = "0";
      }
    },
    initializeMe() {
      if (this.horizontal) {
        this.maxHeight = this.containerHeight;
      } else {
        console.log(this.$el.parentElement.parentElement.clientWidth);
        //this.maxWidth = this.$el.parentElement.clientWidth;
      }
    },
  },

  created() {},

  mounted() {
    this.mounted = true;
    this.initializeMe();
  },
};
</script>

<style lang="sass" scoped>
.horizontal-aggregate-image-container,
.horizontal-aggregate-image-capsule
  position: relative
  display: flex
  max-width: 100%
  transition: 1000ms ease-in-out
</style>