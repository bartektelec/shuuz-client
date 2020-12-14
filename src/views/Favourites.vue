<template>
  <container>
    <h1 class="text-4xl font-medium my-8">My favourites</h1>
    <p class="my-8" v-if="$store.getters.getAllFavourites.length">
      {{ $store.getters.getAllFavourites.length }} products added to favourites.
    </p>
    <div
      v-if="$store.getters.getAllFavourites.length"
      class="flex gap-4 flex-wrap pb-16"
    >
      <product-card
        v-for="favItem in $store.getters.getAllFavourites"
        :key="'favourite-' + favItem.id"
        :data="favItem"
      />
    </div>
    <div v-else class="flex flex-col gap-4 pb-16">
      <p>
        Favourites list is empty, add products to favourites by clicking on the
        heart icon.
      </p>
      <router-link
        class="text-primary font-medium hover:text-primary-dark"
        to="/"
        >Go back</router-link
      >
    </div>
  </container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductCard from "@/components/molecules/ProductCard.vue";

export default defineComponent({
  components: { ProductCard },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.grid {
}
</style>
