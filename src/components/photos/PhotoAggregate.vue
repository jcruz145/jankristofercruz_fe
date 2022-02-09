<template>
  <v-row justify="center">
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
</template>

<script>
import AggregatePhoto from "./AggregatePhoto.vue";
import prismicHelper from "../../utility/prismicHelper";

export default {
  props: {
    aggregateId: {
      type: String,
    },
  },

  data: () => ({
    aggregate: [],
    processedCollection: [],
    page: null,
    loading: true,
  }),

  computed: {},

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

          if (this.aggregate[i].photoObject.full) {
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

      this.processedCollection = this.aggregate;
    },
  },

  components: { AggregatePhoto },

  created() {
    this.getAggregate();
  },
};
</script>