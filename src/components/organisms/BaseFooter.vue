<template>
  <footer class="wrapper">
    <container class="grid">
      <ul>
        <li class="column-title">Company</li>
        <li><router-link to="/about" class="link">About us</router-link></li>
        <li><router-link to="/about" class="link">Our team</router-link></li>
        <li><router-link to="/about" class="link">Career</router-link></li>
        <li><router-link to="/about" class="link">Media</router-link></li>
      </ul>
      <ul>
        <li class="column-title">Shopping</li>
        <li><router-link to="/about" class="link">Delivery</router-link></li>
        <li><router-link to="/about" class="link">Warranty</router-link></li>
        <li>
          <router-link to="/about" class="link">Privacy policy</router-link>
        </li>
        <li>
          <router-link to="/about" class="link">Customer support</router-link>
        </li>
      </ul>
    </container>
  </footer>
</template>

//
<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
import Container from "@/components/atoms/Container.vue";

export default defineComponent({
  components: { Container },
  setup() {
    const state = reactive({
      count: 0
    });

    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  justify-items: stretch;
  gap: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
</style>
<style lang="postcss" scoped>
.column-title {
  @apply font-bold text-light-dark mb-4;
}
.link {
  @apply text-primary-dark font-medium inline-block py-1 px-2 rounded hover:bg-primary-light;
}

.link.router-link-active {
  @apply bg-primary-light;
}
.wrapper {
  @apply bg-white py-8;
  box-shadow: 0px 4px 16px -6px rgba(0, 0, 0, 0.15);
}
</style>
