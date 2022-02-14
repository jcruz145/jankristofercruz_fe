<template>
  <photo-aggregate-view :aggregate-id="aggregateID"></photo-aggregate-view>
</template>

<script>
import PhotoAggregateView from "../components/photos/PhotoAggregateView.vue";

export default {
  components: {
    PhotoAggregateView,
  },

  props: {},

  data: () => ({
    mounted: false,
    processedCollection: null,
    aggregateID: "home_aggregate",
  }),

  computed: {},

  methods: {},

  watch: {},

  created() {},

  mounted() {
    this.mounted = true;
  },
};
</script>