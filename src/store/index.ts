import { createStore } from "vuex";
import { Product, Hero, CartItem } from "../model/State";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export const store = createStore<State>({
  state: {
    products: [],
    cart: [],
    jwt: "",
    toasts: [],
    favourites: [],
    hero: null,
    modal: null
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {}
});

interface ErrorItem {
  type: "primary" | "error";
  icon: string;
  message: string;
}

export type State = {
  products: Product[];
  cart: CartItem[];
  jwt: string;
  toasts: ErrorItem[];
  favourites: number[];
  hero: Hero | null;
  modal: string | null;
};
