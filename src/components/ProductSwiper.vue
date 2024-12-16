<template>
  <hr />
  <div class="container mb-3">
    <h2 class="my-5 fw-bold text-center">您可能會喜歡的商品</h2>
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
                <h5 class="card-text text-danger">
                  $NT{{ $filters.currency(product.price) }}
                </h5>
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
</template>
<script>
import axios from "axios";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
export default {
  data() {
    return {
      products: [],
    };
  },

  methods: {
    fetchProducts() {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/products/all`;

      axios
        .get(api)
        .then((response) => {
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          this.products = response.data.products.map((product) => ({
            ...product,
            isFavorite: favorites.includes(product.id),
          }));
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("無法獲取產品資料", error);
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
  },
  computed: {
    displayedProducts() {
      return this.products
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
  },
};
</script>
<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-pagination {
  bottom: -5px;
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
</style>