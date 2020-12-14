<template>
  <div class="item">
    <div
      class="item__img"
      :style="{
        backgroundImage: `url(${itemData.image_url ||
          api + itemData.image.url})`
      }"
      :alt="itemData.title"
    >
      <span class="sr-only"
        >Picture of {{ itemData.brand }} {{ itemData.title }}</span
      >
    </div>
    <router-link :to="`/product/${itemData.id}`">
      <div class="item__content">
        <h2 class="text-lg">{{ itemData.title }}</h2>
        <h3>{{ itemData.brand }}</h3>
        <p class="font-price text-2xl mt-6">${{ itemData.price }}</p>
      </div>
    </router-link>
    <div class="item__controls">
      <button
        @click="$store.dispatch('addFavourite', itemData.id)"
        class="item__btn"
      >
        <icon :name="favourite ? 'heart' : 'heart-outline'" />
      </button>
      <button
        @click="$store.dispatch('removeFromCart', itemData.id)"
        class="item__btn--secondary"
      >
        <icon name="trash-2-outline" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: { itemId: Number },
  setup(props) {
    const store = useStore();
    const api = computed(() => process.env.VUE_APP_API_URL);
    const itemData = computed(() => store.getters.getProductById(props.itemId));
    const favourite = computed(() =>
      store.state.favourites.includes(itemData.value.id)
    );
    return { itemData, api, favourite };
  }
});
</script>

<style lang="postcss" scoped>
.item {
  @apply gap-4 my-8;
  display: grid;
  grid-template-columns: 4rem 1fr 1rem;
}

.item__content {
  @apply flex flex-col;
}

.item__controls {
  @apply flex flex-col justify-between;
}

.item__img {
  @apply h-16 w-16 bg-cover bg-center;
}

.item__btn {
  @apply hover:opacity-50;
}

.item__btn--secondary {
  @apply opacity-50 hover:opacity-100;
}
</style>
