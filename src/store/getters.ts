import { GetterTree } from "vuex";
import { State } from "./index";
import { lsKeys } from "./mutations";
import { Product } from "../model/State";
import axios from "axios";

const getters: GetterTree<State, State> = {
  getAllProducts(state) {
    return state.products;
  },
  getFeaturedProducts(state) {
    return state.products.filter(product => product.featured === true);
  },

  getProductById: state => (id: string | number) => {
    const isNumber = (id: string | number): id is number =>
      typeof id === "number";
    if (!isNumber(id)) {
      id = parseInt(id);
    }
    const foundProduct =
      state.products.find((item: Product) => item.id === id) || null;
    return foundProduct;
  },
  getAllFavourites(state) {
    return state.favourites
      .map(productId => {
        const foundProduct = state.products.find(item => item.id === productId);
        if (!foundProduct) return;
        return foundProduct;
      })
      .filter(item => item !== undefined);
  },
  getRandomProductName(state) {
    const rand = Math.floor(Math.random() * state.products.length);
    const randProduct = state.products[rand];
    return `${randProduct.brand} ${randProduct.title}`;
  },

  getJWT(state) {
    const cachedJWT = localStorage.getItem(lsKeys.jwt);
    if (!state.jwt || !cachedJWT) return null;

    return state.jwt || cachedJWT;
  },

  async getMe(state, getters) {
    if (!getters.getJWT) return null;

    const userData = await axios.get("/users/me", {
      headers: {
        Authorization: "Bearer " + getters.getJWT
      }
    });

    return userData.data;
  }
};

export default getters;
