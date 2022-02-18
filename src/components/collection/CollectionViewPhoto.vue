<template>
  <div class="collection-view-photo">
    <!-- <pre>{{ JSON.stringify(photoData, null, 2) }}</pre> -->
    <v-img
      :max-height="maxHeight"
      :max-width="maxWidth"
      :src="photoData.photo_object.photo.url"
    ></v-img>
    <div class="collection-view-photo__captions">
      <p>
        <strong>{{ photoData.photo_object.title }}</strong>
        <br />
        <i>{{ photoData.photo_object.subtitle }}</i>
        <br />
        <span class="small-caption">{{
          photoData.photo_object.description
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["photoData"],

  data: () => ({
    maxHeight: 0,
    maxWidth: 0,
    mounted: false,
  }),

  methods: {
    refreshSize() {
      if (!this.mounted) return;
      this.maxHeight = this.$el.parentElement.clientHeight;
      const ratio =
        this.photoData.photo_object.photo.dimensions.width /
        this.photoData.photo_object.photo.dimensions.height;
      this.maxWidth = this.maxHeight * ratio;
    },
    handleResize(e) {
      this.refreshSize();
    },
    addEventListeners() {
      window.addEventListener("resize", this.handleResize);
    },
  },

  mounted() {
    this.mounted = true;
    this.refreshSize();
  },
};
</script>

<style lang="sass" scoped>
pre
  font-size: 10px

.collection-view-photo
  display: flex
  flex-direction: row
  &__captions
    margin: 0 15rem 0 1rem
    width: 12rem
    height: 100%
    display: flex
    justify-content: space-space-between
    font-size: 0.875rem
    font-family: 'Monstserrat', sans-serif
    line-height: 1.5
    p
      margin-block-start: 1em
      margin-block-end: 1em
      margin-inline-start: 0px
      margin-inline-end: 0px
    .small-caption
      font-size: 0.75rem
</style>