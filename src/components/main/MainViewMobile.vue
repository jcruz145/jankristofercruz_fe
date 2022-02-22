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
      </div>
    </section>
    <section class="main__showcase">
      <div class="main__item" v-for="item in collectionData" :key="item.uid">
        <main-view-collection-mobile
          :collection-data="item"
        ></main-view-collection-mobile>
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
import MainViewCollectionMobile from "./MainViewCollectionMobile.vue";
import RandomCollectionButton from "../interface/RandomCollectionButton.vue";

export default {
  props: ["collectionId"],

  components: {
    MainViewCollectionMobile,
    RandomCollectionButton,
  },

  data: () => ({
    mounted: false,
    loaded: false,
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
    },
  },

  watch: {},

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
    width: 100%
    display: flex
    flex-direction: column
    overflow-y: auto
    overflow-x: hidden
  &__title-section
    display: flex
    width: 100%
    background-color: black
    color: white
    justify-content: space-between
    flex-direction: column
    padding: 2rem
    margin-top: 3rem
    &:before
      content: ' '
      height: 2.5rem
      display: block

  &__title-part
    line-height: 1
  &__title
    font-size: 3.625rem
  &__description
    padding-top: 1rem
    font-size: 1.687rem

  &__footer-part
    display: flex
    justify-content: space-between
    align-content: center
    margin-top: 3rem
  &__showcase
    display: flex
    flex-direction: column
    width: 100%
    background: white
  &__item
    display: flex
  &__endcap
    display: flex
    width: 100%
    background-color: black
    color: white
    justify-content: space-between
    flex-direction: column
    padding: 3rem
    &:before
      content: ' '
      height: 2.5rem
      display: block
</style>