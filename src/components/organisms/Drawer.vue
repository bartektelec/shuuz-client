<template>
  <nav class="drawer" :class="{ 'drawer--open': isDrawerOpen }">
    <button @click="$emit('drawer')" class="drawer__toggler">
      <icon name="arrowhead-right-outline" /><span class="sr-only"></span>
    </button>
    <ul class="drawer__list">
      <li class="drawer__list-item">
        <router-link class="link" to="/dashboard/settings">
          General settings
        </router-link>
      </li>
      <li class="drawer__list-item">
        <span
          class="@apply text-primary-dark font-medium inline-block py-1 px-2 rounded"
          >Products</span
        >
      </li>
      <ul class="drawer__list">
        <li class="drawer__list-item">
          <router-link class="link" to="/dashboard/add">Add new</router-link>
        </li>
        <li class="drawer__list-item">
          <router-link class="link" to="/dashboard/edit"
            >Edit products</router-link
          >
        </li>
      </ul>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isDrawerOpen: Boolean
  },
  setup() {
    return {};
  }
});
</script>

<style lang="postcss" scoped>
.link {
  @apply text-primary-dark font-medium inline-block py-1 px-2 rounded hover:bg-primary-light;
}

.drawer__toggler {
  @apply absolute top-2 right-0 rounded-lg p-4 bg-background-light flex;
}

.drawer__toggler i {
  transition: transform 0.2s ease;
}
.drawer--open .drawer__toggler i {
  @apply transform rotate-180;
}
.drawer {
  @apply px-4 py-16 bg-background-light relative flex flex-col border-r-2;
}

.drawer--open .drawer__list {
  @apply block;
  width: auto;
  transform: translateX(0);
}

.drawer__list {
  @apply ml-8;
  width: 0;
  transform: translateX(-150px);
  transition: transform 1s ease;
}

.drawer__list-item {
  @apply my-2 font-medium;
}

.drawer__list-item button {
  @apply opacity-75 hover:opacity-100;
}
.drawer__list-item--active button {
  @apply opacity-100;
}
</style>
