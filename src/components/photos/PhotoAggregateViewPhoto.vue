<template>
  <div class="photo-aggregate-view__photo">
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
    scrollData: {
      type: Object,
    },
  },

  data: () => ({
    parallaxTimer: null,
    parallaxMax: 5,
    parallaxMaxReached: false,
    parallaxTracker: false,
    parallaxCoefficient: 0,
    parallaxPreTransition: null,
    parallaxReboundStarted: false,
    parallaxAmount: 0,
    maxWidth: 0,
    mounted: false,
  }),

  computed: {
    scrollY() {
      return this.scrollData.scrollY;
    },
  },

  watch: {
    scrollY(val) {
      this.handleScroll();
    },
  },

  methods: {
    handleScroll() {
      if (!this.mounted) return;

      clearTimeout(this.parallaxTimer);

      let computed = window.getComputedStyle(this.$el);

      if (!this.parallaxTracker) {
        this.parallaxPreTransition = computed.getPropertyValue("transition");
      }

      this.parallaxTracker = true;

      this.$el.style.transition = "0s ease";

      let centerDelta =
        this.$el.getBoundingClientRect().y -
        this.$el.clientHeight / 2 -
        window.innerHeight / 2;

      let centerCoefficient =
        centerDelta >= 1 ? 1 / (centerDelta * centerDelta) : 1;

      let stepSize = 5 * centerCoefficient;
      if (this.scrollData.scrollUp) {
        if (this.parallaxAmount < this.parallaxMax) {
          this.parallaxMaxReached = false;
          this.parallaxReboundStarted = false;
          this.parallaxCoefficient--;
          stepSize =
            stepSize / Math.pow(Math.abs(this.parallaxCoefficient), 1 / 3);
        } else {
          this.parallaxMaxReached = true;
          stepSize = 0;
        }
      } else {
        if (this.parallaxAmount > -this.parallaxMax) {
          this.parallaxMaxReached = false;
          this.parallaxReboundStarted = false;
          this.parallaxCoefficient++;
          stepSize =
            -stepSize / Math.pow(Math.abs(this.parallaxCoefficient), 1 / 3);
        } else {
          this.parallaxMaxReached = true;
          stepSize = 0;
        }
      }

      if (this.parallaxMaxReached && !this.parallaxReboundStarted) {
        this.parallaxReboundStarted = true;
        this.$el.style.transition = "300ms ease-in-out";
        this.$el.style.transform = "translateY(0px)";
      }
      this.parallaxAmount += stepSize;
      this.$el.style.transform = "translateY(" + this.parallaxAmount + "px)";

      this.parallaxTimer = setTimeout(() => {
        this.$el.style.transition = this.parallaxPreTransition;
        this.$el.style.transform = "translateY(0px)";
        this.parallaxTracker = false;
        this.parallaxAmount = 0;
        this.parallaxCoefficient = 0;
      }, 50);
    },
  },

  mounted() {
    this.mounted = true;
    this.maxWidth = helper.getInnerWidth(this.$el.parentElement);
  },
};
</script>

<style lang="sass" scoped>
.photo-aggregate-view__photo
  transition: 1s ease-out
</style>