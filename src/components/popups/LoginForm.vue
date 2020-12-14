<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h1 class="text-4xl font-medium mb-4">Login</h1>
    <base-input
      fullWidth
      label="Username"
      v-model="login"
      id="register-username"
    />
    <base-input
      fullWidth
      label="Password"
      v-model="password"
      type="password"
      id="register-pw"
    />
    <base-button :disabled="isLoading" fullWidth>
      <spinner class="spinner-sm" v-if="isLoading" />
      <span v-else>
        Log in
      </span>
    </base-button>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  data() {
    return {
      login: "",
      password: ""
    };
  },
  setup(props) {
    const store = useStore();
    const isLoading = ref(false);
    const resolved = computed(() => store.state.toasts.length);
    watch(resolved, val => {
      if (val) isLoading.value = false;
    });
    return {
      isLoading
    };
  },
  methods: {
    handleSubmit() {
      this.$store.dispatch("authorize", {
        identifier: this.login.trim(),
        password: this.password.trim()
      });
      this.isLoading = true;
    }
  }
});
</script>

<style lang="postcss" scoped>
.form {
  @apply flex flex-col gap-4;
}
</style>
