<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-color">
    <div class="container-fluid">
      <router-link
        class="nav-link fw-bold fs-5 text-secondary me-3"
        to="/dashboard/products"
        >後台管理系統</router-link
      >

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/products"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/coupons"
              >優惠券</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/orders"
              >訂單</router-link
            >
          </li>
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">登出</a>
          </li>
        </ul>
        <!-- <span class="navbar-text"> Navbar text with an inline element </span> -->
      </div>
    </div>
  </nav>
  <hr />
</template>
<script>
import axios from "axios";

export default {
  methods: {
    logout() {
      const api = `${import.meta.env.VITE_API}logout`;
      axios.post(api).then((res) => {
        if (res.data.success) {
          // 已經將吐司編成方法為messageState
          this.$messageState(res, "登出");
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);

          console.log(res);
        }
      });
    },
  },
  inject: ["emitter"],
};
</script>
<style scoped>
.bg-color {
  background: #e9e9d7;
}
</style>