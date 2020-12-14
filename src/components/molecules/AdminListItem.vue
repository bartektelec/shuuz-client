<template>
  <alert class="my-2 flex-wrap" variant="light">
    <div class="wrapper">
      <p class="font-medium">Item title</p>
      <div class="flex gap-2">
        <base-button
          @click="isOpen = !isOpen"
          icon="edit-outline"
          variant="light"
        >
          <span class="sr-only">Edit product</span></base-button
        >
        <base-button icon="trash-2-outline" variant="light">
          <span class="sr-only">Delete product</span>
        </base-button>
      </div>
    </div>
    <div v-if="isOpen" class="w-full">
      Edit product
      {{ item }}
    </div>
  </alert>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

interface Product {
  title: string;
  image: string;
}

export default defineComponent({
  props: {
    item: String,
    product: {
      type: Object as PropType<Product>
    }
  },
  setup() {
    const isOpen = ref(false);
    return {
      isOpen
    };
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  width: 100%;
}
</style>
