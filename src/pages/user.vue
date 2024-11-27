
   <template>
  <nav class="px-5 navbar navbar-expand-lg navbar-light nav-bg">
    <div class="container-fluid">
      <router-link
        class="navbar-brand text-decoration-none animate__backInUp animate__animated"
        aria-current="page"
        to="/"
        >Ping Pong</router-link
      >

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 折疊的內容 -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              class="nav-link text-white d-flex justify-content-center"
              aria-current="page"
              to="/"
              >首頁</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white d-flex justify-content-center"
              aria-current="page"
              to="/user/cart"
              >購物車</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white d-flex justify-content-center"
              to="/user/product"
              >商品頁面</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white d-flex justify-content-center"
              aria-current="page"
              to="/user/myFavorite"
              >我的最愛</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-white d-flex justify-content-center"
              to="/user/about"
              >關於我們</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div>
    <ToastMessages />
    <router-view />
  </div>
</template>
  
  <script>
import emitter from "../methods/emitter";
import ToastMessages from "../components/ToastMsg.vue";

export default {
  components: {
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
  
  <style scoped>
.nav-bg {
  background: #4d453e;
}

.navbar-nav .nav-link {
  font-size: 1.25rem; /* 預設字體大小 */
  transition: color 0.3s;
}

/* 懸停效果 - 顯示底線並更改顏色 */
.navbar-nav .nav-link:hover {
  color: #e9e9d7; /* 滑鼠懸停變色 */
  text-decoration: underline;
  text-decoration-color: #e9e9d7;
  text-underline-offset: 5px;
  transform: translateY(-3px);
  transition: 0.5s;
}

/* 點擊效果 - 增加縮小效果 */
.navbar-nav .nav-link:active {
  transform: scale(0.95); /* 按下時縮小 */
  color: #d3d3d3; /* 點擊時顏色變化 */
}
.router-link-active {
  text-decoration: underline;
  text-decoration-color: #e9e9d7;
  text-underline-offset: 3px;
}

@media (max-width: 992px) {
  .navbar-nav .nav-link {
    font-size: 1rem;
  }
}
</style>
  