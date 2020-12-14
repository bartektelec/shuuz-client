<template>
  <div
    :class="{
      input: true,
      'input--light': light,
      'input--success': success,
      'input--error': error
    }"
  >
    <label :for="id" class="input__label">
      {{ label }}
    </label>
    <input
      @input="handleChange"
      :value="modelValue"
      :id="id"
      class="input__field"
      :class="{ 'w-full': fullWidth }"
      v-bind="$attrs"
    />
    <p v-if="info" class="input__info">
      {{ info }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";

export default defineComponent({
  // inheritAttrs: false,
  props: {
    label: String,
    id: String,
    info: String,
    error: Boolean,
    success: Boolean,
    fullWidth: Boolean,
    light: Boolean,
    modelValue: String as PropType<string | number>
  },
  methods: {
    handleChange(event: Event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      this.$emit("update:modelValue", event.target.value);
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="postcss" scoped>
.input {
  @apply mt-1;
  position: relative;
  display: inline-block;
}

.input--light .input__field {
  @apply bg-transparent border-light-light focus:border-secondary;
}

.input--light .input__info,
.input--light .input__label {
  @apply text-light-light bg-background-dark;
}

.input--success .input__info,
.input--success .input__label {
  @apply text-green-500;
}

.input--success .input__field {
  @apply border-green-500;
}

.input--error .input__info,
.input--error .input__label {
  @apply text-red-400;
}
.input--error .input__field {
  @apply border-red-300;
}

.input__info {
  @apply text-xs m-1;
}

.input__field {
  @apply rounded border-2 border-light p-2 pl-4;
}

.input__field:focus {
  outline: none;
  @apply border-primary;
}

.input__label {
  @apply text-xs font-medium absolute left-2 -top-2 px-2 bg-white;
}
</style>
