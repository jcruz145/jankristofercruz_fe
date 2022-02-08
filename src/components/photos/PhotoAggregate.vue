<template>
  <v-container>
    <v-row>
      <v-col
        v-for="photoOrSeries in aggregate"
        :key="photoOrSeries.item.id"
        sm="6"
      >
        <aggregate-photo
          :photo-or-series="photoOrSeries.item"
        ></aggregate-photo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AggregatePhoto from "./AggregatePhoto.vue";

export default {
  // props: ["aggregateId"],

  props: {
    aggregateId: {
      type: String,
    },
  },

  data: () => ({
    aggregate: null,
    page: null,
  }),

  computed: {},

  methods: {
    async getAggregate() {
      const response = await this.$prismic.client.query([
        this.$prismic.Predicates.at("my.photo_aggregate.uid", this.aggregateId),
      ]);
      this.aggregate = response.results[0].data.photos_and_series;
      this.page = response.page;
    },
  },

  components: { AggregatePhoto },

  created() {
    this.getAggregate();
  },
};
</script>