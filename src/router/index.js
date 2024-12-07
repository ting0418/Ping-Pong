import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/", // 注意這裡的 base 路徑
    component: () => import("../pages/home.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../pages/dashboard.vue"),
    children: [
      { path: "products", component: () => import("../pages/products.vue") },
      { path: "coupons", component: () => import("../pages/coupons.vue") },
      { path: "orders", component: () => import("../pages/orders.vue") },
    ],
  },
  {
    path: "/user",
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
      {
        path: "getGym",
        component: () => import("../pages/getGym.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
