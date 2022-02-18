<template>
  <div class="collection__cover-photo">
    <div class="collection__cover-photo__parallax-container">
      <v-img contain :max-height="mHeight" :src="imageData.url"> </v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: ["imageData", "scrollData", "loaded"],

  data: () => ({
    mounted: false,
    maxHeight: 0,
    maxWidth: 0,
    maxParallax: 30,
  }),

  methods: {
    handleScrolling() {
      const imgMid =
        this.$el.getBoundingClientRect().x + this.$el.clientWidth / 2;
      const windowMid = window.innerWidth / 2;
      let ratio = (imgMid - windowMid) / windowMid;

      if (ratio > 1) {
        ratio = 1;
      } else if (ratio < -1) {
        ratio = -1;
      }
      this.$el.firstElementChild.style.transform =
        "translateX(" + ratio * this.maxParallax + "px)";
    },
    refreshSize() {
      const ratio =
        this.imageData.dimensions.width / this.imageData.dimensions.height;
      this.maxHeight = this.$el.clientHeight;
      this.$el.firstElementChild.style.width = this.maxHeight * ratio + "px";
      console.log("ratio: " + ratio);
      console.log("height: " + this.maxHeight);
      console.log("width: " + this.$el.firstElementChild.style.width);
    },
    handleWindowResize(e) {
      this.refreshSize();
    },
    addEventListeners() {
      window.addEventListener("resize", this.handleWindowResize);
    },
  },

  computed: {
    scrolling() {
      return this.scrollData.scrollX;
    },
    mHeight() {
      return this.maxHeight;
    },
  },

  watch: {
    scrolling() {
      this.handleScrolling();
    },
  },

  created() {},

  mounted() {
    this.mounted = true;
    this.refreshSize();
    this.addEventListeners();
  },
};
</script>

<style lang="sass" scoped>
.collection__cover-photo
  display: flex
  height: 100%
  width: 40vw
  max-width: 800px
  overflow: hidden
  justify-content: center
  &__parallax-container
    position: relative
    transition: 500ms ease-out
</style>
