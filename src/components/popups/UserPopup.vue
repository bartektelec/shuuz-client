<template>
  <div
    class="profile"
    :class="{
      'profile--open': isProfileOpen
    }"
  >
    <div
      v-if="!$store.getters.getJWT"
      @click.capture="$emit('closeprofile')"
      class="flex flex-col gap-4"
    >
      <base-button
        @click="$store.commit('setModal', 'login')"
        fullWidth
        variant="secondary"
        >Log in</base-button
      >
      <p>Don't have an account yet?</p>
      <base-button
        @click="$store.commit('setModal', 'register')"
        fullWidth
        variant="secondary"
        outline
        >Register</base-button
      >
    </div>
    <div
      v-else
      class="flex flex-col gap-4"
      @click.capture="$emit('closeprofile')"
    >
      <router-link v-if="isUserAdmin" to="/dashboard"
        ><base-button fullWidth variant="secondary"
          >Admin dashboard
        </base-button></router-link
      >
      <router-link to="/favourites">
        <base-button fullWidth variant="secondary" outline
          >My favourites
        </base-button>
      </router-link>
      <base-button
        @click="$store.dispatch('logout')"
        fullWidth
        variant="secondary"
        outline
        >Log out
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { User } from "@/model/State.ts";

export default defineComponent({
  props: { isProfileOpen: { type: Boolean } },

  setup() {
    const store = useStore();
    const isUserAdmin = ref(false);
    const jwtKey = computed(() => store.state.jwt);
    function getUserRole() {
      isUserAdmin.value = false;
      store.getters.getMe.then((result: User) => {
        if (!result) return;
        const roleId = result.role.id;
        if (roleId === 1) {
          isUserAdmin.value = true;
        }
      });
    }
    getUserRole();
    watch(jwtKey, () => {
      getUserRole();
    });
    return { isUserAdmin };
  }
});
</script>

<style lang="postcss" scoped>
.profile {
  @apply flex flex-col gap-4 items-center;
  @apply md:absolute md:top-8 md:right-0 md:bg-background-dark;
  @apply md:py-8 md:px-6;
  @apply md:transform md:translate-y-hide md:opacity-0;
  right: 0%;
  transition: opacity 0.3s ease;
}

.profile--open {
  @apply md:translate-x-24 md:translate-y-0 md:opacity-100;
}
</style>
