<template>
  <div
    :class="[
      variant ? `alert--${variant}` : 'alert--primary',
      outline ? 'alert--outline' : ''
    ]"
    class="alert flex py-3 px-4 rounded font-medium"
  >
    <Icon v-if="icon" :name="icon" width="18" height="18" :fill="variant" />
    <slot />
  </div>
</template>

<script lang="ts">
import Icon from "@/components/atoms/Icon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Icon
  },
  data() {
    return {};
  },

  props: { variant: String, icon: String, outline: Boolean }
});
</script>

<style lang="scss" scoped>
.alert {
  gap: 1rem;
  align-items: center;
}
</style>
<style lang="postcss" scoped>
.alert--primary {
  @apply bg-primary-light text-primary-darker;
}
.alert--secondary {
  @apply bg-secondary-light text-secondary-dark;
}
.alert--error {
  @apply bg-red-200 text-red-800;
}
.alert--light {
  @apply bg-background-light  border-light;
}
.alert--dark {
  @apply bg-dark text-white;
}

.alert--outline {
  @apply bg-transparent border-2;
}

.alert--outline.alert--primary {
  @apply hover:bg-primary-light text-primary-dark border-primary-dark;
}

.alert--outline.alert--secondary {
  @apply hover:bg-secondary-light text-secondary-dark border-secondary-dark;
}
.alert--outline.alert--light {
  @apply hover:bg-background-light hover:text-dark text-background-light border-background-light;
}
</style>
