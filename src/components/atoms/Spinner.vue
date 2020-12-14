<template>
  <div class="spinner" :class="{ 'spinner--light': white }">
    <p class="sr-only">Loading content...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { white: Boolean },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 3px solid #cccccc;
  border-top-color: #333333;
  animation: spinning 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
}

.spinner--sm {
  width: 1rem;
  height: 1rem;
}

.spinner--light {
  border-color: #aaaaaa;
  border-top-color: #eeeeee;
}

@keyframes spinning {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}
</style>
