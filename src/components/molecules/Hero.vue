<template>
  <header
    class="parent"
    v-if="hero"
    :style="{
      backgroundImage: ` url('${hero.hero_image_url ||
        api + hero.hero_banner.url}')`
    }"
  >
    <container class="wrapper">
      <h1 class="text title">{{ hero.hero_title }}</h1>
      <p class="text desc">{{ hero.hero_text }}</p>
      <router-link :to="hero.hero_route">
        <base-button class="btn--slide" size="lg">
          {{ hero.hero_btn_text }}
        </base-button>
      </router-link>
    </container>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  created() {
    this.$store.dispatch("fetchHeroData");
  },
  computed: {
    hero() {
      return this.$store.state.hero;
    },
    api() {
      return process.env.VUE_APP_API_URL;
    }
  }
});
</script>

<style lang="postcss" scoped>
.parent {
  @apply min-h-hero bg-cover bg-center flex flex-col justify-end;
}
.title {
  @apply text-5xl font-bold p-2;
  animation: slideIn 0.8s ease;
}

.desc {
  @apply text-2xl p-2;
  animation: slideIn 1.2s ease;
}

.btn--slide {
  animation: slideIn 1.6s ease;
}

.wrapper {
  @apply text-white md:pl-10 py-8 flex flex-col justify-end items-start gap-4;
  animation: fadeIn 1.4s ease;
}
</style>
<style lang="scss" scoped>
.text {
  background-color: rgba(0, 0, 0, 0.65);
  max-width: 60ch;
}
</style>
