<template>
  <router-link class="link">
    <div class="box"><slot></slot></div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="postcss" scoped>
.box {
  @apply bg-dark text-white p-8 flex content-center items-center rounded hover:bg-dark-light;
  height: 10rem;
  min-width: 10rem;
}

.link {
  height: 10rem;
}
</style>
