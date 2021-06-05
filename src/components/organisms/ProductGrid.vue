<template>
  <h1 class="text-xl py-8 ">{{ title }}</h1>
  <main v-if="items.length" class="product-grid">
    <product-card
      :editable="editable"
      v-for="item in items"
      :key="item.id + item.title"
      image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc.static-nike.com%2Fa%2Fimages%2Ft_PDP_1280_v1%2Ff_auto%2Fa8cbfzvkkvhrfv9pr23y%2Fair-max-270-shoe-2V5C4p.jpg&f=1&nofb=1"
      :data="item"
      :isFavourite="false"
    />
    <more-button v-if="!editable" @click="$emit('more')" :to="btnHref">{{
      btnText
    }}</more-button>
  </main>
  <main v-else class="flex justify-center p-8">
    <spinner />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MoreButton from "@/components/molecules/MoreButton.vue";
import ProductCard from "@/components/molecules/ProductCard.vue";

export default defineComponent({
  components: { MoreButton, ProductCard },
  props: {
    editable: Boolean,
    items: Array,
    title: String,
    moreHref: String,
    moreText: String
  },
  setup(props) {
    const btnText = ref(props.moreText || "View more products");
    const btnHref = ref(props.moreHref || "/products");
    return {
      btnText,
      btnHref
    };
  }
});
</script>

<style lang="scss" scoped>
.product-grid {
  padding-bottom: 7rem;
  display: grid;
  justify-items: stretch;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
</style>
