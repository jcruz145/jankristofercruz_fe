<template>
  <div>
    <header-bar></header-bar>
    <contact-drawer></contact-drawer>
    <photo-aggregate-view :aggregate-id="aggregateID"></photo-aggregate-view>
  </div>
</template>

<script>
import PhotoAggregateView from "../components/photos/PhotoAggregateView.vue";
import HeaderBar from "../components/interface/HeaderBar.vue";
import ContactDrawer from "../components/interface/ContactDrawer.vue";

export default {
  components: {
    PhotoAggregateView,
    HeaderBar,
    ContactDrawer,
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