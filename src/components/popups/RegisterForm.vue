<template>
  <form class="form" @submit.prevent="handleSubmit">
    <h1 class="text-4xl font-medium mb-4">Register</h1>
    <base-input
      fullWidth
      v-model="username"
      :error="errors.username"
      label="Username"
      id="register-username"
    />
    <base-input
      fullWidth
      v-model="email"
      :error="errors.email"
      label="E-mail"
      type="email"
      id="register-email"
    />
    <base-input
      fullWidth
      v-model="pw"
      :error="errors.pw"
      label="Password"
      type="password"
      id="register-pw"
    />
    <base-input
      fullWidth
      v-model="rpw"
      :error="errors.pw"
      label="Repeat password"
      type="password"
      id="register-rpw"
    />
    <label :class="{ 'text-red-500': errors.agreement }">
      <input
        id="register-agreement"
        v-model="agreement"
        class="mr-4"
        type="checkbox"
      />
      I agree to terms and conditions.</label
    >
    <base-button :disabled="isLoading" fullWidth>
      <spinner class="spinner-sm" v-if="isLoading" />
      <span v-else>
        Register
      </span>
    </base-button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, toRefs } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  setup() {
    const store = useStore();

    const formData = reactive({
      username: "",
      email: "",
      pw: "",
      rpw: "",
      agreement: false,
      errors: {
        username: false,
        email: false,
        pw: false,
        agreement: false
      }
    });
    const isLoading = ref(false);
    const resolved = computed(() => store.state.toasts.length);
    watch(resolved, val => {
      if (val) isLoading.value = false;
    });
    function resetErrors() {
      formData.errors.username = false;
      formData.errors.email = false;
      formData.errors.pw = false;
      formData.errors.agreement = false;
    }

    function validateForm() {
      resetErrors();
      const errors = [];

      // has user agreed?
      if (!formData.agreement) {
        errors.push("agreement");
      }
      // are passwords equal
      if (
        formData.pw.trim() !== formData.rpw.trim() ||
        formData.pw.trim().length < 5
      ) {
        errors.push("pw");
      }
      // is email valid
      const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
      if (!emailRegex.test(formData.email)) {
        errors.push("email");
      }
      // is username more than 4 letters
      if (formData.username.trim().length <= 4) {
        errors.push("username");
      }

      if (errors.length) {
        errors.forEach(field => {
          const index = field as keyof typeof formData.errors;
          formData.errors[index] = true;
        });

        return false;
      }

      return true;
    }

    function handleSubmit() {
      isLoading.value = true;
      const isValid = validateForm();
      if (!isValid) return;

      store.dispatch("register", {
        username: formData.username,
        password: formData.pw,
        email: formData.email
      });
    }
    return { ...toRefs(formData), handleSubmit, isLoading };
  }
});
</script>

<style lang="postcss" scoped>
.form {
  @apply flex flex-col gap-4;
}
</style>
