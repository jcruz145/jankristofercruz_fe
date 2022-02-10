<template>
  <div class="aggregate-container">
    <div
      v-if="horizontal"
      class="horizontal-scroll-container"
      ref="horizontalScrollContainer"
    >
      <div
        v-for="item in processedCollection"
        :key="item.id"
        class="horizontal-scroll-capsule"
      >
        <aggregate-photo
          horizontal
          :photo-or-series="item"
          :container-height="horizontalAggregateHeight"
          :horizontal-aggregate-width="horizontalAggregateWidth"
          :horizontal-aggregate-center-x="horizontalAggregateCenterX"
          :scrolling="scrolling"
        ></aggregate-photo>
      </div>
    </div>
    <v-row v-else justify="center">
      <v-col
        v-for="item in processedCollection"
        :key="item.id"
        :align-self="item.yPos"
        :sm="item.photoObject.full ? '12' : '6'"
        cols="12"
      >
        <aggregate-photo
          :photo-or-series="item"
          :position="item.xPos"
        ></aggregate-photo>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AggregatePhoto from "./AggregatePhoto.vue";
import prismicHelper from "../../utility/prismicHelper";
import _ from "lodash";

export default {
  props: {
    aggregateId: {
      type: String,
    },
    horizontal: {
      type: Boolean,
    },
  },

  data: () => ({
    aggregate: [],
    page: null,
    horizontalAggregateHeight: 0,
    loadedAggregate: false,
    parallaxCoefficient: 0,
    parallaxWidth: 0,
    horrizontalAggregateWidth: 0,
    horizontalAggregateCenterX: 0,
    scrolling: false,
    scrollTimer: null,
    mounted: false,
  }),

  computed: {
    processedCollection() {
      return this.loadedAggregate ? this.aggregate : [];
    },
  },

  methods: {
    async getAggregate() {
      let response = await this.$prismic.client.query([
        this.$prismic.Predicates.at("my.photo_aggregate.uid", this.aggregateId),
      ]);

      this.page = response.page;

      let exect = [];

      response.results[0].data.photos_and_series.forEach((item) => {
        this.aggregate.push({ ...item.item });
      });

      this.aggregate.forEach((item, i) => {
        process = async () => {
          switch (item.type) {
            case "photo_series":
              this.aggregate[i].photoObject =
                await prismicHelper.getCoverPhotoObjectInSeries(
                  this.$prismic,
                  item.uid
                );
              break;

            case "photo":
              this.aggregate[i].photoObject =
                await prismicHelper.getPhotoObject(this.$prismic, item.uid);
              break;

            default:
              break;
          }

          const idx = i + 1;

          if (this.aggregate[i].photoObject.full || this.horizontal) {
            this.aggregate[i].yPos = "center";
            this.aggregate[i].xPos = "center";
          } else {
            this.aggregate[i].yPos =
              idx % 4 <= 2 && idx % 4 != 0 ? "end" : "start";

            this.aggregate[i].xPos = idx % 2 == 0 ? "left" : "right";
          }
        };

        exect.push(process());
      });

      await Promise.all(exect);
    },
    addEventListenters() {
      if (!this.horizontal) {
      } else {
        const scrollContainer = this.$refs.horizontalScrollContainer;

        this.$refs.horizontalScrollContainer.addEventListener("wheel", (e) => {
          e.preventDefault();
          this.$refs.horizontalScrollContainer.scrollLeft += e.deltaY;
        });

        // Mouse Dragging

        let mouseDown = false;
        let startX, scrollLeft;
        scrollContainer.addEventListener("mousedown", (e) => {
          mouseDown = true;
          startX = e.pageX - scrollContainer.offsetLeft;
          scrollLeft = scrollContainer.scrollLeft;
          console.log("mouseDown, startX: " + startX);
        });
        scrollContainer.addEventListener("mouseup", (e) => {
          mouseDown = false;
        });
        scrollContainer.addEventListener("mouseleave", (e) => {
          mouseDown = false;
        });
        scrollContainer.addEventListener("mousemove", (e) => {
          e.preventDefault();
          console.log("movin");
          if (!mouseDown) {
            return;
          }
          const x = e.pageX - scrollContainer.offsetLeft;
          const scroll = x - startX;
          scrollContainer.scrollLeft = scrollLeft - scroll;
        });

        this.$refs.horizontalScrollContainer.addEventListener("scroll", (e) => {
          this.updateHorizontalAggregateParallax();
        });

        window.addEventListener(
          "resize",
          _.debounce(this.updateHorizontalAggregateHeight, 200)
        );
      }
    },
    async onCreated() {
      await this.getAggregate();
      this.loadedAggregate = true;
      this.updateHorizontalAggregateHeight();
      this.updateHorizontalAggregateParallax();
      this.addEventListenters();
    },
    updateHorizontalAggregateHeight() {
      if (!this.horizontal) return;
      const y = this.$refs.horizontalScrollContainer.getBoundingClientRect().y;
      const windowHeight = window.innerHeight;

      this.horizontalAggregateHeight = windowHeight - y - 20;
      this.$refs.horizontalScrollContainer.style.height =
        this.horizontalAggregateHeight + "px";
    },
    updateHorizontalAggregateParallax() {
      if (!this.horizontal) return;
      clearTimeout(this.scrollTimer);
      this.scrolling = true;
      this.scrollTimer = window.setTimeout(() => {
        this.scrolling = false;
      }, 1000);

      const sw =
        this.$refs.horizontalScrollContainer.scrollWidth -
        this.$refs.horizontalScrollContainer.clientWidth;

      this.parallaxWidth = sw;
      this.horizontalAggregateWidth =
        this.$refs.horizontalScrollContainer.clientWidth;
      this.horizontalAggregateCenterX =
        this.$refs.horizontalScrollContainer.getBoundingClientRect().x +
        this.$refs.horizontalScrollContainer.clientWidth / 2;
    },
  },

  watch: {
    scrolling: function (value) {},
  },

  components: { AggregatePhoto },

  created() {
    this.onCreated();
  },

  mounted() {
    this.mounted = true;
  },

  beforeDestroy() {
    window.removeEventListener(
      "resize",
      _.debounce(this.updateHorizontalAggregateHeight, 200)
    );
  },
};
</script>

<style lang="sass" scoped>
.horizontal-scroll-container
  display: flex
  overflow-x: auto
  overflow-y: hidden
  cursor: grab
  -ms-overflow-style: none
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none

.horizontal-scroll-capsule
  position: relative
  max-width: 60vw
  align-items: center
  display: flex
  margin-left: 5rem
  &:last-of-type
    margin-right: 20vw
</style>