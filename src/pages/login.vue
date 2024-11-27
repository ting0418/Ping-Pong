<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            v-model="user.username"
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button
            class="btn btn-danger"
            type="button"
            @click="backFrontStage()"
          >
            不是管理員嗎?
          </button>
          <button class="btn btn-primary" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
  <ToastMsg></ToastMsg>
</template>
<script>
import ToastMsg from "../components/ToastMsg.vue";
import axios from "axios";
import mitt from "mitt";
const emitter = mitt();
export default {
  components: {
    ToastMsg,
  },
  provide() {
    return {
      emitter,
    };
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    signIn() {
      const api = `${import.meta.env.VITE_API}admin/signin`;
      axios.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data;

          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          emitter.emit("push-message", {
            style: "success",
            title: "登入成功",
            message: res.data.message,
          });
          setTimeout(() => {
            this.$router.push("/dashboard/products");
          }, 1000);
        } else {
          emitter.emit("push-message", {
            style: "danger",
            title: "登入失敗，請再試一次",
            message: res.data.message,
          });
        }

        console.log(res);
      });
    },
    backFrontStage() {
      this.$router.push("/");
    },
  },
};
</script>