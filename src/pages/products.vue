<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      新增產品
    </button>
  </div>
  <table class="table mt-4 table-success">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <!-- 在main.js設置的globalProperty -->
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination :pages="pagination" @emit-pages="getProducts" />
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  />
  <DelProductModal
    ref="delModal"
    :item="tempProduct"
    @delete-item="delProduct"
  />
</template>
<script>
import Pagination from "../components/Pagination.vue";
import ProductModal from "../components/ProductModal.vue";
import DelProductModal from "../components/DelModal.vue";
import axios from "axios";
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  components: { ProductModal, DelProductModal, Pagination },
  methods: {
    getProducts(page = 1) {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/products/?page=${page}`;

      this.isLoading = true;
      axios.get(api).then((res) => {
        this.isLoading = false;
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          console.log(res);
          console.log(this.pagination);
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
      console.log(isNew, item);
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/product`;
      const productComponent = this.$refs.productModal;
      let httpMethod = "post";
      if (!this.isNew) {
        api = `${import.meta.env.VITE_API}api/${
          import.meta.env.VITE_PATH
        }/admin/product/${item.id}`;
        httpMethod = "put";
      }

      axios[httpMethod](api, { data: this.tempProduct }).then((res) => {
        console.log(res);
        productComponent.hideModal();
        if (res.data.success) {
          this.tempProduct = {};
          this.getProducts();
          this.$messageState(res);
        } else {
          this.$messageState(res);
        }
      });
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delModal = this.$refs.delModal;
      delModal.showModal();
    },
    delProduct() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/product/${this.tempProduct.id}`;
      this.$http.delete(api).then((res) => {
        console.log(res);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });
    },
  },
  inject: ["emitter"],
  created() {
    this.getProducts();
  },
};
</script>
<style scoped>
</style>