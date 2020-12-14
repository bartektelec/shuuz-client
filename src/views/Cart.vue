<template>
  <div class="cart">
    <div class="cart__left">
      <div class="cart__content">
        <h1 class="text-4xl my-8 font-medium">Shopping cart</h1>
        <p>{{ $store.state.cart.length || "No" }} products in cart.</p>
        <CartItem
          v-for="item in $store.state.cart"
          :key="`cartitem-${item.id}`"
          :itemId="item.id"
        />
      </div>
    </div>
    <div class="cart__right">
      <div class="cart__content">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between">
            <p>Products in cart</p>
            <p class="font-price">${{ totalProducts.toFixed(2) }}</p>
          </div>
          <div class="flex justify-between">
            <p>Shipping</p>
            <p class="font-price">${{ shippingPrice.toFixed(2) }}</p>
          </div>
          <div class="separator"></div>
          <div class="flex justify-between">
            <p class="text-2xl">Total</p>
            <p class="font-price text-2xl">${{ totalPrice.toFixed(2) }}</p>
          </div>
          <base-button v-if="totalProducts > 0" size="lg" fullWidth
            >Proceed to checkout</base-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import CartItem from "@/components/molecules/CartItem.vue";

export default defineComponent({
  components: { CartItem },
  setup() {
    const store = useStore();
    const shippingPrice = ref<number>(99);
    const totalProducts = computed(() =>
      store.state.cart.reduce((acc, curr) => {
        const { price } = store.getters.getProductById(curr.id);
        return acc + price;
      }, 0)
    );
    const totalPrice = computed(
      () => totalProducts.value + shippingPrice.value
    );

    return { totalProducts, shippingPrice, totalPrice };
  }
});
</script>

<style lang="postcss" scoped>
.cart {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  row-gap: 3rem;
}

.cart__right {
  @apply bg-background-light min-h-summary;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart__right .cart__content {
  @apply md:flex md:justify-center;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.cart__content > * {
  width: 100%;
  max-width: 25rem;
}

.separator {
  @apply border-b-2;
}

.cart__left .cart__content {
  @apply justify-center md:justify-start;
}
</style>
<style lang="scss" scoped>
.cart__content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  width: 100%;

  @media (min-width: 640px) {
    max-width: calc(640px / 2);
  }

  @media (min-width: 768px) {
    max-width: calc(768px / 2);
  }

  @media (min-width: 1024px) {
    max-width: calc(1024px / 2);
  }

  @media (min-width: 1280px) {
    max-width: calc(1280px / 2);
  }
}

.cart__left > * {
  margin-left: auto;
}

.cart__right > * {
  margin-right: auto;
}
</style>
