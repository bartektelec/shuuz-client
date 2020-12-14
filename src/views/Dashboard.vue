<template>
  <div class="dashboard" :class="{ 'dashboard--open': isDrawerOpen }">
    <drawer @drawer="toggleDrawer" :isDrawerOpen="isDrawerOpen" />
    <div class="content pb-16">
      <add-product v-if="$route.params.page === 'add'" />
      <settings v-else-if="$route.params.page === 'settings'" />
      <add-product
        v-else-if="$route.params.page === 'edit' && $route.params.id"
      />
      <all-products v-else editable />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Drawer from "@/components/organisms/Drawer.vue";
import AllProducts from "@/views/AllProducts.vue";
import AddProduct from "@/views/AddProduct.vue";
import Settings from "@/views/Settings.vue";

const tabs = {
  general: "GENERAL",
  add: "ADD",
  edit: "EDIT"
};

export default defineComponent({
  components: {
    Drawer,
    AllProducts,
    AddProduct,
    Settings
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    },
    setTab(tab: keyof typeof tabs) {
      this.tabOpen = tab;
    }
  },
  setup() {
    const tabOpen = ref(tabs.edit);
    const isDrawerOpen = ref(true);
    const apiURL = ref(process.env);
    return {
      tabs,
      isDrawerOpen,
      tabOpen,
      apiURL
    };
  }
});
</script>

<style lang="postcss" scoped>
.dashboard {
  @apply flex-1 flex;
  transition: 2s ease;
}

.dashboard--open {
  @apply flex-wrap;
}

.dashboard .drawer {
  flex-shrink: 0;
  flex-basis: 50px;
  transition: flex-basis 1s ease;
}

.dashboard--open .drawer {
  flex-basis: 300px;
}

.content {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}
</style>
