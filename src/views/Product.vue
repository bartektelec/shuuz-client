<template>
  <container>
    <p class="breadcrumbs">
      <router-link to="/products">Products</router-link> /
      <router-link class="breadcrumb" :to="`/products/${itemData.category}`">{{
        itemData.category
      }}</router-link>
    </p>
    <div class="details">
      <div
        class="details__gallery"
        :style="{
          backgroundImage: `url(${itemData.image_url ||
            api + itemData.image.url}`
        }"
      ></div>
      <div class="details__content">
        <div>
          <h1 class="content__title">{{ itemData.title }}</h1>
          <p class="content__brand">{{ itemData.brand }}</p>
          <span class="rating">
            <span class="sr-only">Rating: {{ itemData.rating }}</span>
            <div
              :style="{ width: `${(5 - itemData.rating) * 20}%` }"
              class="rating__overlay"
            ></div>
            <icon
              v-for="idx in Array.from({ length: 5 })"
              :key="`star-${idx}`"
              width="16"
              height="16"
              name="star"
              fill="primary"
            />
          </span>
          <p
            class="content__description"
            :class="{ 'content__description--extended': isDescriptionOpen }"
            @click="isDescriptionOpen = !isDescriptionOpen"
          >
            {{ itemData.description }}
          </p>
        </div>
        <div>
          <p class="content__price">${{ itemData.price }}</p>
          <div class="content__controls">
            <base-button
              size="lg"
              outline
              @click="$store.dispatch('addFavourite', itemData.id)"
            >
              <icon
                :name="favourite ? 'heart' : 'heart-outline'"
                fill="primary"
                outline
              />
              <span class="sr-only">Add to favourites</span>
            </base-button>
            <base-button
              @click="$store.dispatch('addToCart', itemData.id)"
              size="lg"
            >
              Add to cart
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </container>
  <div class="bg-background-light mt-10">
    <container>
      <product-grid
        title="Other products"
        :items="$store.getters.getAllProducts"
      ></product-grid>
    </container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import ProductGrid from "@/components/organisms/ProductGrid.vue";

export default defineComponent({
  components: { ProductGrid },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const isDescriptionOpen = ref(false);
    const api = computed(() => process.env.VUE_APP_API_URL);
    const itemData = computed(() =>
      store.getters.getProductById(route.params.id)
    );

    const favourite = computed(() =>
      store.state.favourites.includes(itemData.value.id)
    );
    if (!itemData.value) router.push("/error");
    return {
      isDescriptionOpen,
      itemData,
      favourite,
      api
    };
  }
});
</script>

<style lang="postcss" scoped>
.breadcrumbs {
  @apply my-8 text-xs text-light-dark font-medium;
}
.breadcrumbs a {
  @apply hover:text-dark;
}
.details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 3rem 6rem;
}

.breadcrumb {
  text-transform: capitalize;
}

.content__title {
  @apply text-2xl font-bold mb-2;
}

.content__brand {
  @apply text-2xl font-bold text-dark-lightest mb-4;
}

.content__description {
  @apply text-sm text-dark h-16 overflow-hidden cursor-pointer;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.content__description--extended {
  height: unset;
  display: block;
}

.content__price {
  @apply text-4xl font-bold my-8 font-price;
}

.details__gallery {
  @apply bg-dark bg-cover bg-center;
  min-height: 18rem;
}

.details__content {
  @apply flex flex-col justify-between;
  max-width: 50ch;
}
.content__controls {
  @apply flex gap-4;
}

.rating {
  @apply relative;
}

.rating__overlay {
  @apply absolute right-0 top-0 bottom-0;
  backdrop-filter: grayscale(100%) contrast(0.5) brightness(1.6);
}
</style>
