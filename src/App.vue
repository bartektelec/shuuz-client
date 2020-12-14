<template>
  <navigation :routes="routes" />
  <div class="toastie__wrapper">
    <toastie
      v-for="(item, idx) in $store.state.toasts"
      :toastId="idx"
      :key="item"
      :icon="item.icon"
      :error="item.type === 'error'"
      >{{ item.message }}</toastie
    >
  </div>
  <modal v-if="$store.state.modal">
    <register-form v-if="$store.state.modal === 'register'" />
    <login-form v-else-if="$store.state.modal === 'login'" />
  </modal>
  <main class="main mt-14">
    <router-view />
  </main>
  <base-footer />
</template>

<script lang="ts">
import navigation from "@/components/organisms/Navigation.vue";
import BaseFooter from "@/components/organisms/BaseFooter.vue";
import RegisterForm from "@/components/popups/RegisterForm.vue";
import LoginForm from "@/components/popups/LoginForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    navigation,
    BaseFooter,
    RegisterForm,
    LoginForm
  },
  data() {
    return {
      routes: [
        { path: "/", name: "Home" },
        { path: "/products", name: "Products" }
      ]
    };
  },

  methods: {},

  created() {
    this.$store.dispatch("onInit");
  }
});
</script>

<style lang="scss">
*,
*::after,
*::before {
  box-sizing: border-box;
}

:root {
  font-family: "Raleway", "sans-serif";
  color: #333333;
}

*::selection {
  background-color: #f5ab3d;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-4rem);
  }

  to {
    transform: none;
  }
}
</style>

<style lang="postcss" scoped>
.toastie__wrapper {
  @apply inline-flex flex-col gap-2 justify-center items-center fixed top-16 mx-auto;
  z-index: 10;
  left: calc(50% - 20ch);
  width: 40ch;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
