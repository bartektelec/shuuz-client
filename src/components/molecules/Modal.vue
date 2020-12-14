<template>
  <div @click.self="$store.commit('setModal', null)" class="overlay">
    <div class="flex flex-col items-center gap-2 fixed top-0">
      <toastie
        v-for="(item, idx) in $store.state.toasts"
        :toastId="idx"
        :key="item"
        :icon="item.icon"
        :error="item.type === 'error'"
        >{{ item.message }}</toastie
      >
    </div>
    <div class="modal">
      <button @click="$store.commit('setModal', null)" class="modal__close">
        <icon name="close-outline" /><span class="sr-only">Close modal</span>
      </button>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(4px) grayscale(60%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: fadeIn 0.2s ease;
}

.modal {
  position: relative;
  background-color: #fff;
  max-width: 60ch;
  width: 100%;
  cursor: default;
}

.modal__close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  &:hover {
    opacity: 0.75;
  }
}
</style>

<style lang="postcss" scoped>
.modal {
  @apply shadow-xl p-8 sm:px-16;
}
</style>
