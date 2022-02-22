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
    <div class="collection__button-part">
      <random-collection-button>
        View Another Collection
      </random-collection-button>
    </div>
    <div
      class="collection__item"
      v-for="item in photoData"
      :key="item.photo.uid"
    >
      <v-img :src="item.photo.photo_object.photo.url"></v-img>
    </div>
    <div class="collection__footer-part">
      <random-collection-button>
        View Another Collection
      </random-collection-button>
    </div>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper";
import RandomCollectionButton from "../interface/RandomCollectionButton.vue";
import { mapActions } from "vuex";

export default {
  props: ["collectionId"],

  components: { RandomCollectionButton },

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
    ...mapActions(["setCurrentCollection"]),
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
      this.setCurrentCollection(this.collectionData.uid);
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
    padding-top: 80px
  &__title-part
    padding: 2rem
    font-family: 'Monsterrat', sans-serif
    line-height: 1.25
  &__title
    font-size: 2.5rem
    line-height: 1
  &__description
    padding-top: .5rem
    font-size: 1.25rem
  &__button-part
    display: flex
    justify-content: center
    margin-bottom: 1rem
  &__item
    width: 100%
    display: block
    padding: 0 1rem 1rem 1rem
  &__footer-part
    display: flex
    justify-content: center
    padding: 3rem
    background: black
</style>