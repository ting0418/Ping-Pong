<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../../public/image/1.jpg" alt="" />
      </div>
      <div class="swiper-slide">
        <img src="../../public/image/2.webp" alt="" />
      </div>
      <div class="swiper-slide">
        <img src="../../public/image/3.jpg" alt="" />
      </div>
      <!-- Add more slides as needed -->
    </div>
    <!-- Add Pagination and Navigation -->
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
  
  <script>
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

export default {
  mounted() {
    // Initialize Swiper after the component is mounted
    new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 100,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      autoplay: {
        delay: 3000, // 自動切換的間隔時間（以毫秒為單位）
        disableOnInteraction: false, // 設定為 false 以便在手動操作後也能繼續自動輪播
      },
    });
  },
};
</script>
<style scoped>
.swiper {
  width: 100%;
  max-width: 1000px; /* 控制整個 Swiper 的最大寬度 */
  margin: auto;
}

.swiper-slide img {
  width: 100%; /* 圖片會適應 Swiper 的寬度 */
  height: auto; /* 高度自適應，保持比例 */
  object-fit: cover; /* 若要裁剪圖片，可以改用 contain */
}
</style>
