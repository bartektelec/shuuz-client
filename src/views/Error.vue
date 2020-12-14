<template>
  <container>
    <h1 class="text-4xl my-8 font-medium">Error occured</h1>
    <p class="my-4">Something went wrong. This page doesn't exist.</p>
    <router-link class="link" to="/">Go back to Home page</router-link>
  </container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="postcss" scoped>
.link {
  @apply text-primary;
}
</style>
