<template>
  <container>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4 items-start">
      <h1 class="text-4xl my-8 font-medium">General site settings</h1>
      <base-input
        id="settings-hero-title"
        v-model="formData.heroTitle"
        placeholder="New shoe"
        label="Hero banner title"
      />
      <base-input
        id="settings-hero-text"
        v-model="formData.heroText"
        placeholder="Check this out"
        label="Hero banner text"
      />
      <base-input
        id="settings-hero-btn-text"
        v-model="formData.heroBtnText"
        placeholder="Click here"
        label="CTA button text"
      />
      <base-input
        id="settings-hero-btn-route"
        v-model="formData.heroRoute"
        placeholder="/product/2"
        label="CTA button link"
      />
      <base-input
        id="settings-hero-img"
        v-model="formData.heroImageUrl"
        placeholder="http://"
        label="Hero image URL"
      />
      <base-button>Save settings</base-button>
    </form>
  </container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      formData: {
        heroTitle: this.$store.state.hero?.hero_title,
        heroText: this.$store.state.hero?.hero_text,
        heroRoute: this.$store.state.hero?.hero_route,
        heroBtnText: this.$store.state.hero?.hero_btn_text,
        heroBanner: this.$store.state.hero?.hero_banner.url,
        heroImageUrl: this.$store.state.hero?.hero_image_url
      }
    };
  },
  methods: {
    submitForm() {
      const payload = {
        hero_title: this.formData.heroTitle,
        hero_text: this.formData.heroText,
        hero_route: this.formData.heroRoute,
        hero_btn_text: this.formData.heroBtnText,
        hero_banner: {
          url: this.formData.heroBanner
        },
        hero_image_url: this.formData.heroImageUrl
      };
      this.$store.dispatch("setHeroData", payload);
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
