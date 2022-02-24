<template>
  <div class="collection__container">
    <section class="collection__title-section">
      <div class="collection__title-part">
        <h1 class="collection__title">{{ collectionData.data.title }}</h1>
        <p class="collection__description">
          {{ collectionData.data.description }}
        </p>
      </div>
      <div class="collection__footer-part">
        <random-collection-button>
          View Other Collection
        </random-collection-button>
        <v-spacer></v-spacer>
        <div class="collection__footer-part__mouse">
          <mouse-scroll></mouse-scroll>
        </div>
      </div>
    </section>
    <section class="collection__cover-section">
      <collection-cover-photo
        :image-data="collectionData.data.cover_image"
        :scroll-data="scrollData"
        :loaded="mountedAndLoaded"
      ></collection-cover-photo>
    </section>
    <section class="collection__showcase">
      <div
        class="collection__item"
        v-for="item in photoData"
        :key="item.photo.uid"
      >
        <collection-view-photo
          v-if="item.photo.type == 'photo'"
          :photo-data="item.photo"
        ></collection-view-photo>
        <collection-view-collection v-else :collection-id="item.photo.uid">
        </collection-view-collection>
      </div>
    </section>

    <section class="collection__endcap">
      <div class="main__title-part">
        <h1 class="main__title">End.</h1>
      </div>
      <div class="main__footer-part">
        <random-collection-button>
          View Other Collection
        </random-collection-button>
        <v-spacer></v-spacer>
      </div>
    </section>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper";

import CollectionCoverPhoto from "./CollectionCoverPhoto.vue";
import CollectionViewPhoto from "./CollectionViewPhoto.vue";
import CollectionViewCollection from "./CollectionViewCollection.vue";
import RandomCollectionButton from "../interface/RandomCollectionButton.vue";
import MouseScroll from "../interface/MouseScroll.vue";
import { mapActions } from "vuex";

export default {
  props: ["collectionId"],

  components: {
    CollectionCoverPhoto,
    CollectionViewPhoto,
    CollectionViewCollection,
    RandomCollectionButton,
    MouseScroll,
  },

  data: () => ({
    mounted: false,
    loaded: false,
    lastKnownScrollPosition: 0,
    ticking: false,
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
    ...mapActions(["setCurrentCollection"]),
    async initializeCollectionData() {
      let response = await prismicHelper.getCollectionItems(
        this.$prismic,
        this.$route.params.id
      );

      this.collectionData = response;
      this.collectionData.data.photos.forEach((item, index) => {
        this.photoData.push(item);
      });

      this.loaded = true;
      this.setCurrentCollection(this.collectionData.uid);
    },
    handleScroll(e) {
      if (!this.mounted) return;

      this.lastKnownScrollPosition = this.$el.scrollLeft;

      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.scrollData.scrollX = this.$el.scrollLeft;
          this.scrollData.scrollWidth = this.$el.scrollWidth;
          this.ticking = false;
        });

        this.ticking = true;
      }
    },
    handleWheel(e) {
      this.$el.scrollLeft += e.deltaY;
    },
    handleResize(e) {},
    addEventListeners() {
      this.$el.addEventListener("wheel", this.handleWheel);
      this.$el.addEventListener("scroll", this.handleScroll);
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
    height: 100vh
    width: 100%
    max-height: 100%
    max-width: 100%
    display: flex
    overflow-y: hidden
    overflow-x: auto
    position: relative
  &__title-section
    display: flex
    flex: 0 0 auto
    width: 90vw
    max-width: 1200px
    background-color: black
    color: white
    align-items: left
    justify-content: space-between
    flex-direction: column
    padding: 3rem
    padding-left: 10rem
    &:before
      content: ' '
      height: 2.5rem
      display: block

  &__title-part

  &__footer-part
    display: flex
    justify-content: space-between
    &:before
      content: ' '
      height: 2.5rem
      display: block
    &__mouse
      display: flex
      align-items: center

  &__title
    font-size: 5.625rem
  &__description
    font-size: 1.687rem
  &__cover-section
    height: 100%
  &__showcase
    align-items: center
    display: flex
    width: auto
    height: 100%
    margin: 0 15rem
  &__item
    display: flex
    height: 70vh
    max-height: 900px
  &__endcap
    display: flex
    flex: 0 0 auto
    width: 50vw
    max-width: 600px
    background-color: black
    color: white
    justify-content: space-between
    flex-direction: column
    padding: 3rem
    padding-left: 10rem
    &:before
      content: ' '
      height: 2.5rem
      display: block
</style>