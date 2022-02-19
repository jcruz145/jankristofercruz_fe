<template>
  <div class="mv__container">
    <div class="mv__title" @click.stop="handleCollectionClick">
      {{ collectionData.data.title }}
    </div>
    <div class="mv__photos">
      <div
        class="mv__photo"
        :class="item.impact == 'major' ? 'full' : ''"
        v-for="item in photoData"
        :key="item.uid"
        @click.stop="handleCollectionClick"
      >
        <v-img :src="item.photo.url"></v-img>
      </div>
    </div>
  </div>
</template>
<script>
import MainViewPhoto from "./MainViewPhoto.vue";
export default {
  props: ["collectionData"],

  components: { MainViewPhoto },

  data: () => ({
    photoData: [],
  }),

  computed: {},

  watch: {},

  methods: {
    handleCollectionClick(e) {
      this.$router.push(`/collections/${this.collectionData.uid}`);
    },
    initializeCollectionData() {
      this.collectionData.data.photos.forEach((item) => {
        if (item.photo.type == "photo") {
          if (item.photo.photo_object.impact == "major") {
            this.photoData.push(item.photo.photo_object);
          }
        } else if (item.photo.type == "photo_collection") {
          item.photo.photo_object.data.photos.forEach((item2) => {
            if (item2.photo.photo_object.impact == "major") {
              this.photoData.push(item2.photo.photo_object);
            }
          });
        }
      });
    },
  },

  mounted() {
    this.initializeCollectionData();
  },
};
</script>

<style lang="sass" scoped>
pre
  font-size: 10px

.mv
  &__container
    display: flex
    flex-direction: column
    width: 100%
    background: white
    padding: 3rem 0

  &__title
    font-weight: bold
    font-size: 1.875rem
    mix-blend-mode: exclusion
    color: white
    cursor: pointer
    padding: 0.5rem
  &__photos
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
  &__photo
    padding: 0.5rem
    cursor: pointer
    width: 100%
</style>