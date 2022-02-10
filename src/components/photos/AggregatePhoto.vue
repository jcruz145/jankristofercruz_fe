<template>
  <div
    class="horizontal-aggregate-image-container"
    ref="horizontalAggregateImageContainer"
  >
    <div
      class="horizontal-aggregate-image-capsule"
      ref="horizontalAggregateImageCapsule"
    >
      <ul>
        <li>ParallaxX: {{ parallaxX }}</li>
        <li>itemPos: {{ itemPos }}</li>
        <li>clientW: {{ clientW }}</li>
        <li>center: {{ center }}</li>
        <li>boundX: {{ boundX }}</li>
      </ul>

      <v-img
        :src="src"
        :position="position"
        :max-height="maxHeight"
        contain
      ></v-img>
    </div>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper.js";

export default {
  props: {
    photoOrSeries: {
      type: Object,
    },
    containerHeight: {
      type: Number,
    },
    parallaxCoefficient: {
      type: Number,
    },
    parallaxWidth: {
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
  },

  data: () => ({
    maxWidth: null,
    maxHeight: null,
    parallaxAmount: 200,
    mounted: false,
    parallaxX: null,
    center: null,
    itemPos: null,
    clientW: null,
    boundX: null,
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
      this.maxHeight = value;
    },
    parallaxCoefficient: function (value) {
      //this.updateParallax();
    },
    scrolling: function (value) {
      value ? this.unfocus() : this.focus();
    },
  },

  methods: {
    updateParallax() {
      if (!this.mounted) return;
      const itemCenterPos =
        this.$el.getBoundingClientRect().x + this.$el.clientWidth / 2;
      const scrollCenterPos =
        this.parallaxWidth * this.parallaxCoefficient +
        this.horizontalAggregateWidth / 2;

      let transX = itemCenterPos - this.horizontalAggregateCenterX;
      let ratio = transX == 0 ? 0 : -transX / this.horizontalAggregateWidth / 2;

      this.center = this.horizontalAggregateCenterX;
      this.parallaxX = transX;
      this.itemPos = itemCenterPos;
      this.clientW = this.$el.clientWidth;
      this.boundX = this.$el.getBoundingClientRect().x;

      transX = ratio * this.parallaxAmount;

      this.$el.querySelector(
        ".horizontal-aggregate-image-capsule"
      ).style.transform = "translateX(" + transX + "px)";
    },
    unfocus() {
      if (!this.mounted) return;
      this.$el.querySelector(
        ".horizontal-aggregate-image-capsule"
      ).style.transition = "500ms ease-in-out";
      this.$el.querySelector(
        ".horizontal-aggregate-image-capsule"
      ).style.transform = "translateX(0px)";
    },
    focus() {
      if (!this.mounted) return;
      const itemCenterPos =
        this.$el.getBoundingClientRect().x + this.$el.clientWidth / 2;
      const centerDiff = this.horizontalAggregateCenterX - itemCenterPos;

      if (Math.abs(centerDiff) <= this.horizontalAggregateWidth / 2) {
        // Picture is center and should be focused
      } else if (centerDiff > 0) {
        // Picture is to the right and should be pushed away to the right
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transition = "1s ease-in-out";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transform = "translateX(-" + this.parallaxAmount + "px)";
      } else {
        // Picture is left and should be pushed away to the left
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transition = "1s ease-in-out";
        this.$el.querySelector(
          ".horizontal-aggregate-image-capsule"
        ).style.transform = "translateX(+" + this.parallaxAmount + "px)";
      }
    },
  },

  created() {
    this.maxHeight = this.containerHeight;
  },

  mounted() {
    this.mounted = true;
    //console.log(this.$el.querySelector(".horizontal-aggregate-image-capsule"));
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