<template>
  <!-- <pre>{{ JSON.stringify(mainData, null, 2) }}</pre> -->
  <div class="main__container">
    <!-- <pre>{{ JSON.stringify(collectionIDs, null, 2) }}</pre> -->
    <section class="main__title-section">
      <div class="main__title-part">
        <h1 class="main__title">{{ mainData.data.title }}</h1>
        <p class="main__description">
          {{ mainData.data.message }}
        </p>
      </div>
      <div class="main__footer-part">
        <random-collection-button></random-collection-button>
        <v-spacer></v-spacer>
        <div class="main__footer-part__mouse">
          <mouse-scroll></mouse-scroll>
        </div>
      </div>
    </section>
    <section class="main__showcase">
      <div class="main__item" v-for="item in collectionData" :key="item.uid">
        <collection-cover-photo
          :image-data="item.data.cover_image"
          :scroll-data="scrollData"
          :loaded="loaded"
        ></collection-cover-photo>
        <main-view-collection
          :scroll-data="scrollData"
          :collection-data="item"
        ></main-view-collection>
      </div>
    </section>
    <section class="main__endcap">
      <div class="main__title-part">
        <h1 class="main__title">End.</h1>
      </div>
      <div class="main__footer-part">
        <random-collection-button></random-collection-button>
        <v-spacer></v-spacer>
      </div>
    </section>
  </div>
</template>

<script>
import prismicHelper from "../../utility/prismicHelper";
import CollectionCoverPhoto from "../collection/CollectionCoverPhoto.vue";
import MouseScroll from "../interface/MouseScroll.vue";
import MainViewCollection from "./MainViewCollection.vue";
import RandomCollectionButton from "../interface/RandomCollectionButton.vue";

export default {
  props: ["collectionId"],

  components: {
    MouseScroll,
    MainViewCollection,
    CollectionCoverPhoto,
    RandomCollectionButton,
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
    mainData: {
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
    collectionData: [],
  }),

  computed: {
    mountedAndLoaded() {
      return this.mounted && this.loaded;
    },
  },

  methods: {
    async initializeCollectionData() {
      try {
        let response = await this.$prismic.client.getSingle("hom");
        let exect = [];

        response.data.home_entries.forEach((item, i) => {
          exect.push(
            (async () => {
              switch (item.home_entry.type) {
                case "photo_collection":
                  response.data.home_entries[i].home_entry.entry_object =
                    await prismicHelper.getCollectionItems(
                      this.$prismic,
                      item.home_entry.uid
                    );
                  break;

                default:
                  break;
              }
            })()
          );
        });

        await Promise.all(exect);

        this.mainData = response;

        this.mainData.data.home_entries.forEach((item) => {
          this.collectionData.push(item.home_entry.entry_object);
        });

        this.loaded = true;
      } catch (error) {
        throw error;
      }
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
  font-size: 10px
  margin-left: 100px
  overflow-x: hidden
  overflow-y: scroll

.main
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
    justify-content: space-between
    flex-direction: column
    padding: 3rem
    padding-left: 10rem
    &:before
      content: ' '
      height: 2.5rem
      display: block

  &__title-part
  &__title
    font-size: 3.625rem
  &__description
    font-size: 1.687rem

  &__footer-part
    display: flex
    justify-content: space-between
    align-content: center
    &:before
      content: ' '
      height: 2.5rem
      display: block
    &__mouse
      display: flex
      align-items: center
  &__showcase
    display: flex
    width: auto
    height: 100%
    background: white
  &__item
    display: flex
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