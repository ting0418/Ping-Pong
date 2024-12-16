<template>
  <hr class="my-0" />
  <div class="footer-back mb-4">
    <div class="d-flex justify-content-center">
      <i class="bi bi-instagram p-3 fs-3"></i>
      <i class="bi bi-twitter p-3 fs-3"></i>
      <i class="bi bi-facebook p-3 fs-3"></i>
    </div>
    <div class="d-flex justify-content-center mb-2">
      <button class="btn btn-outline-secondary" @click="goBackstage">
        管理員登入
      </button>
    </div>

    <p class="text-center my-1">營業時間:周一至周五 上午9:00至下午4:00</p>
    <p class="text-center my-1">連絡電話:0911111111</p>
    <p class="text-center my-1">營業地址:新北市板橋區成功路xxx號</p>
    <p class="text-center">本網站僅供個人作品使用，無任何商業用途</p>

    <!-- 回到頁面頂部的按鈕 -->
    <button class="back-to-top" @click="scrollToTop">
      <i class="bi bi-arrow-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    goBackstage() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.footer-back {
  height: 220px;
  background: #e9e9d7;
  position: relative;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #e9e9d7;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
}

.back-to-top:hover {
  background-color: #d8d8d8;
}
</style>
