<template>
  <Loading :active="isLoading" loader="bars" color="#e9e9d7"></Loading>
  <div class="container">
    <h2 class="text-center fw-bold mt-3">我的最愛</h2>
    <hr />
    <div v-if="productList.length >= 1" class="row">
      <div
        v-for="product in productList"
        :key="product.id"
        class="col-12 col-md-3 col-sm-6 mb-4"
      >
        <div class="card mx-2" style="width: 100%; height: auto">
          <button class="border border-0" @click="getProduct(product.id)">
            <img
              :src="product.imageUrl"
              class="card-img-top"
              alt="Product Image"
            />
          </button>

          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <span class="border border-warning rounded-3 px-1"
              >{{ product.category }}
            </span>

            <div class="d-flex justify-content-around my-3">
              <button
                class="btn custom-button bg-light rounded-3"
                @click="addToCart(product.id)"
              >
                <i class="bi bi-cart fs-3"></i>
              </button>
              <button
                class="btn bg-light rounded-3"
                @click="toggleFavorite(product.id)"
              >
                <i
                  v-if="!product.isFavorite"
                  class="bi bi-heart fs-3 cursor-pointer"
                ></i>
                <i v-else class="bi bi-suit-heart-fill text-danger fs-3"></i>
              </button>
            </div>

            <h5 v-if="product.origin_price > product.price" class="text-dark">
              <del>$NT{{ product.origin_price }}</del>
            </h5>

            <div class="d-flex align-items-center justify-content-between">
              <h5 class="text-danger">$NT{{ product.price }}</h5>
              <button
                class="btn btn-outline-dark"
                @click="getProduct(product.id)"
              >
                更多資訊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4 class="text-center">目前沒有最愛的商品喔</h4>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      productList: [],
      isLoading: true,
    };
  },
  methods: {
    getProductList() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/products/all`;
      axios.get(api).then((res) => {
        const product = res.data.products;
        const products = product.map((p) => ({
          ...p,
          isFavorite: true,
        }));
        console.log(products);

        // 從 localStorage 中取得儲存的商品 ID，並解析成陣列
        const storedIds = JSON.parse(localStorage.getItem("favorites")) || [];

        // 比對 products 列表中的商品 ID 是否存在於 storedIds 中
        const matchingProducts = products.filter((product) =>
          storedIds.includes(product.id)
        );
        this.productList = matchingProducts;
        this.isLoading = false;
        // 顯示符合條件的商品
        console.log("我的最愛", matchingProducts);
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    addToCart(id) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/cart`;
      axios
        .post(api, { data: { product_id: id, qty: 1 } })
        .then((res) => {
          console.log("商品已加入購物車:", res);
          this.cartAdded = true;
          // 發送通知消息
          Swal.fire({
            title: "成功",
            text: "商品已成功加入購物車",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error("加入購物車失敗:", error);
        });
    },
    toggleFavorite(id) {
      const storedIds = JSON.parse(localStorage.getItem("favorites")) || [];
      const product = this.productList.find((product) => product.id === id);

      if (product) {
        product.isFavorite = !product.isFavorite;

        if (product.isFavorite) {
          storedIds.push(id);
          Swal.fire("成功", "商品已成功加入收藏", "success");
        } else {
          const index = storedIds.indexOf(id);
          if (index > -1) storedIds.splice(index, 1);
          Swal.fire("成功", "商品已成功移除收藏", "success");
        }

        localStorage.setItem("favorites", JSON.stringify(storedIds));
        this.productList = this.productList.filter((p) => p.isFavorite); // 實時更新列表
      }
    },
  },

  created() {
    this.getProductList();
  },
};
</script>