<template>
  <button
    :class="[
      fullWidth ? `btn--full` : '',
      size ? `btn--${size}` : 'btn--md',
      variant ? `btn--${variant}` : 'btn--primary',
      outline ? 'btn--outline' : ''
    ]"
    class="btn flex rounded font-medium hover:shadow-md focus:ring-2"
  >
    <Icon
      v-show="icon"
      :name="icon"
      width="18"
      height="18"
      :fill="iconWhite ? 'dark' : variant || 'dark'"
      :outline="outline"
    />
    <slot />
  </button>
</template>

<script lang="ts">
import Icon from "@/components/atoms/Icon.vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    variant: String,
    size: String,
    fullWidth: Boolean,
    outline: Boolean,
    icon: String,
    iconWhite: Boolean
  }
});
</script>

<style lang="scss" scoped>
.btn {
  gap: 1rem;
  align-items: center;
  justify-content: center;
  transition: background 0.4s ease, border 0.4s ease, filter 0.2s ease;
  &:focus {
    outline: none;
  }
  &:active {
    filter: brightness(1.1) contrast(0.9);
  }
}
</style>

<style lang="postcss" scoped>
.btn {
  @apply border-2;
}

.btn:disabled {
  @apply cursor-not-allowed bg-dark-light border-dark hover:bg-dark-light hover:border-dark text-white;
}
.btn--primary {
  @apply bg-primary border-primary text-white hover:bg-primary-dark hover:border-primary-dark focus:ring-primary-dark;
}

.btn--secondary {
  @apply bg-secondary border-secondary text-white hover:bg-secondary-dark hover:border-secondary-dark focus:ring-secondary-dark;
}

.btn--light {
  @apply bg-white border-white text-dark hover:bg-light-light hover:border-light-light focus:ring-light;
}
.btn--error {
  @apply bg-red-600 border-red-600 text-white hover:bg-red-800 hover:border-red-800 focus:ring-light;
}

.btn--dark {
  @apply bg-dark border-dark text-white hover:bg-dark-light hover:border-dark-light focus:ring-dark-light;
}

.btn--outline {
  @apply bg-transparent border-2;
}

.btn--outline.btn--primary {
  @apply hover:bg-primary-light text-primary-dark border-primary-dark;
}

.btn--outline.btn--secondary {
  @apply hover:bg-secondary-light text-secondary border-secondary hover:text-secondary-dark hover:border-secondary-dark;
}
.btn--outline.btn--light {
  @apply hover:bg-background-light hover:text-dark text-background-light border-background-light;
}

.btn--md {
  @apply px-4 py-2;
}

.btn--lg {
  @apply px-6 py-3;
}

.btn--full {
  @apply w-full;
}
</style>
