
  <template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click.prevent="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCoupon(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal
      @update-coupon="updateCoupons"
      :coupon="tempCoupon"
      ref="couponModal"
      :isNew="isNew"
    />
    <DelModal :item="tempCoupon" @delete-item="delCoupon" ref="delModal" />
  </div>
</template>
<script>
import CouponModal from "../components/CouponModal.vue";
import DelModal from "../components/DelModal.vue";
export default {
  components: {
    CouponModal,
    DelModal,
  },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: "",
        is_enabled: 0,
        percent: 100,
        code: "",
      },
      isLoading: false,
      isNew: false,
    };
  },

  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0,
          percent: 100,
        };
      } else {
        console.log("item", item);

        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    updateCoupons(tempCoupon) {
      if (this.isNew) {
        const api = `${import.meta.env.VITE_API}api/${
          import.meta.env.VITE_PATH
        }/admin/coupon`;
        this.$http.post(api, { data: tempCoupon }).then((res) => {
          console.log(res);
          this.$messageState(res, "新增優惠券");
          this.tempCoupon = {};
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      } else {
        const api = `${import.meta.env.VITE_API}api/${
          import.meta.env.VITE_PATH
        }/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(api, { data: this.tempCoupon }).then((res) => {
          console.log(res);
          this.$messageState(res, "修改優惠券");
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        });
      }
    },
    openDelCoupon() {
      const delCouponModal = this.$refs.delModal;
      delCouponModal.showModal();
    },
    getCoupons() {
      this.isLoading = true;
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/coupons`;
      this.$http.get(api).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.coupons = res.data.coupons;
          this.isLoading = false;
        }
      });
    },
    delCoupon() {
      const api = `${import.meta.env.VITE_API}api/${
        import.meta.env.VITE_PATH
      }/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(api).then((res) => {
        console.log(res);
        const delCouponModal = this.$refs.delModal;
        this.$messageState(res, "刪除優惠券");
        this.getCoupons();
        delCouponModal.hideModal();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

