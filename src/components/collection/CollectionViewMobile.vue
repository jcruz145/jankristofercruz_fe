<template>
  <div class="collection__container">
    <!-- <pre>{{ JSON.stringify(photoData, null, 2) }}</pre> -->
    <div class="collection__title-part">
      <h1>
        <h1 class="collection__title">{{ collectionData.data.title }}</h1>
        <p class="collection__description">
          {{ collectionData.data.description }}
        </p>
      </h1>
    </div>
    <div
      class="collection__item"
      v-for="item in photoData"
      :key="item.photo.uid"
    >
      <v-img :src="item.photo.photo_object.photo.url"></v-img>
    </div>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper";
export default {
  props: ["collectionId"],

  components: {},

  data: () => ({
    mounted: false,
    loaded: false,
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
        this.$route.params.id
      );

      this.collectionData = response;
      this.collectionData.data.photos.forEach((item) => {
        if (item.photo.type == "photo") {
          this.photoData.push(item);
        } else if (item.photo.type == "photo_collection") {
          item.photo.photo_object.data.photos.forEach((item2) => {
            this.photoData.push(item2);
          });
        }
      });

      this.loaded = true;
    },
    handleScroll(e) {
      if (!this.mounted) return;
    },
    handleWheel(e) {},
    handleResize(e) {},
    addEventListeners() {
      window.addEventListener("resize", this.handleResize);
    },
  },

  watch: {
    mountedAndLoaded() {
      if (this.mountedAndLoaded) {
        this.addEventListeners();
      }
    },
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
  font-size: 8px

.collection
  &__container
    width: 100%
    display: flex
    flex-direction: column
    overflow-x: hidden
    overflow-y: auto
    position: relative
  &__title-part
    padding: 2rem
    font-family: 'Monsterrat', sans-serif
    line-height: 1.25
  &__title
    font-size: 5.626rem
  &__description
    font-size: 1.687rem
  &__item
    width: 100%
    display: block
    padding: 1rem 0.5rem
</style>