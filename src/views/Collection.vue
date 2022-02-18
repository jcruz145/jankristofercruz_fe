<template>
  <collection-view-mobile
    v-if="$vuetify.breakpoint.xsOnly"
    :collection-id="collectionId"
  >
  </collection-view-mobile>

  <collection-view v-else :collection-id="collectionId"> </collection-view>
</template>

<script>
import CollectionView from "../components/collection/CollectionView.vue";
import CollectionViewMobile from "../components/collection/CollectionViewMobile.vue";
export default {
  components: {
    CollectionView,
    CollectionViewMobile,
  },

  data: () => ({
    collectionId: null,
  }),

  computed: {},

  methods: {},

  watch: {},

  created() {
    this.collectionId = this.$route.params.id;
  },

  mounted() {
    this.mounted = true;
  },
};
</script>

<style lang="sass" scoped>
</style>