<template>
  <div class="aggregate-container">
    <div
      ref="horizontalScrollContainer"
      v-if="horizontal"
      class="horizontal-scroll-container"
    >
      <div
        v-for="photoOrSeries in processedCollection"
        :key="photoOrSeries.id"
        class="horizontal-scroll-capsule"
      >
        <aggregate-photo
          :photo-or-series="photoOrSeries"
          :position="photoOrSeries.xPos"
          :container-height="horizontalAggregateHeight"
          :parallax-coefficient="parallaxCoefficient"
          :parallax-width="parallaxWidth"
          :horizontal-aggregate-width="horizontalAggregateWidth"
          :horizontal-aggregate-center-x="horizontalAggregateCenterX"
          :scrolling="scrolling"
          class="aggregate-photo"
        ></aggregate-photo>
      </div>
    </div>
    <v-row v-else justify="center">
      <v-col
        v-for="photoOrSeries in processedCollection"
        :key="photoOrSeries.id"
        :align-self="photoOrSeries.yPos"
        :sm="photoOrSeries.photoObject.full ? '12' : '6'"
      >
        <aggregate-photo
          :photo-or-series="photoOrSeries"
          :position="photoOrSeries.xPos"
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
      this.$refs.horizontalScrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        this.$refs.horizontalScrollContainer.scrollLeft += evt.deltaY;
      });

      this.$refs.horizontalScrollContainer.addEventListener("scroll", (evt) => {
        this.updateHorizontalAggregateParallax();
      });

      window.addEventListener(
        "resize",
        _.debounce(this.updateHorizontalAggregateHeight, 200)
      );
    },
    async onCreated() {
      await this.getAggregate();
      this.loadedAggregate = true;
      this.updateHorizontalAggregateHeight();
      this.updateHorizontalAggregateParallax();
      this.addEventListenters();
      this.mounted &&
        console.log(
          this.$el.querySelectorAll(".horizontal-scroll-container")[0]
            .childNodes[0]
        );
    },
    updateHorizontalAggregateHeight() {
      const y = this.$refs.horizontalScrollContainer.getBoundingClientRect().y;
      const windowHeight = window.innerHeight;

      this.horizontalAggregateHeight = windowHeight - y - 20;
      this.$refs.horizontalScrollContainer.style.height =
        this.horizontalAggregateHeight + "px";
    },
    updateHorizontalAggregateParallax() {
      clearTimeout(this.scrollTimer);
      this.scrolling = true;
      this.scrollTimer = window.setTimeout(() => {
        this.scrolling = false;
      }, 100);
      const sw =
        this.$refs.horizontalScrollContainer.scrollWidth -
        this.$refs.horizontalScrollContainer.clientWidth;
      const sl = this.$refs.horizontalScrollContainer.scrollLeft;
      const scrollRatio = sl > 0 ? sl / sw : 0;

      this.parallaxCoefficient = scrollRatio;
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

.horizontal-scroll-capsule
  position: relative
  max-width: 60vw
  align-items: center
  display: flex
  margin-left: 5rem
</style>