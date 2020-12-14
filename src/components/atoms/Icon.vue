<template>
  <i class="eva-hover">
    <!-- eslint-disable vue/no-v-html -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      :fill="fill ? colors[fill] : colors.dark"
      class="eva eva-animation"
      :class="`eva-icon-hover-${animation}`"
      @click="$emit('click')"
      v-html="icon"
    />
  </i>
</template>

<script>
import * as eva from "eva-icons/eva";
import { defineComponent } from "vue";
export default defineComponent({
  name: "EvaIcon",
  data() {
    return {
      colors: {
        primary: "#1451B8",
        secondary: "#C2620A",
        error: "#991B1B",
        light: "#555555",
        dark: "#ffffff"
      }
    };
  },
  props: {
    outline: {
      type: Boolean
    },
    name: {
      type: String,
      default: undefined
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    animation: {
      type: String,
      default: undefined
    },
    fill: {
      type: String,
      default: "inherit"
    }
  },
  computed: {
    icon() {
      if (!this.name) return;
      if (eva.icons[this.name]) {
        return eva.icons[this.name].contents;
      } else {
        console.error("Name of icon is not correct");
        return undefined;
      }
    }
  }
});
</script>
