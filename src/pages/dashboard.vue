<template>
  <NavBar />
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view />
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import emitter from "../methods/emitter";
import ToastMessages from "../components/ToastMsg.vue";
import axios from "axios";
export default {
  components: {
    NavBar,
    ToastMessages,
  },
  provide() {
    return { emitter };
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // console.log(token);

    this.$http.defaults.headers.common.Authorization = token;

    const api = `${import.meta.env.VITE_API}api/user/check`;

    axios.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push("/login");
      }
    });
  },
};
</script>