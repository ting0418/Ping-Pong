<template>
  <div class="container">
    <Loading
      :active="isLoading"
      width="2000"
      loader="bars"
      color="#e9e9d7"
    ></Loading>
    <h2 class="mt-2 text-center">購物車清單</h2>
    <hr />
    <div v-if="this.cartLists.carts.length" class="row justify-content-center">
      <div class="col-md-9">
        <div class="container mb-3">
          <div class="row justify-content-between">
            <div
              class="col-md-3 justify-content-center rounded-pill alert-success text-center d-flex justify-content-center align-items-center py-2 my-2"
            >
              1.填寫訂購資料
            </div>
            <div
              class="col-md-3 rounded-pill alert-secondary d-flex justify-content-center align-items-center text-center py-2 my-2"
            >
              2.金流付款
            </div>
            <div
              class="col-md-3 rounded-pill d-flex justify-content-center align-items-center alert-secondary text-center py-2 my-2"
            >
              3.訂單完成
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.cartLists.carts.length" class="table-responsive">
      <table class="table table-striped table-success bg-color">
        <thead>
          <tr>
            <th class="d-none d-md-table-cell">
              <h5>商品圖片</h5>
            </th>
            <th><h5>商品名稱</h5></th>
            <th><h5>數量</h5></th>
            <th><h5>單價</h5></th>
            <th><h5>總價格</h5></th>
            <th><h5>刪除</h5></th>
          </tr>
        </thead>

        <tbody class="mt-2">
          <tr
            v-for="item in cartLists.carts"
            :key="item.id"
            class="align-middle bg-color"
          >
            <td class="d-none d-md-table-cell bg-color">
              <img
                :src="item.product.imageUrl"
                alt="商品圖片"
                class="img-fluid bg-color"
                style="width: 150px; height: auto; object-fit: contain"
              />
            </td>
            <td class="bg-color">
              <p class="justify-content-center">
                {{ item.product.title }}
              </p>
            </td>

            <td class="bg-color">
              <div class="input-group input-group-sm">
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  v-model="item.qty"
                  @change="updateCart(item)"
                />
                <div class="input-group-text">{{ item.product.unit }}</div>
              </div>
            </td>
            <td class="bg-color">
              <p class="d-flex justify-content-start">
                $NT{{ item.product.price }}
              </p>
            </td>
            <td class="bg-color">
              <p class="justify-content-center align-items-center">
                {{ item.product.price * item.qty }}
              </p>
            </td>
            <td class="bg-color">
              <button class="btn-close" @click="deleteCart(item.id)"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!this.cartLists.carts.length" class="text-center my-5">
      <h3 class="text-muted">購物車是空的</h3>
      <p>快去選購您喜歡的商品吧！</p>
      <router-link to="/user/product" class="btn btn-outline-secondary">
        前往商品頁
      </router-link>
    </div>
    <h5 v-if="this.cartLists.carts.length" class="text-end">
      總計:{{ totalAmount }}
    </h5>
    <hr v-if="this.cartLists.carts.length" />
    <h5 class="text-end text-success" v-if="this.finalTotal">
      折扣價:{{ this.finalTotal }}
    </h5>
    <div class="input-group" v-if="this.cartLists.carts.length">
      <input
        type="text"
        v-if="this.cartLists.carts.length"
        class="form-control"
        v-model="couponCode"
      />
      <button class="btn btn-outline-secondary" @click="addCouponCode()">
        套用優惠券
      </button>
    </div>
    <div v-if="this.cartLists.carts.length" class="my-5">
      <h4 class="text-center fw-bold">訂單資料</h4>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <VForm @submit="createOrder" v-slot="{ errors }">
            <div class="form-group">
              <label class="form-label">姓名</label>
              <VField
                name="姓名"
                v-model="user.name"
                rules="required"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
              />
              <ErrorMessage name="姓名" class="invalid-feedback" />
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <VField
                name="email"
                v-model="user.email"
                rules="email|required"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入Email"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
            <div class="form-group">
              <label class="form-label">電話號碼</label>
              <VField
                name="phone"
                v-model="user.phone"
                :rules="isPhone"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['phone'] }"
                placeholder="請輸入電話號碼"
              />
              <ErrorMessage name="phone" class="invalid-feedback" />
            </div>
            <div class="form-group">
              <label class="form-label">地址</label>
              <VField
                name="地址"
                v-model="user.address"
                rules="required"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
              />
              <ErrorMessage name="地址" class="invalid-feedback" />
            </div>
            <div class="form-group">
              <label class="form-label">留言給我們</label>
              <textarea
                v-model="user.message"
                class="form-control"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button class="btn text-white bg-secondary d-block mt-2 ms-auto">
              結帳
            </button>
          </VForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      cartLists: { carts: [] },
      isLoading: false,
      status: { LoadingItem: "" },
      couponCode: "",
      finalTotal: "",
      user: {
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      },
    };
  },
  computed: {
    totalAmount() {
      return this.cartLists.carts.reduce((total, item) => {
        return total + item.product.price * item.qty;
      }, 0);
    },
  },

  methods: {
    createOrder() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/order`;
      axios
        .post(api, {
          data: {
            user: {
              name: this.user.name,
              email: this.user.email,
              tel: this.user.phone,
              address: this.user.address,
            },
            message: this.user.message,
          },
        })
        .then((res) => {
          console.log(res);
          this.cartLists = { carts: [] };
          this.user = {
            name: "",
            email: "",
            phone: "",
            address: "",
            message: "",
          };
          this.couponCode = "";
          this.finalTotal = "";
          const orderId = res.data.orderId;
          Swal.fire({
            title: "成功",
            text: "訂單已成功，將為您跳轉至結帳頁面",
            icon: "success",
          }).then(() => {
            this.$router.push(`/user/checkout/${orderId}`);
          });
        });
    },

    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },

    updateCart(item) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/cart/${item.id}`;
      this.isLoading = true;
      this.status.loadingItem = item.id;
      const cart = { product_id: item.product_id, qty: item.qty };
      axios.put(api, { data: cart }).then((res) => {
        console.log(res);
        this.isLoading = false;
        this.status.loadingItem = "";
        this.getCartList();
      });
    },
    getCartList() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/cart`;
      axios.get(api).then((res) => {
        console.log(res);
        this.cartLists = res.data.data;
        console.log(this.cartLists.carts);
      });
    },
    deleteCart(id) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/cart/${id}`;
      axios.delete(api).then((res) => {
        console.log(res);
        Swal.fire({
          title: "成功",
          text: "商品已成功從購物車刪除",
          icon: "success",
        });
        this.getCartList();
      });
    },

    addCouponCode() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/coupon`;
      axios.post(api, { data: { code: this.couponCode } }).then((res) => {
        console.log(res);
        this.finalTotal = res.data.data.final_total;
        console.log(this.finalTotal);

        Swal.fire({
          title: "成功",
          text: "優惠券已成功套用",
          icon: "success",
        });
      });
    },
  },

  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.getCartList();
      this.isLoading = false;
    }, 1000);
  },
};
</script>
<style scoped>
.alert-success {
  background: #bae0c3;
  color: #155724;
}
.alert-secondary {
  background: #e2e3e5;
  color: #383d41;
}
</style>