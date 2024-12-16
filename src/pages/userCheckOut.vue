<template>
  <div class="container">
    <div class="row my-5 justify-content-center">
      <div class="col-md-9">
        <div class="container mb-3">
          <div class="row justify-content-between">
            <div
              class="col-md-3 justify-content-center alert-secondary rounded-pill text-center d-flex justify-content-center align-items-center py-2 my-2"
            >
              1.填寫訂購資料
            </div>
            <div
              :class="[
                'col-md-3 rounded-pill d-flex justify-content-center align-items-center text-center py-2 my-2',
                orderList.is_paid === false
                  ? 'alert-success'
                  : 'alert-secondary',
              ]"
            >
              2.金流付款
            </div>
            <div
              :class="[
                'col-md-3 rounded-pill d-flex justify-content-center align-items-center text-center py-2 my-2',
                orderList.is_paid ? 'alert-success' : 'alert-secondary',
              ]"
            >
              3.訂單完成
            </div>
          </div>
        </div>
      </div>
      <form class="col-md-6">
        <table class="table align-middle">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th class="text-end">價格</th>
          </thead>
          <tbody>
            <tr v-for="item in orderList.products" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }}/ {{ item.product.unit }}</td>
              <td class="text-end">{{ item.final_total }}元</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-end">總計</td>
              <td class="text-end">{{ orderList.total }}元</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ orderList.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ orderList.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ orderList.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ orderList.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!orderList.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-end">
          <button
            class="btn btn-danger"
            v-if="!orderList.is_paid"
            @click.prevent="payOrder"
          >
            確認付款去
          </button>
          <button
            class="btn btn-danger"
            v-if="orderList.is_paid"
            @click.prevent="goProduct"
          >
            再看看其他東西!
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      orderList: {
        user: {},
        products: [],
      },

      orderId: "",
    };
  },
  methods: {
    getOrder() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/order/${this.orderId}`;
      axios.get(api).then((res) => {
        if (res.data.success) {
          this.orderList = res.data.order;
        }

        // console.log(this.orderList);
      });
    },
    payOrder() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/pay/${this.orderId}`;
      axios.post(api).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.getOrder();
        }
      });
    },
    goProduct() {
      this.$router.push("/user/product");
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
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