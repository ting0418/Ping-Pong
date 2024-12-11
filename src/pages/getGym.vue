<template>
  <Loading :active="isLoading" loader="bars" color="#e9e9d7"></Loading>
  <div>
    <h2 class="fw-bold mt-2 text-center">打球場地搜尋</h2>
    <div class="row">
      <div class="container col-md-3 justify-content-center">
        <label class="form-label">縣市：</label>
        <select class="form-control" v-model="city">
          <option value="高雄市">高雄市</option>
          <option value="台北市">台北市</option>
          <option value="新北市">新北市</option>
          <!-- 可以加更多選項 -->
        </select>
        <button class="btn" @click="getGymData()">搜尋</button>
      </div>
    </div>

    <div v-if="gyms.length > 0">
      <h2>搜尋結果：</h2>
      <ul>
        <li v-for="gym in gyms" :key="gym.ID">
          <h3>{{ gym.Name }}</h3>
          <p>地址：{{ gym.Address }}</p>
          <p>類型：{{ gym.GymFuncList }}</p>
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
      keyword: "桌球",
      gyms: [], // 搜尋結果
      isLoading: false,
    };
  },
  methods: {
    async getGymData() {
      this.isLoading = true; // 開始加載
      try {
        // 篩選條件
        const url = `https://iplay.sa.gov.tw/odata/GymSearch?$format=application/json;odata.metadata=none&City=${this.city}&GymType=桌球`;
        const res = await axios.get(url);
        console.log(res.data.value); // 查看完整結果
      } catch (error) {
        console.error("資料加載失敗：", error);
      } finally {
        this.isLoading = false; // 完成加載
      }
    },
  },
};
</script>
  