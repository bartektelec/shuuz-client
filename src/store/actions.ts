import { ActionTree } from "vuex";
import axios from "axios";
import { State } from "./index";
import router from "../router/index";

const actions: ActionTree<State, State> = {
  async onInit(context) {
    context.commit("setCachedJWTToken");
    context.dispatch("fetchHeroData");
    context.dispatch("fetchAllProducts");
    context.commit("setCachedCart");
    context.commit("getCachedFavourites");
  },

  async fetchAllProducts(context) {
    try {
      const payload = await axios.get("/products");
      context.commit("setProducts", payload.data);
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message:
          error.name + ": Unable to fetch the products list, try again later"
      });
      console.error(error.message);
    }
  },

  async fetchHeroData(context) {
    try {
      const payload = await axios.get("/home");
      context.commit("setHero", payload.data);
    } catch (error) {
      console.error(error.message);
    }
  },

  async setHeroData(context, payload) {
    try {
      await axios.put("/home", payload, {
        headers: {
          Authorization: "Bearer " + context.state.jwt
        }
      });
      context.commit("setHero", payload);
      context.commit("addToast", {
        message: "Hero updated successfully"
      });
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message: "Couldn't update hero information"
      });
      console.error(error.message);
    }
  },

  async addProduct(context, payload) {
    try {
      await axios.post("/products", payload, {
        headers: {
          Authorization: "Bearer " + context.state.jwt
        }
      });
      await context.dispatch("fetchAllProducts");
      context.commit("addToast", {
        message: "Product has been added"
      });
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message: "Couldn't add new product"
      });
      console.error(error.message);
    }
  },
  async updateProduct(context, payload) {
    try {
      const { id, ...newProduct } = payload;
      console.log(`id: ${id}`);
      console.log(`newProduct: ${newProduct}`);
      await axios.put("/products/" + id, newProduct, {
        headers: {
          Authorization: "Bearer " + context.state.jwt
        }
      });
      await context.dispatch("fetchAllProducts");
      context.commit("addToast", {
        message: "Product has been updated"
      });
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message: "Couldn't update product"
      });
      console.error(error.message);
    }
  },
  async deleteProduct(context, payload) {
    try {
      await axios.delete("/products/" + payload, {
        headers: {
          Authorization: "Bearer " + context.state.jwt
        }
      });
      await context.dispatch("fetchAllProducts");
      context.commit("addToast", {
        message: "Product has been deleted"
      });
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message: "Couldn't delete product"
      });
      console.error(error.message);
    }
  },

  addFavourite(context, payload) {
    if (context.state.favourites.includes(payload)) {
      return context.commit("removeFavourite", payload);
    }

    context.commit("addFavourite", payload);
    context.commit("addToast", { message: "Product added to favourites" });
  },
  addToCart(context, payload) {
    if (context.state.cart.some(item => item.id === payload))
      return context.commit("addToast", {
        type: "error",
        message: "Product already in cart"
      });

    context.commit("addToCart", payload);
    context.commit("addToast", { message: "Product added to cart" });
  },
  removeFromCart(context, payload) {
    if (context.state.cart.every(item => item.id !== payload)) return;

    context.commit("removeFromCart", payload);
    context.commit("addToast", { message: "Product removed from cart" });
  },
  async authorize(context, payload) {
    try {
      const user = await axios.post("/auth/local", payload);
      if (!user.data.user || !user.data.jwt) return;
      context.commit("setJWTToken", user.data.jwt);
      context.commit("addToast", {
        message: "Successfully logged in as " + user.data.user.username
      });
      context.commit("setModal", null);
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message: error.name + ": Unable to authorize user."
      });
      console.error(error.message);
    }
  },

  async register(context, payload) {
    try {
      console.log(payload);
      await axios.post("/auth/local/register", payload);

      context.commit("addToast", {
        message: "Registered successfully"
      });
      await context.dispatch("authorize", {
        identifier: payload.username,
        password: payload.password
      });
      context.commit("setModal", null);
    } catch (error) {
      context.commit("addToast", {
        type: "error",
        message: error.name + ":" + error.message
      });
      console.error(error.message);
    }
  },

  logout(context) {
    context.commit("clearJWTToken", "");
    context.commit("addToast", { message: "Logged out successfully" });
    router.push("/");
  }
};

export default actions;
