<template>
  <photo-aggregate
    aggregate-id="home_aggregate"
    :horizontal="$vuetify.breakpoint.mdAndUp"
  ></photo-aggregate>
</template>

<script>
import PhotoAggregate from "../components/photos/PhotoAggregate.vue";

export default {
  name: "Home",

  components: { PhotoAggregate },
};
</script>
