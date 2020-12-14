<template>
  <big-button> <slot /> <icon name="arrow-forward" fill="dark" /> </big-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BigButton from "@/components/atoms/BigButton.vue";
import Icon from "@/components/atoms/Icon.vue";

export default defineComponent({
  components: { BigButton, Icon },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
