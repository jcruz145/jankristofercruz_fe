<template>
  <main-view-mobile v-if="$vuetify.breakpoint.xsOnly"></main-view-mobile>
  <main-view v-else></main-view>
</template>

<script>
import MainView from "../components/main/MainView.vue";
import MainViewMobile from "../components/main/MainViewMobile.vue";
import CollectionView from "../components/collection/CollectionView.vue";
import CollectionViewMobile from "../components/collection/CollectionViewMobile.vue";
export default {
  components: {
    CollectionView,
    CollectionViewMobile,
    MainView,
    MainViewMobile,
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