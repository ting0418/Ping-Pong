<template>
  <div class="swiper swiper-main">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img
          src="/image/ovtcharov.webp"
          alt="Harimoto"
          class="img-fluid full-width-img"
        />
      </div>
      <div class="swiper-slide">
        <img
          src="/image/lin_yun-ju.webp"
          alt="Image 2"
          class="img-fluid full-width-img"
        />
      </div>
    </div>
    <!-- Swiper 分頁與導覽按鈕 -->
    <div class="swiper-pagination"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
<script>
import Swiper from "swiper/bundle";

export default {
  mounted() {
    new Swiper(".swiper-main", {
      slidesPerView: 1,
      // direction: "horizontal",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};
</script>
<style scoped>
.swiper-main {
  width: 100%;

  margin: auto; /* 水平居中 */
}
.swiper {
  width: 100%;
  max-width: 100%;
  margin: auto;
}

.swiper-slide img {
  width: 100%; /* 圖片會適應 Swiper 的寬度 */
  height: auto; /* 高度自適應，保持比例 */
  object-fit: cover; /* 若要裁剪圖片，可以改用 contain */
}

.swiper-button-next,
.swiper-button-prev {
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}
.swiper-button-next:hover,
.swiper-button-prev:hover {
  color: #4d453e; /* 悬停时颜色变化 */
  transform: scale(1.2); /* 放大效果 */
  transition: transform 0.3s ease, color 0.3s ease;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-pagination {
  bottom: -5px;
}
</style>