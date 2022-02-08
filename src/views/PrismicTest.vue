<template>
  <v-container>
    <prismic-tester />
  </v-container>
</template>

<script>
import PhotoAggregate from "../components/photos/PhotoAggregate.vue";
import PrismicTester from "../components/tester/PrismicTester.vue";

export default {
  name: "Home",

  components: { PhotoAggregate, PrismicTester },
};
</script>
