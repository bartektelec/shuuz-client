<template>
  <hero />
  <container>
    <product-grid title="Featured products" :items="items"> </product-grid>
  </container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "@/components/atoms/Container.vue";
import Hero from "@/components/molecules/Hero.vue";
import ProductGrid from "@/components/organisms/ProductGrid.vue";

export default defineComponent({
  name: "Home",
  computed: {
    items() {
      return this.$store.getters.getFeaturedProducts;
    }
  },
  components: {
    Hero,
    Container,
    ProductGrid
  }
});
</script>

<style lang="scss" scoped></style>
