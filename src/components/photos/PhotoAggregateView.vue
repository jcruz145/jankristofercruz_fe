<template>
  <div class="photo-aggregate-view">
    <div
      v-if="$vuetify.breakpoint.xsOnly"
      class="photo-aggregate-view__container-mobile"
    >
      <!-- <pre>{{ JSON.stringify(processedAggregateViewMobile, null, 2) }}</pre> -->
      <div
        v-for="(section, sectionIdx) of processedAggregateViewMobile"
        :key="sectionIdx"
        class="photo-aggregate-view__section-mobile"
      >
        <div class="photo-aggregate-view__column-mobile">
          <photo-aggregate-view-photo-mobile
            :photo-data="section"
          ></photo-aggregate-view-photo-mobile>
        </div>
      </div>
    </div>
    <div v-else class="photo-aggregate-view__container">
      <!-- <pre>{{ JSON.stringify(processedAggregateView, null, 2) }}</pre> -->
      <div
        v-for="(section, sectionIdx) of processedAggregateView"
        :key="sectionIdx"
        class="photo-aggregate-view__section"
      >
        <template v-if="Array.isArray(section)">
          <div
            v-for="(column, columnIdx) of section"
            :key="columnIdx"
            class="photo-aggregate-view__column half"
          >
            <template v-if="Array.isArray(column)">
              <div
                v-for="(item, itemIdx) in column"
                :key="itemIdx"
                class="photo-aggregate-view__item"
              >
                <photo-aggregate-view-photo
                  :scroll-data="scrollData"
                  :photo-data="item"
                />
              </div>
            </template>
            <template v-else>
              <div class="photo-aggregate-view__item">
                <photo-aggregate-view-photo
                  :scroll-data="scrollData"
                  :photo-data="column"
                />
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="photo-aggregate-view__column full">
            <div class="photo-aggregate-view__item">
              <photo-aggregate-view-photo
                :scroll-data="scrollData"
                :photo-data="section"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper";
import PhotoAggregateViewPhoto from "./PhotoAggregateViewPhoto.vue";
import PhotoAggregateViewPhotoMobile from "./PhotoAggregateViewPhotoMobile.vue";

export default {
  components: {
    PhotoAggregateViewPhoto,
    PhotoAggregateViewPhotoMobile,
  },

  props: {
    aggregateId: {
      type: String,
    },
  },

  data: () => ({
    mounted: false,
    ticking: false,
    lastKnownScrollPosition: 0,
    processedAggregate: null,
    processedAggregateView: null,
    processedCollection: null,
    scrollData: {
      scrollY: 0,
      scrollHeight: 0,
      scrollUp: false,
    },
    viewData: {
      centerY: 0,
    },
  }),

  computed: {
    processedAggregateViewMobile() {
      if (!this.processedCollection) return;
      return this.processedCollection.filter((item) => {
        return (
          item.photo_object.impact == "major" ||
          item.photo_object.impact == "normal"
        );
      });
    },
  },

  methods: {
    handleResize(e) {
      if (!this.mounted) return;
    },
    handleScroll(e) {
      if (!this.mounted) return;

      this.lastKnownScrollPosition = window.scrollY;

      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          if (this.scrollData.scrollY < this.lastKnownScrollPosition) {
            this.scrollData.scrollUp = false;
          } else {
            this.scrollData.scrollUp = true;
          }
          this.scrollData.scrollHeight = this.$el.scrollHeight;
          this.scrollData.scrollY = this.lastKnownScrollPosition;
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    addEventListeners() {
      if (!this.mounted) return;
      window.addEventListener("scroll", this.handleScroll);
    },
    removeEventListeners() {
      window.removeEventListener("scroll", this.handleScroll);
    },
    async initializePhotoAggregateView() {
      let aggregateView = [],
        normalBuffer = [],
        minorBuffer = [];

      this.processedCollection = await prismicHelper.getAggregateItems(
        this.$prismic,
        this.aggregateId
      );

      this.processedCollection.forEach((item, i) => {
        const data = item;
        if (item.photo_object.impact == "major") {
          if (normalBuffer.length > 0) {
            aggregateView.push(normalBuffer);
            normalBuffer = [];
          }
          aggregateView.push(data);
        } else {
          if (normalBuffer.length >= 2) {
            aggregateView.push(normalBuffer);
            normalBuffer = [];
          }
          if (item.photo_object.impact == "normal") {
            if (minorBuffer.length > 0) {
              normalBuffer.push(minorBuffer);
              minorBuffer = [];
            }
            if (normalBuffer.length >= 2) {
              aggregateView.push(normalBuffer);
              normalBuffer = [];
            }
            normalBuffer.push(data);
          } else {
            if (minorBuffer.length >= 2) {
              normalBuffer.push(minorBuffer);
              minorBuffer = [];
            }
            minorBuffer.push(data);
          }
        }
      });

      this.processedAggregateView = aggregateView;
    },
  },

  watch: {},

  created() {
    this.initializePhotoAggregateView();
  },

  mounted() {
    this.mounted = true;
    this.addEventListeners();
  },
};
</script>

<style lang="sass" scoped>
.photo-aggregate-view
  display: flex
  justify-content: center

  &__container-mobile
    width: 100%
    overflow: hidden

  &__container
    width: 100%
    max-width: 1000px
    overflow: hidden

  &__section
    width: 100%
    display: flex
    align-items: center
    justify-content: center

  &__column
    padding: 0 3rem
    &.half
      width: 50%
    &.full
      width: 90%

  &__column-mobile
    padding: 1rem
    padding-bottom: 0

  &__item
    padding-bottom: 3rem
    width: 100%
</style>