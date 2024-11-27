<template>
  <Loading :active="isLoading"></Loading>
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
  <!-- 圖片區域 -->
  <div style="position: relative">
    <img
      src="/image/2.webp"
      alt=""
      class="img-fluid"
      style="width: 100%; height: auto"
    />
  </div>

  <div class="container container-md-fluid position-relative mt-5">
    <div class="my-5">
      <h3 class="fw-bold text-center">商品介紹</h3>

      <div class="row justify-content-center justify-content-md-between">
        <!-- 商品卡片 -->
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="card col-8 col-md-3 mb-4"
        >
          <button class="btn" @click="goProduct(category.title)">
            <img :src="category.image" alt="" class="img-fluid" />
          </button>
          <h4 class="fw-bold text-center my-3">{{ category.title }}</h4>
        </div>
      </div>
    </div>
    <hr />
    <div class="my-5">
      <h3 class="fw-bold text-center">精選商品</h3>

      <!-- Swiper 區域 -->
      <div class="swiper">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(product, index) in displayedProducts"
            :key="index"
          >
            <div class="card" style="width: 18rem">
              <i
                :class="
                  product.isFavorite
                    ? 'bi bi-suit-heart-fill text-danger favorite-btn'
                    : 'bi bi-suit-heart favorite-btn'
                "
                @click="toggleFavorite(product)"
              ></i>
              <button class="btn" @click="goProductDetail(product.id)">
                <img
                  :src="product.imageUrl"
                  :alt="product.title"
                  class="card-img-top"
                />
              </button>

              <div class="card-body">
                <h5 class="card-title text-center">{{ product.title }}</h5>
                <div class="d-flex align-items-center justify-content-between">
                  <h5 class="card-text text-danger">$NT{{ product.price }}</h5>
                  <button
                    class="btn bg-secondary"
                    @click="goProductDetail(product.id)"
                  >
                    查看商品
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Swiper 分頁與導覽按鈕 -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <hr />
    <div class="my-5">
      <h3 class="fw-bold text-center">顧客怎麼說</h3>
      <!-- 顧客評論 -->
      <div class="row">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="col-12 col-md-6 col-xl-3 py-2"
        >
          <div class="d-flex border rounded-pill bg-white">
            <div>
              <img
                :src="review.image"
                class="rounded-circle"
                style="object-fit: cover; max-width: 200px; max-height: 200px"
                alt=""
              />
            </div>
            <div class="px-3">
              <p class="fw-bold">{{ review.name }}</p>
              <p>{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light p-5 mt-5">
    <div class="container">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start"
      >
        <p class="mb-0 me-2 fw-bold">立即訂閱就可以領取新客8折優惠!</p>
        <div class="input-group w-md-50 mt-md-0 mt-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="請輸入您的Email"
          />
          <button @click="getCoupon()" class="btn btn-dark">訂閱</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
export default {
  data() {
    return {
      isLoading: false,
      email: "",
      status: { LoadingItem: "" },
      allProducts: [],
      categories: [
        { title: "球拍", image: "image/fzd.jpg" },
        { title: "球皮", image: "image/05.jpg" },
        { title: "球鞋", image: "image/shoe.jpeg" },
        { title: "配件", image: "image/head band.jpg" },
      ],
      reviews: [
        {
          name: "歐文",
          comment: "在這邊購買過球拍，體驗很好，價格也很實惠",
          image: "image/user1.jpg",
        },
        {
          name: "Jason",
          comment: "老闆介紹得非常清楚，對於新手也難準確提供建議",
          image: "image/user2.jpg",
        },
        {
          name: "威廉",
          comment: "cp值很高，推薦大家來買",
          image: "image/user3.jpg",
        },
        {
          name: "Mike",
          comment: "店內用品齊全，推薦大家來這邊逛逛",
          image: "image/user4.jpg",
        },
      ],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        this.isLoading = true;
        const api = `${import.meta.env.VITE_API}api/${
          import.meta.env.VITE_PATH
        }/products/all`;
        const response = await axios.get(api);
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        this.allProducts = response.data.products.map((product) => ({
          ...product,
          isFavorite: favorites.includes(product.id),
        }));
        this.isLoading = false;
      } catch (error) {
        console.error("無法獲取產品資料", error);
      }
    },
    goProduct() {
      this.$router.push("/user/product");
    },
    goProductDetail(id) {
      this.$router.push(`/user/product/${id}`);
    },
    toggleFavorite(product) {
      product.isFavorite = !product.isFavorite;
      console.log(product.id);

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (product.isFavorite) {
        favorites.push(product.id);
      } else {
        const index = favorites.indexOf(product.id);
        if (index !== -1) favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
    getCoupon() {
      if (!this.email) {
        Swal.fire({
          title: "錯誤",
          text: "請輸入電子郵件信箱",
          icon: "error",
        });
        return;
      }
      if (!this.validateEmail(this.email)) {
        Swal.fire({
          title: "錯誤",
          text: "請輸入有效的電子郵件",
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "謝謝您!",
        text: "您的新客優惠碼為newcustomer",
        icon: "success",
      });
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
  },
  computed: {
    displayedProducts() {
      return this.allProducts
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    },
  },
  mounted() {
    this.fetchProducts();

    new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 5,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        1600: { slidesPerView: 4 },
        1200: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        390: { slidesPerView: 1 },
      },
    });
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
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.swiper-pagination {
  bottom: -5px;
}
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
}
.favorite-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #e9e9d7;
  border: none;
  padding: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}
.favorite-btn:hover {
  background-color: rgba(255, 255, 255, 1);
}
.swiper {
  width: 100%;
  max-width: 100%;
  margin: auto;
}
.swiper-slide img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
