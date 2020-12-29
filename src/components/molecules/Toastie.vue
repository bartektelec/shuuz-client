<template>
  <alert
    v-show="show"
    class="toastie__alert"
    :icon="icon ? icon : error ? 'alert-circle-outline' : 'checkmark-outline'"
    :variant="error ? 'error' : 'primary'"
    ><slot />
    <div class="toastie__bar"></div>
    <button @click="killSelf" class="toastie__close">
      <icon
        name="close-outline"
        outline
        :fill="error ? 'error' : 'primary'"
      /><span class="sr-only">Close message</span>
    </button>
  </alert>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    error: {
      type: Boolean as PropType<boolean>,
    },
    icon: {
      type: String as PropType<string>,
    },
    toastId: {
      type: Number,
    },
  },

  data() {
    return {
      show: true,
      counter: setTimeout('', 0),
    };
  },

  methods: {
    killSelf() {
      clearTimeout(this.counter);
      this.$store.commit('removeToast', this.toastId);
      this.show = false;
    },
  },

  beforeMount() {
    this.counter = setTimeout(this.killSelf, 5000);
  },

  beforeUnmount() {
    clearTimeout(this.counter);
  },
  setup() {
    return {};
  },
});
</script>

<style lang="postcss" scoped>
.toastie__alert {
  @apply inline-flex shadow-sm relative;
  animation: dropDown 5s cubic-bezier(0.18, 0.89, 0.32, 1.27);
}

.toastie__bar {
  @apply absolute left-0 bottom-0 right-0;
  height: 4px;
  backdrop-filter: brightness(80%);
  transform-origin: left center;
  animation: preloader 4.8s linear;
}

.toastie__close {
  @apply flex items-center ml-4 hover:opacity-75;
}

@keyframes preloader {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@keyframes dropDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    transform: translateY(0);
    opacity: 1;
  }

  90% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
