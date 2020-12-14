<template>
  <container>
    <h1 class="text-4xl my-8 font-medium">Products</h1>
    <p class="my-4 italic text-sm" v-if="results.length !== items.length">
      Found {{ results.length }} products matching the filters of
      {{ items.length }}
    </p>
    <form @submit.prevent="applyFilters">
      <div v-if="$store.state.products.length" class="search">
        <div class="flex items-baseline gap-4 flex-1">
          <base-input
            id="search-bar"
            label="Type to search"
            v-model="query"
            :placeholder="'e.g. ' + $store.getters.getRandomProductName"
            type="search"
            class="flex-1"
            fullWidth
          />
          <base-button class="inline-flex">Search</base-button>
        </div>
        <base-button
          @click="filterOpen = !filterOpen"
          outline
          variant="primary"
          icon="funnel-outline"
        >
          <span class="sr-only">Filter results</span>
        </base-button>
      </div>
      <div
        v-show="filterOpen"
        class="bg-background-dark text-white p-4 my-4 rounded"
      >
        <div class="filter">
          <base-input
            light
            label="Category"
            v-model="category"
            id="filter-category"
            type="search"
            placeholder="Shoes"
            fullWidth
          />
          <base-input
            light
            label="Min. price"
            v-model="minprice"
            id="filter-minprice"
            type="number"
            placeholder="1"
            fullWidth
          />
          <base-input
            light
            label="Max. price"
            v-model="maxprice"
            id="filter-maxprice"
            type="number"
            placeholder="19"
            fullWidth
          />
          <base-select
            light
            label="Sort by"
            v-model="sort"
            id="filter-sort-field"
            fullWidth
            :options="[
              { value: 'nameAsc', name: 'Name A-Z' },
              { value: 'nameDec', name: 'Name Z-A' },
              { value: 'priceAsc', name: 'Price low-high' },
              { value: 'priceDec', name: 'Price high-low' }
            ]"
          />
        </div>
        <div class="flex items-center justify-end gap-4 mt-4">
          <base-button outline @click="resetFilters" variant="light"
            >Reset</base-button
          >
          <base-button type="submit" variant="light">Apply</base-button>
        </div>
      </div>
    </form>
  </container>
  <section class="bg-background-light mt-14 flex-1">
    <container>
      <product-grid
        :editable="editable"
        title="Products"
        :items="results"
      ></product-grid>
    </container>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ProductGrid from "@/components/organisms/ProductGrid.vue";
import { Product } from "@/model/State.ts";

export default defineComponent({
  components: { ProductGrid },
  props: {
    editable: Boolean
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const filters = reactive({
      query: "",
      category: (route.params.category as string) || "",
      minprice: 0,
      maxprice: 0,
      sort: "nameAsc"
    });
    const filterOpen = ref(false);
    const items = ref(store.state.products);
    const results = ref(items.value);

    function filterSearch() {
      if (!filters.query) return (results.value = items.value);
      const queryRegex = new RegExp(filters.query, "gi");
      results.value = results.value.filter(
        (product: Product) =>
          queryRegex.test(product.description) ||
          queryRegex.test(product.title) ||
          queryRegex.test(product.brand)
      );
    }

    function filterCategory() {
      if (!filters.category) return;
      const queryRegex = new RegExp(filters.category, "gi");
      results.value = results.value.filter((product: Product) =>
        queryRegex.test(product.category)
      );
    }

    function filterPrice() {
      if (filters.minprice > 0) {
        results.value = results.value.filter(
          (product: Product) => product.price >= filters.minprice
        );
      }
      if (filters.maxprice > 0) {
        results.value = results.value.filter(
          (product: Product) => product.price <= filters.maxprice
        );
      }
    }

    function filterSort() {
      switch (filters.sort) {
        case "nameAsc":
          results.value = results.value.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
        case "nameDec":
          results.value = results.value.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        case "priceAsc":
          results.value = results.value.sort((a, b) => a.price - b.price);
          break;
        case "priceDec":
          results.value = results.value.sort((a, b) => b.price - a.price);
          break;
      }
    }

    function applyFilters() {
      filterSearch();
      filterCategory();
      filterPrice();
      filterSort();
    }

    function resetFilters() {
      filters.query = "";
      filters.category = "";
      filters.minprice = 0;
      filters.maxprice = 0;
      filters.sort = "";

      applyFilters();
    }

    return {
      filterOpen,
      items,
      results,
      applyFilters,
      resetFilters,
      ...toRefs(filters)
    };
  }
});
</script>

<style lang="scss" scoped>
.filter {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  gap: 1rem;
}

.search {
  display: grid;
  align-items: baseline;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}

.search > *:last-child {
  justify-self: end;
}

.filter > div:first-child {
  grid-column: 1 / span 2;
}
</style>
