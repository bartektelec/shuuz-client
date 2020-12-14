<template>
  <header
    class="z-50 fixed w-full bg-background-dark text-light py-3 px-4 flex justify-center"
  >
    <container class="flex items-center justify-between relative">
      <router-link
        @click.capture="isNavOpen = false"
        class="link brand mr-8 text-white"
        to="/"
        >Shuuz</router-link
      >
      <nav
        class="nav"
        @click.capture="isNavOpen = false"
        :class="{ 'nav-open': isNavOpen }"
      >
        <router-link
          class="link"
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
        >
          {{ route.name }}
        </router-link>
        <router-link class="md:hidden" to="/cart">
          Shopping cart
        </router-link>
        <div class="separator md:hidden"></div>
        <user-popup
          :isProfileOpen="isProfileOpen"
          @closeprofile="isProfileOpen = !isProfileOpen"
        />
      </nav>
      <div class="nav-right">
        <button
          @click="isProfileOpen = !isProfileOpen"
          class="icon-button md:flex hidden"
        >
          <Icon name="person-outline" fill="dark" />
          <span class="sr-only">User profile</span>
        </button>
        <router-link to="/cart">
          <base-button
            class="md:flex hidden"
            variant="secondary"
            icon="shopping-cart-outline"
            iconWhite
          >
            <span class="sr-only">Shopping cart</span>
          </base-button>
        </router-link>
        <base-button
          @click="triggerMenu"
          class="flex md:hidden"
          variant="secondary"
          icon="menu"
          iconWhite
        >
          <span class="sr-only">Menu</span>
        </base-button>
      </div>
    </container>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue";
import { useStore } from "vuex";
import UserPopup from "@/components/popups/UserPopup.vue";

export default defineComponent({
  components: { UserPopup },
  name: "Navigation",
  methods: {
    triggerMenu() {
      this.isNavOpen = !this.isNavOpen;
    }
  },

  data() {
    return {
      isNavOpen: false,
      isProfileOpen: false,
      isUserAdmin: false
    };
  },
  setup(props) {
    const store = useStore();
    return {};
  },
  props: {
    routes: Array
  }
});
</script>

<style lang="postcss" scoped>
.separator {
  @apply w-2/3 border-b-2 border-light-dark;
}

.nav-right {
  @apply inline-flex items-center gap-4;
}

.icon-button {
  @apply items-center justify-center opacity-75 hover:opacity-100;
}

.nav {
  @apply fixed block top-14 md:top-0 w-full gap-4 bg-background-dark left-0 flex-col;
  @apply flex items-center text-2xl gap-8 py-8;
  @apply md:flex md:relative md:flex-row md:p-0 md:text-base transform-gpu translate-y-hide md:transform-none;
  @apply opacity-0 md:opacity-100;
  z-index: 100;
  transition: transform 0.1s ease, opacity 0.3s ease;
}

.nav-open {
  @apply opacity-100 transform-none;
}

.cart-list {
}

.brand {
  @apply font-logo text-2xl;
}

.link {
  @apply font-medium hover:text-light-light;
}
.router-link-active {
  @apply text-white hover:text-light-light;
}
</style>
