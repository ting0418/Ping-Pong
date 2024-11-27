import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/pingPong/", // 注意這裡的 base 路徑
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/pingPong/login",
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/pingPong/dashboard",
    component: () => import("../pages/dashboard.vue"),
    children: [
      { path: "products", component: () => import("../pages/products.vue") },
      { path: "coupons", component: () => import("../pages/coupons.vue") },
      { path: "orders", component: () => import("../pages/orders.vue") },
    ],
  },
  {
    path: "/pingPong/user",
    component: () => import("../pages/user.vue"),
    children: [
      {
        path: "cart",
        component: () => import("../pages/userCart.vue"),
      },
      {
        path: "product/:ProductId",
        component: () => import("../pages/productDetail.vue"),
      },
      {
        path: "product",
        component: () => import("../pages/userProduct.vue"),
      },
      {
        path: "about",
        component: () => import("../pages/aboutUs.vue"),
      },
      {
        path: "myFavorite",
        component: () => import("../pages/myFavorite.vue"),
      },
      {
        path: "checkOut/:orderId",
        component: () => import("../pages/userCheckOut.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
