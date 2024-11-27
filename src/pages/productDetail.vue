<template>
  <Loading :active="isLoading"></Loading>
  <div class="container mt-5 d-flex justify-content-center">
    <div class="d-flex flex-column flex-md-row">
      <img :src="product.imageUrl" class="product-image" alt="商品圖片" />
      <div class="product-details ms-md-5 mt-3 mt-md-0">
        <h1 class="product-title mb-3 fw-bold">
          {{ product.title }}
        </h1>
        <h6 class="product-subtitle mb-3">
          {{ product.description }}
        </h6>
        <ul class="list-unstyled">
          <li>物品狀況：全新</li>
          <li>物品所在地: 新北市</li>
        </ul>

        <div class="d-flex">
          <h5
            v-if="product.origin_price > product.price"
            class="price mb-4 me-3"
          >
            <del>NT$:{{ product.origin_price }}</del>
          </h5>
          <h5 class="price text-danger mb-4">NT$:{{ product.price }}</h5>
        </div>

        <div class="quantity-selector d-flex align-items-center">
          <p class="mt-3 me-2">數量:</p>
          <button
            class="btn btn-outline-secondary quantity-btn"
            @click="decrease"
            :disabled="quantity <= 1"
          >
            -
          </button>
          <span class="mx-3 quantity-display">{{ quantity }}</span>
          <button
            class="btn btn-outline-secondary quantity-btn"
            @click="increase"
          >
            +
          </button>
        </div>

        <div class="mt-3">
          <button
            class="btn btn-outline-secondary add-to-cart-btn"
            @click="addToCart(product.id)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <hr />
    <h2 class="fw-bold my-3">商品規格</h2>
    <h5>{{ product.content }}</h5>
    <h2 class="fw-bold my-3">購物須知</h2>
    <ol>
      <li>
        <h5>
          商品圖片為實物拍攝，因拍攝光線、顯示器差異等因素，商品圖片可能會與實際商品略有不同，實際顏色以收到商品為準。
        </h5>
      </li>
      <li>
        <h5>
          訂單確認後，商品將於1-3個工作天內處理並安排出貨。若遇上假日或特殊情況（如節慶促銷），處理時間可能會稍有延遲。
        </h5>
      </li>
      <li>
        <h5>
          商品尺寸為手工測量，可能有±2公分的誤差，請確認所需尺寸後再下單。
        </h5>
      </li>
      <li>
        <h5>
          消費滿一定金額可享免運優惠，未達標準之訂單則需支付相應運費，具體標準請參考網站配送政策。
        </h5>
      </li>
      <li>
        <h5>
          我們提供完整的售後服務，若在商品使用過程中遇到任何問題，歡迎隨時聯繫客服，我們將盡力協助解決。
        </h5>
      </li>
    </ol>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      quantity: 1,
      product: {},
      isLoading: true,
      cartAdded: false,
    };
  },

  methods: {
    increase() {
      this.quantity++;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart(id) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/cart`;
      axios
        .post(api, { data: { product_id: id, qty: this.quantity } })
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
  },

  mounted() {
    const id = this.$route.params.ProductId;
    const api = `${import.meta.env.VITE_API}api/${
      import.meta.env.VITE_PATH
    }/product/${id}`;
    axios.get(api).then((res) => {
      this.isLoading = false;
      this.product = res.data.product;
    });
  },
};
</script>

<style scoped>
.product-image {
  width: 100%;
  max-height: 500px;
  max-width: 500px;
  border-radius: 8px;
  border: 2px solid #e3e3e3;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-title {
  font-size: 1.8rem;
  color: #333;
}

.product-subtitle {
  font-size: 1.4rem;
  color: #555;
}

.price {
  font-size: 1.6rem;
  font-weight: bold;
}

.quantity-selector {
  margin-top: 1rem;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background-color: #e3e3e3;
}

.quantity-display {
  font-size: 1.5rem;
}

.add-to-cart-btn {
  transition: background-color 0.3s ease;
}
</style>
