export {};

declare module "vue-router" {
  interface RouteMeta {
    requiresAdmin?: boolean;
    requiresAuth?: boolean;
  }
}
