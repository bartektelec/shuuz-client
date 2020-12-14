<template>
  <div class="wrapper hover:text-dark-light">
    <div
      class="header bg-light-light"
      :style="{
        backgroundImage: `url('${data.image_url ||
          api + data.image.formats.thumbnail.url}')`
      }"
    >
      <div
        v-if="!hideFavIcon && !editable"
        class="cursor-pointer inline-block m-2"
        @click="$store.dispatch('addFavourite', data.id)"
      >
        <icon
          :fill="favourite ? 'secondary' : 'light'"
          outline
          :name="favourite ? 'heart' : 'heart-outline'"
        ></icon>
      </div>
    </div>
    <router-link
      :to="editable ? `/dashboard/edit/${data.id}` : `/product/${data.id}`"
    >
      <div class="footer">
        <h2 class="title">{{ data.title }}</h2>
        <p class="brand">{{ data.brand }}</p>
        <p class="price">${{ data.price }}</p>
      </div>
    </router-link>
    <div v-if="editable">
      <div v-if="!confirmDelete">
        <base-button @click="confirmDelete = true" variant="dark"
          >Delete</base-button
        >
      </div>
      <div v-else class="flex justify-between">
        <base-button @click="confirmDelete = false" outline variant="primary"
          >Cancel</base-button
        >
        <base-button
          @click="$store.dispatch('deleteProduct', data.id)"
          variant="error"
          >Confirm</base-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { useStore } from "vuex";
import { Product } from "@/model/State";
import Icon from "@/components/atoms/Icon.vue";

export default defineComponent({
  components: { Icon },
  props: {
    image: {
      type: String as PropType<string>,
      required: true
    },
    data: {
      type: Object as PropType<Product>,
      required: true
    },
    editable: {
      type: Boolean as PropType<boolean>
    },
    hideFavIcon: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props) {
    const store = useStore();
    const confirmDelete = ref(false);
    const favourite = computed(() =>
      store.state.favourites.includes(props.data.id)
    );
    const api = computed(() => process.env.VUE_APP_API_URL);
    return { api, favourite, confirmDelete };
  }
});
</script>

<style lang="scss" scoped>
.icon-box {
  cursor: pointer;
}
.header {
  height: 10rem;
  background-size: cover;
  background-position: center center;
}

.wrapper {
  min-width: 10rem;
}
</style>

<style lang="postcss" scoped>
.footer {
  @apply py-4;
}
.title {
  @apply my-2 font-medium;
}

.brand {
  @apply my-2 italic;
}

.price {
  @apply font-price font-bold my-2 text-lg;
}
</style>
