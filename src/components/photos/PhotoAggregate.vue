<template>
  <v-row justify="center">
    <v-col
      sm="6"
      v-for="photoOrSeries in aggregate"
      :key="photoOrSeries.item.id"
      :align-self="photoOrSeries.yPos"
    >
      <aggregate-photo
        :photo-or-series="photoOrSeries.item"
        :position="photoOrSeries.xPos"
      ></aggregate-photo>
    </v-col>
  </v-row>
</template>

<script>
import AggregatePhoto from "./AggregatePhoto.vue";

export default {
  props: {
    aggregateId: {
      type: String,
    },
  },

  data: () => ({
    aggregate: [],
    page: null,
  }),

  computed: {},

  methods: {
    async getAggregate() {
      const response = await this.$prismic.client.query([
        this.$prismic.Predicates.at("my.photo_aggregate.uid", this.aggregateId),
      ]);

      response.results[0].data.photos_and_series.forEach((item, i) => {
        const idx = i + 1;
        if (idx % 4 <= 2 && idx % 4 != 0) {
          item.yPos = "end";
        } else {
          item.yPos = "start";
        }

        if (idx % 2 == 0) {
          item.xPos = "left";
        } else {
          item.xPos = "right";
        }
        this.aggregate.push(item);
      });

      this.page = response.page;
    },
  },

  components: { AggregatePhoto },

  created() {
    this.getAggregate();
  },
};
</script>