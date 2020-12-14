<template>
  <container>
    <h1 class="text-4xl my-8 font-medium">Product details</h1>
    <div class="flex flex-wrap gap-16">
      <form class="form order-1" @submit.prevent="handleSubmit">
        <base-input
          fullWidth
          label="Title"
          :error="errors.includes('title')"
          v-model="formData.title"
          id="product-title"
        />
        <base-input
          fullWidth
          label="Brand"
          :error="errors.includes('brand')"
          v-model="formData.brand"
          id="product-brand"
        />
        <base-input
          fullWidth
          :error="errors.includes('category')"
          label="Category"
          v-model="formData.category"
          id="product-category"
        />
        <base-input
          fullWidth
          :error="errors.includes('rating')"
          type="number"
          max="5"
          min="0"
          label="Rating"
          v-model="formData.rating"
          id="product-rating"
        />
        <base-input
          fullWidth
          type="number"
          :error="errors.includes('price')"
          label="Price"
          v-model="formData.price"
          id="product-price"
        />
        <div
          class="textarea"
          :class="{
            'textarea--error': errors.includes('description')
          }"
        >
          <label class="textarea__label" for="form-description"
            >Description
          </label>
          <textarea
            class="textarea__field"
            id="form-description"
            v-model="formData.description"
          ></textarea>
        </div>
        <label
          ><input
            class="checkbox"
            v-model="formData.featured"
            type="checkbox"
          />Featured</label
        ><base-input
          fullWidth
          type="string"
          :error="errors.includes('image_url')"
          label="Image URL"
          v-model="formData.image_url"
          id="product-imgurl"
        />
        <base-button disabled>Upload picture</base-button>
        <base-button>Save product</base-button>
      </form>
      <div class="preview order-0 md:order-2">
        <h2>Preview</h2>
        <div class="border p-4">
          <product-card hideFavIcon :data="previewData"></product-card>
        </div>
      </div>
    </div>
  </container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ProductCard from "@/components/molecules/ProductCard.vue";

export default defineComponent({
  components: {
    ProductCard
  },
  setup() {
    const errors = ref<string[]>([]);
    const route = useRoute();
    const store = useStore();
    const routeId = computed(() => route.params.id);
    const formData = reactive({
      description: "",
      title: "",
      brand: "",
      rating: 0,
      category: "",
      price: 0,
      featured: false,
      image_url: "/uploads/photo_1491553895911_0055eca6402d_eaf84a6eb4.jpeg"
    });

    function setInitialValues() {
      if (!route.params.id) return;
      const initialValues = route.params.id
        ? store.getters.getProductById(route.params.id)
        : null;
      if (!initialValues) return;
      formData.description = initialValues.description;
      formData.title = initialValues.title;
      formData.brand = initialValues.brand;
      formData.rating = initialValues.rating;
      formData.category = initialValues.category;
      formData.price = initialValues.price;
      formData.featured = initialValues.featured;
      formData.image_url = initialValues.image_url || initialValues.image.url;
    }
    setInitialValues();
    watch(routeId, val => {
      setInitialValues();
    });
    return {
      formData,
      errors
    };
  },
  methods: {
    validateForm() {
      this.errors = [];
      if (!this.formData.title.length) this.errors.push("title");

      if (!this.formData.brand.length) this.errors.push("brand");

      if (this.formData.rating < 0 || this.formData.rating > 5)
        this.errors.push("rating");

      if (!this.formData.description.length) this.errors.push("description");

      if (!this.formData.category.length) this.errors.push("category");

      if (this.formData.price <= 0) this.errors.push("price");

      if (this.errors.length) return false;
      return true;
    },
    handleSubmit() {
      // validate
      if (!this.validateForm()) return;
      const payload = { ...this.formData };
      if (this.$route.params.id)
        return this.$store.dispatch("updateProduct", {
          ...this.formData,
          id: this.$route.params.id
        });

      this.$store.dispatch("addProduct", payload);
    }
  },
  computed: {
    previewData(): {
      [key: string]: any;
    } {
      const obj = {
        title: this.formData.title,
        brand: this.formData.brand,
        price: this.formData.price,
        image_url: this.formData.image_url,
        image: { formats: { thumbnail: { url: this.formData.image_url } } }
      };
      return obj;
    }
  }
});
</script>

<style lang="postcss" scoped>
.checkbox {
  @apply mr-4;
}

.form {
  @apply flex flex-col gap-4;
  flex-basis: 200px;
  flex-grow: 2;
}

.preview {
  flex-basis: 10rem;
  flex-grow: 1;
}
.textarea {
  @apply mt-1;
  position: relative;
  display: inline-block;
}
.textarea__field {
  @apply rounded border-2 border-light p-2 pl-4 w-full;
  height: 10rem;
}

.textarea--error .textarea__label {
  @apply text-red-400;
}
.textarea--error .textarea__field {
  @apply border-red-300 focus:border-red-300;
}

.textarea__field:focus {
  outline: none;
  @apply border-primary;
}

.textarea__label {
  @apply text-xs font-medium absolute left-2 -top-2 px-2 bg-white;
}
</style>
