<template>
  <div class="collection-view-collection">
    <!-- <pre>{{ JSON.stringify(photoData, null, 2) }}</pre> -->
    <div class="showcase-title">
      {{ collectionData.data.title }}
    </div>
    <div class="showcase">
      <div
        class="collection__item"
        v-for="item in photoData"
        :key="item.photo.uid"
      >
        <collection-view-photo
          v-if="item.photo.type == 'photo'"
          :photo-data="item.photo"
        ></collection-view-photo>
      </div>
    </div>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper";
import CollectionViewPhoto from "./CollectionViewPhoto.vue";

export default {
  props: ["collectionId"],

  components: {
    CollectionViewPhoto,
  },

  data: () => ({
    mounted: false,
    loaded: false,
    lastKnownScrollPosition: 0,
    scrollData: {
      scrollX: 0,
      scrollWidth: 0,
    },
    collectionData: {
      uid: "",
      data: {
        title: "",
        subtitle: "",
        description: "",
        cover_image: {
          url: "",
          dimensions: {
            width: 0,
            height: 0,
          },
        },
      },
    },
    photoData: [],
  }),

  computed: {
    mountedAndLoaded() {
      return this.mounted && this.loaded;
    },
  },

  methods: {
    async initializeCollectionData() {
      let response = await prismicHelper.getCollectionItems(
        this.$prismic,
        this.collectionId
      );

      this.collectionData = response;
      this.collectionData.data.photos.forEach((item, index) => {
        this.photoData.push(item);
      });

      this.loaded = true;
    },
  },

  watch: {
    mountedAndLoaded() {},
  },

  created() {
    this.initializeCollectionData();
  },

  mounted() {
    this.mounted = true;
  },
};
</script>

<style lang="sass" scoped>
pre
  font-size: 10px

.collection-view-collection
  display: flex
  flex-direction: row
  align-items: center

.showcase
  display: flex
  flex-direction: row
  height: 100%

.showcase-title
  margin: 0 15rem 0 0
  font-size: 2.875rem
  font-family: 'Monsterrat', sans-serif
  color: 'gray'
</style>