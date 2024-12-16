<template>
  <div class="container">
    <Loading :active="isLoading" loader="bars" color="#e9e9d7"></Loading>
    <Swiper class="my-5" />

    <div class="d-flex justify-content-center align-items-center mt-5">
      <h3 class="me-md-5 me-1 fw-bold">{{ category }}</h3>
      <input type="text" class="form-control w-50 h-50" v-model="searchInput" />
      <button class="btn btn-outline-success ms-2" @click="searchProduct()">
        查詢
      </button>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <Category
          class="col-md-2"
          :selectedCategory="category"
          @category-selected="filterByCategory"
        />

        <div class="col-10 mt-4">
          <div class="row">
            <div
              class="col-12 col-md-6 col-lg-4 mb-4"
              v-for="item in paginatedProducts"
              :key="item.id"
            >
              <div class="card mx-2" style="width: 100%; height: auto">
                <button class="border border-0" @click="getProduct(item.id)">
                  <img
                    :src="item.imageUrl"
                    class="card-img-top"
                    alt="Product Image"
                  />
                </button>

                <div class="card-body">
                  <h5 class="card-title fw-bolder">{{ item.title }}</h5>
                  <span class="border border-warning rounded-3 px-1">{{
                    item.category
                  }}</span>

                  <div class="d-flex justify-content-around my-3">
                    <button class="btn custom-button bg-light rounded-3">
                      <i
                        class="bi bi-cart fs-3"
                        @click="addToCart(item.id)"
                      ></i>
                    </button>
                    <button
                      class="btn bg-light rounded-3"
                      @click="toggleFavorite(item)"
                    >
                      <i
                        v-if="!item.isFavorite"
                        class="bi bi-heart fs-3 cursor-pointer"
                      ></i>
                      <i
                        v-else
                        class="bi bi-suit-heart-fill fs-3 text-danger"
                      ></i>
                    </button>
                  </div>

                  <h5 v-if="item.origin_price > item.price" class="text-dark">
                    <del>$NT{{ item.origin_price }}</del>
                  </h5>

                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <h5 class="text-danger">$NT{{ item.price }}</h5>
                    <button
                      class="btn btn-outline-dark"
                      @click="getProduct(item.id)"
                    >
                      更多資訊
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Pagination :pages="pagination" @emit-pages="updatePage" />
  </div>
</template>

<script>
import axios from "axios";
import Swiper from "../components/Swiper.vue";
import Category from "../components/Category.vue";
import Pagination from "../components/Pagination.vue";
import Swal from "sweetalert2";

export default {
  components: { Swiper, Category, Pagination },
  data() {
    return {
      pagination: {
        current_page: 1,
        per_page: 9,
        total_pages: 0,
      },
      category: "全部商品",
      filteredProductList: [],
      searchInput: "",
      productList: [],
      isLoading: true,
    };
  },
  computed: {
    paginatedProducts() {
      const start =
        (this.pagination.current_page - 1) * this.pagination.per_page;
      const end = start + this.pagination.per_page;
      return this.filteredProductList.slice(start, end);
    },
  },
  methods: {
    updatePage(page) {
      this.pagination.current_page = page;
      this.$forceUpdate();
    },
    updateTotalPages() {
      this.pagination.total_pages = Math.ceil(
        this.filteredProductList.length / this.pagination.per_page
      );
    },
    filterByCategory(category) {
      this.category = category;
      if (category === "全部商品") {
        this.filteredProductList = this.productList;
      } else {
        this.filteredProductList = this.productList.filter(
          (item) => item.category === category
        );
        this.pagination.current_page = 1;
      }
      this.updateTotalPages();
    },
    searchProduct() {
      const searchInputLower = this.searchInput.toLowerCase();
      this.searchInput = "";
      this.isLoading = true;

      setTimeout(() => {
        this.filteredProductList = this.productList.filter((item) =>
          item.title.toLowerCase().includes(searchInputLower)
        );
        if (!this.filteredProductList.length) {
          Swal.fire({
            title: "失敗",
            text: "查無此商品，看看其他商品吧!",
            icon: "error",
          }).then(() => {
            this.getProductList();
          });
        }
        this.isLoading = false; // 確保在此處設置
        this.updateTotalPages();
      }, 500);
    },
    getProductList() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/products/all`;
      axios
        .get(api)
        .then((res) => {
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          this.productList = res.data.products.map((item) => ({
            ...item,
            isFavorite: favorites.includes(item.id),
          }));
          this.filteredProductList = this.productList;
          this.isLoading = false;

          // 等資料載入完成後再過濾
          const categoryFromQuery = this.$route.query.category;
          if (categoryFromQuery) {
            this.filterByCategory(categoryFromQuery);
          }

          this.updateTotalPages();
        })
        .catch((error) => {
          console.error("API 請求失敗:", error);
          this.isLoading = false;
        });
    },

    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    addToCart(id) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/cart`;
      axios.post(api, { data: { product_id: id, qty: 1 } }).then((res) => {
        Swal.fire({
          title: "成功",
          text: "商品已成功加入購物車",
          icon: "success",
        });
      });
    },
    toggleFavorite(product) {
      product.isFavorite = !product.isFavorite;

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (product.isFavorite) {
        favorites.push(product.id);
        Swal.fire({
          title: "成功",
          text: "商品已成功加入收藏",
          icon: "success",
        });
      } else {
        const index = favorites.indexOf(product.id);
        if (index !== -1) {
          favorites.splice(index, 1);
          Swal.fire({
            title: "成功",
            text: "商品已成功取消收藏",
            icon: "success",
          });
        }
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      this.filteredProductList = [...this.productList];
    },
  },
  watch: {
    filteredProductList() {
      this.updateTotalPages();
    },
    "$route.query.category"(newCategory) {
      this.filterByCategory(newCategory || "全部商品");
    },
  },
  created() {
    this.getProductList();
    const categoryFromQuery = this.$route.query.category;

    if (categoryFromQuery) {
      this.filterByCategory(categoryFromQuery);
    }
  },
};
</script>

<style scoped>
.bg-color {
  background: #e9e9d7;
}
.cursor-pointer {
  cursor: pointer;
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
.card:hover {
  /* 放大 */
  transform: scale(1.05);
  transition: transform 0.5s ease;
}
</style>
