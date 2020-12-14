import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { store } from "../store/index";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/products/:category?",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "allproducts" */ "../views/AllProducts.vue")
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "allproducts" */ "../views/Product.vue")
  },
  {
    path: "/dashboard/:page?/:id?",
    name: "Dashboard",
    meta: {
      requiresAdmin: true
    },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Cart.vue")
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Favourites.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Error.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requiresAuth);
  const reqAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (!reqAuth && !reqAdmin) return next();

  if (!store.getters.getJWT) {
    store.commit("addToast", {
      type: "error",
      message: "Auth error: User not logged in"
    });

    return next(false);
  }
  if (reqAdmin) {
    try {
      const userData = await store.getters.getMe;

      const roleId = await userData.role.id;
      if (roleId !== 1) throw new Error("User is not admin");
      return next();
    } catch (error) {
      store.commit("addToast", {
        type: "error",
        message: "Auth error: " + error.message
      });
      next(false);
    }
  }
  if (reqAuth) {
    try {
      const userData = await store.getters.getMe;

      const isConfirmed = await userData.confirmed;
      const isBlocked = await userData.blocked;
      if (!userData) throw new Error("User not logged in");
      if (!isConfirmed) throw new Error("User not confirmed");
      if (isBlocked) throw new Error("User is banned");
      next();
    } catch (error) {
      store.commit("addToast", {
        type: "error",
        message: "Auth error: " + error.message
      });
      next(false);
    }
  }
});

export default router;
