import { MutationTree } from "vuex";
import { State } from "./index";

export const lsKeys = {
  favourites: "shuuz-fav",
  jwt: "shuuz-token",
  cart: "shuuz-basket"
};

const MAX_AMOUNT_TOASTS = 3;

const mutations: MutationTree<State> = {
  setProducts(state, payload) {
    state.products = payload;
  },
  addToCart(state, payload) {
    if (state.cart.some(item => item.id === payload)) return;
    const cartItem = { amount: 1, id: payload };
    state.cart.push(cartItem);
    localStorage.setItem(lsKeys.cart, JSON.stringify(state.cart));
  },

  removeFromCart(state, payload) {
    const indexToRemove = state.cart.findIndex(item => item.id === payload);
    if (indexToRemove < 0) return;
    state.cart.splice(indexToRemove, 1);
    localStorage.setItem(lsKeys.cart, JSON.stringify(state.cart));
  },
  setCachedCart(state) {
    const cachedCart = localStorage.getItem(lsKeys.cart);
    if (!cachedCart) return;
    state.cart = JSON.parse(cachedCart);
  },
  addToast(state, payload) {
    if (state.toasts.length >= MAX_AMOUNT_TOASTS) state.toasts.splice(0, 1);
    state.toasts.push(payload);
  },
  setHero(state, payload) {
    state.hero = payload;
  },
  setModal(state, payload) {
    state.modal = payload;
  },
  removeToast(state, payload) {
    if (payload >= state.toasts.length) return;

    state.toasts.splice(payload, 1);
  },
  addFavourite(state, payload) {
    if (state.favourites.includes(payload)) return;
    state.favourites.push(payload);
    localStorage.setItem(lsKeys.favourites, JSON.stringify(state.favourites));
  },

  removeFavourite(state, payload) {
    const indexToRemove = state.favourites.findIndex(id => id === payload);
    if (indexToRemove < 0) return;
    state.favourites.splice(indexToRemove, 1);
    localStorage.setItem(lsKeys.favourites, JSON.stringify(state.favourites));
  },
  setCachedJWTToken(state) {
    const cachedToken = localStorage.getItem(lsKeys.jwt);
    if (!cachedToken) return;
    state.jwt = cachedToken;
  },
  setJWTToken(state, payload) {
    state.jwt = payload;
    localStorage.setItem(lsKeys.jwt, state.jwt);
  },
  clearJWTToken(state) {
    state.jwt = "";
    localStorage.removeItem(lsKeys.jwt);
  },
  getCachedFavourites(state) {
    const cachedFavourites = localStorage.getItem(lsKeys.favourites);
    if (!cachedFavourites) return;
    state.favourites = JSON.parse(cachedFavourites);
  }
};

export default mutations;
