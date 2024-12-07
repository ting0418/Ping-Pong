<template>
  <div>
    <h2 class="fw-bold mt-2">打球場地搜尋</h2>
    <div>
      <label>縣市：</label>
      <select v-model="city">
        <option value="高雄市">高雄市</option>
        <option value="台北市">台北市</option>
        <option value="新北市">新北市</option>
        <!-- 可以加更多選項 -->
      </select>

      <label>關鍵字：</label>
      <input v-model="keyword" placeholder="輸入場地名稱或類型" />

      <button @click="getGymData">搜尋</button>
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
    getGymData() {
      const url = `https://iplay.sa.gov.tw/odata/GymSearch?$format=application/json;odata.metadata=none&City=${this.city}&$filter=contains(Name, '${this.keyword}')`;
      axios.get(url).then((res) => {
        this.gyms = res.data.value; // 賦值搜尋結果
      });
    },
  },
};
</script>
  