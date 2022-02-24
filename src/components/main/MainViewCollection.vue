<template>
  <div class="mv__container">
    <div class="mv__title" @click.stop="handleCollectionClick">
      {{ collectionData.data.title }}
    </div>
    <div class="mv__photos">
      <div
        class="mv__photo"
        v-for="item in photoData"
        :key="item.uid"
        @click.stop="handleCollectionClick"
      >
        <photo-loader :photo="item.photo"></photo-loader>
      </div>
    </div>
    <div class="mv__bottom-links">
      <div class="bottom-link-container">
        <v-btn outlined plain elevation="0" @click.stop="handleCollectionClick">
          View Collection
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import PhotoLoader from "../interface/PhotoLoader.vue";
export default {
  props: ["collectionData", "scrollData"],

  components: { PhotoLoader },

  data: () => ({
    photoData: [],
    maxParallax: 50,
  }),

  computed: {
    scrolling() {
      return this.scrollData.scrollX;
    },
  },

  watch: {
    scrolling() {
      this.handleScrolling();
    },
  },

  methods: {
    handleCollectionClick(e) {
      this.$router.push(`/collections/${this.collectionData.uid}`);
    },
    titleParallax() {
      const containerMid =
        this.$el.getBoundingClientRect().x + this.$el.clientWidth / 2;
      const windowMid = window.innerWidth / 2;
      let ratio = -(containerMid - windowMid) / windowMid;

      if (ratio < -3) {
        ratio = -3;
      } else if (ratio > 0) {
        ratio = 0;
      }

      this.$el.querySelector(".mv__title").style.transform = `translateX(${
        ratio * this.maxParallax
      }px)`;
    },
    bottomLinkParallax() {
      const $bottomLinks = this.$el.querySelector(".mv__bottom-links");

      const itemWidth = $bottomLinks.clientWidth;
      const windowMid = window.innerWidth / 2;

      const leftContainerBound = this.$el.getBoundingClientRect().x;
      const midContainerBound = leftContainerBound + this.$el.clientWidth / 2;

      const leftRange = this.$el.clientWidth / 2 - itemWidth;
      const rightRange = this.$el.clientWidth / 2 - itemWidth;

      let diff = windowMid - midContainerBound;

      if (diff < -leftRange) {
        diff = -leftRange;
        $bottomLinks.style.opacity = "0";
      } else if (diff > rightRange) {
        diff = rightRange;
        $bottomLinks.style.opacity = "0";
      } else {
        $bottomLinks.style.opacity = "1";
      }

      $bottomLinks.style.transform = `translateX(${diff}px)`;
    },
    handleScrolling() {
      this.titleParallax();
      this.bottomLinkParallax();
    },
    initializeCollectionData() {
      this.collectionData.data.photos.forEach((item) => {
        if (item.photo.type == "photo") {
          if (item.photo.photo_object.impact == "major") {
            this.photoData.push(item.photo.photo_object);
          }
        } else if (item.photo.type == "photo_collection") {
          item.photo.photo_object.data.photos.forEach((item2) => {
            if (item2.photo.photo_object.impact == "major") {
              this.photoData.push(item2.photo.photo_object);
            }
          });
        }
      });
    },
  },

  mounted() {
    this.initializeCollectionData();
    this.handleScrolling();
  },
};
</script>

<style lang="sass" scoped>
pre
  font-size: 10px

.mv
  &__container
    display: flex
    align-items: center
    height: 100%
    background: white
    transform: translateX(-150px)

  &__title
    font-size: 5.875rem
    mix-blend-mode: exclusion
    color: white
    width: 600px
    position: absolute
    top: 50%
    left: -238px
    transition: 2s ease-out
    cursor: pointer
  &__photos
    display: flex
    align-items: center
    height: 60vh
    padding: 0 2rem 0 20rem
  &__photo
    height: 50%
    padding: 1rem
    cursor: pointer
    height: 100%
  &__bottom-links
    position: absolute
    margin: 2rem
    left: 50%
    bottom: 0
    transition: opacity 500ms ease-out
</style>