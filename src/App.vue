
<template>
  <div class="page-container bg-color">
    <div class="content">
      <div class="marquee-container">
        <p class="marquee-text">
          📢 最新消息：歡迎光臨我們的網站！限時優惠中，快來選購！ 📢
        </p>
      </div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  components: { Footer },
};
</script>
<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 讓整個畫面填滿視窗高度 */
}

.content {
  flex: 1; /* 讓主內容填滿剩餘空間 */
}

footer {
  background: #333; /* 背景色 */
  color: #fff; /* 文字色 */
  text-align: center; /* 置中對齊 */
  padding: 20px 0; /* 高度調整 */
}
.bg-color {
  background: #e9e9d7;
}
.marquee-container {
  background-color: #4d453e;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-text {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>

