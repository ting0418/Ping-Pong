<template>
  <Loading :active="isLoading" loader="bars" color="#e9e9d7"></Loading>
  <div class="container">
    <h2 class="fw-bold mt-2 text-center">打球場地搜尋</h2>
    <div class="row">
      <div class="col-md-3 justify-content-center">
        <label class="form-label">縣市：</label>
        <select class="form-control" v-model="city">
          <option value="臺北市">臺北市</option>
          <option value="新北市">新北市</option>
          <option value="桃園市">桃園市</option>
          <option value="新竹市">新竹市</option>
          <option value="苗栗縣">苗栗縣</option>
          <option value="彰化市">彰化市</option>
          <option value="彰化縣">彰化縣</option>
          <option value="南投市">南投市</option>
          <option value="雲林縣">雲林縣</option>
          <option value="嘉義縣">嘉義縣</option>
          <option value="嘉義市">嘉義市</option>
          <option value="台南市">台南市</option>
          <option value="高雄市">高雄市</option>
          <option value="宜蘭縣">宜蘭縣</option>
          <option value="花蓮縣">花蓮縣</option>
          <option value="台東縣">台東縣</option>
          <!-- 可以加更多選項 -->
        </select>
        <button class="btn ms-auto" @click="getGymData()">搜尋</button>
      </div>
    </div>

    <div v-if="gyms.length > 0">
      <h2>搜尋結果：</h2>
      <ul>
        <li v-for="gym in gyms" :key="gym.ID">
          <h3>{{ gym.Name }}</h3>
          <p>地址：{{ gym.Address }}</p>
          <p>電話：{{ gym.OperationTel }}</p>

          <p>類型：{{ gym.GymFuncList }}</p>
          <p>租借狀態：{{ gym.RentState }}</p>
          <img :src="gym.Photo1" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      city: "",
      gyms: [], // 搜尋結果
      isLoading: false,
    };
  },
  methods: {
    async getGymData() {
      this.isLoading = true; // 開始加載
      try {
        const url = `	https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&Keyword=桌球&City=${this.city}&GymType=桌球場`;
        const res = await axios.get(url);
        this.gyms = res.data;
        console.log(res.data); // 查看完整結果
      } catch (error) {
        console.error("資料加載失敗：", error);
      } finally {
        this.isLoading = false; // 完成加載
      }
    },
  },
};
</script>
  