<template>
  <Loading :active="isLoading" loader="bars" color="#e9e9d7"></Loading>
  <nav class="px-5 navbar navbar-expand-lg navbar-light nav-bg">
    <div class="container-fluid">
      <router-link
        class="navbar-brand text-decoration-none animate__backInUp animate__animated logo"
        aria-current="page"
        to="/"
        >Ping Pong
      </router-link>

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
              class="nav-link d-flex justify-content-center"
              aria-current="page"
              to="/"
              >首頁</router-link
            >
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link d-flex justify-content-center"
              to="/user/product"
              >商品頁面</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link d-flex justify-content-center"
              aria-current="page"
              to="/user/myFavorite"
              >我的最愛</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link d-flex justify-content-center"
              to="/user/about"
              >關於我們</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link d-flex justify-content-center"
              aria-current="page"
              to="/user/cart"
              >購物車</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <HomeSwiper data-aos="fade-down"></HomeSwiper>
  <div class="bg-white p-5">
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
            :class="{ 'is-invalid': email && !validateEmail(email) }"
            placeholder="請輸入您的Email"
          />
          <button @click="getCoupon()" class="btn btn-dark">訂閱</button>
        </div>
      </div>
    </div>
  </div>
  <div
    data-aos="fade-right"
    class="container container-md-fluid mt-5 justify-content-center"
  >
    <h2 class="my-3 text-center fw-bold">如何挑選球拍?</h2>
    <div>
      <iframe
        class="col-lg-6 col-12"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/70ieLEQWuAo?si=uIHsptlhb1bjlRiA"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe
      ><iframe
        class="col-lg-6 col-12"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/AUKseX5LQ4Q?si=2jhFWcU05LjkrrEJ"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  <hr />
  <div
    data-aos="fade-left"
    class="container container-md-fluid position-relative mt-5"
  >
    <div class="row">
      <div
        class="col-lg-6 col-12 my-5 align-items-center align-items-lg-start d-flex flex-column justify-content-center align-items-start"
      >
        <h3 class="fw-bold">想找甚麼裝備嗎?</h3>
        <button @click="goProduct()" class="btn btn-outline-secondary mt-3">
          所有商品
        </button>
      </div>

      <div class="col-lg-6 col-12">
        <div class="row">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="col-lg-6 col-12 mb-4 test"
          >
            <div class="d-flex d-lg-block justify-content-around">
              <button
                class="btn p-0 category"
                @click="goProduct(category.title)"
              >
                <img
                  :src="category.image"
                  alt=""
                  class="img-fluid img-category"
                />
              </button>
              <h4 class="fw-bold d-flex align-items-center text-center my-3">
                | {{ category.title }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div data-aos="zoom-in" class="my-5">
      <h3 class="fw-bold text-center">店家精選商品</h3>

      <!-- Swiper  -->
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
                    class="btn bg-secondary text-white"
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
import emitter from "../methods/emitter";
import HomeSwiper from "../components/HomeSwiper.vue";

export default {
  components: {
    HomeSwiper,
  },
  data() {
    return {
      isLoading: false,
      email: "",
      status: { LoadingItem: "" },
      allProducts: [],
      categories: [
        { title: "球拍", image: "image/fzd.jpg" },
        { title: "球皮", image: "image/rozena.jpg" },
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
    goProduct(categoryTitle) {
      this.$router.push({
        path: "/user/product",
        query: { category: categoryTitle },
      });
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

      breakpoints: {
        1600: { slidesPerView: 4 },
        1200: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        390: { slidesPerView: 1 },
      },
    });
    new Swiper(".swiper-main", {
      slidesPerView: 1,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};
</script>

<style scoped>
.logo {
  font-family: Playball, cursive !important;
}
.nav-bg {
  background: #4d453e;
}
.navbar-nav .nav-link {
  font-size: 1rem;
  transition: color 0.3s;
  color: #e9e9d7;
}

.navbar-nav .nav-link:hover {
  text-decoration: underline;
  text-underline-offset: 5px;
  transform: translateY(-3px);
  transition: 1s;
  color: rgb(17, 179, 163);
}

/* 點擊效果 - 增加縮小效果 */
.navbar-nav .nav-link:active {
  transform: scale(1.2); /* 按下時縮小 */
}
.router-link-active {
  text-decoration: underline;
  text-decoration-color: #e9e9d7;
  text-underline-offset: 3px;
}
.full-width-img {
  width: 100%;
  height: auto;
}
.category:hover {
  transform: translateY(7px);
  transition: transform 0.5s linear;
}
@media (max-width: 992px) {
  .navbar-nav .nav-link {
    font-size: 1rem;
  }
  .img-category {
    width: 200px;
  }
  .test:hover {
    background: #f9d0b6da;
    transform: translateX(10px);
    transition: 2s;
  }
  .category:hover {
    transform: none;
    transition: none;
  }
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
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
.is-invalid {
  border-color: red;
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
