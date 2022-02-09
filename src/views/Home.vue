<template>
  <v-container>
    <photo-aggregate aggregate-id="home_aggregate"></photo-aggregate>
  </v-container>
</template>

<script>
import PhotoAggregate from "../components/photos/PhotoAggregate.vue";

export default {
  name: "Home",

  components: { PhotoAggregate },
};
</script>
