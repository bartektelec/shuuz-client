<template>
  <div
    :class="{
      select: true,
      'select--light': light,
      'select--success': success,
      'select--error': error
    }"
  >
    <label class="select__label" :for="$attrs.id">
      {{ label }}
    </label>
    <select
      @input="handleChange"
      :value="modelValue"
      v-bind="$attrs"
      class="select__field"
      :class="{ 'w-full': fullWidth }"
    >
      <option
        class="select__option"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        >{{ option.name }}</option
      >
    </select>
    <p v-if="info" class="select__info">{{ info }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    info: String,
    error: Boolean,
    success: Boolean,
    fullWidth: Boolean,
    light: Boolean,
    options: Object,
    modelValue: String
  },
  emits: ["update:modelValue"],
  methods: {
    handleChange(event: Event) {
      if (!(event.target instanceof HTMLSelectElement)) return;
      this.$emit("update:modelValue", event.target.value);
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="postcss" scoped>
.select {
  @apply mt-1;
  position: relative;
  display: inline-block;
}

.select--light .select__field {
  @apply bg-transparent border-light-light focus:border-secondary;
}

.select--light .select__option {
  @apply bg-background-dark;
}

.select--light .select__info,
.select--light .select__label {
  @apply text-light-light bg-background-dark;
}

.select--success .select__info,
.select--success .select__label {
  @apply text-green-500;
}

.select--success .select__field {
  @apply border-green-500;
}

.select--error .select__info,
.select--error .select__label {
  @apply text-red-400;
}
.select--error .select__field {
  @apply border-red-300;
}

.select__info {
  @apply text-xs m-1;
}

.select__field {
  @apply rounded border-2 border-light p-2 pl-4;
}

.select__field:focus {
  outline: none;
  @apply border-primary;
}

.select__label {
  @apply text-xs font-medium absolute left-2 -top-2 px-2 bg-white;
}
</style>
