<template>
  <div class="mt-5">
    <ul class="list-unstyled bg-color rounded p-3">
      <li
        v-for="item in menuItems"
        :key="item"
        :class="{ active: selectedItem === item }"
        class="menu-item text-center"
        @click="selectCategory(item)"
      >
        <a class="menu-link fw-bold cursor-pointer">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    selectedCategory: {
      type: String,
      default: "全部商品",
    },
  },
  data() {
    return {
      selectedItem: this.selectedCategory || "全部商品",
      menuItems: ["全部商品", "球皮", "球鞋", "球拍", "配件"],
    };
  },

  methods: {
    selectCategory(category) {
      this.selectedItem = category;

      this.$emit("category-selected", this.selectedItem);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #e9e9d7;
  border-radius: 20px;
}
.cursor-pointer {
  cursor: pointer;
}

.bg-color {
  background: #4d453e;
  border-radius: 8px;
  padding: 10px;
}

.menu-item {
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-link {
  font-size: 1.25rem; /* 增加字體大小 */
  color: #d05432;
  text-decoration: none;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: white;
}
</style>
