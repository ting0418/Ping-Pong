import { createApp } from "vue";
import "swiper/swiper-bundle.css";
import App from "./App.vue";
import router from "./router";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import axios from "axios";
import VueAxios from "vue-axios";
import "../src/assets/all.scss";
import { currency, date } from "../src/methods/filters";
import "animate.css";
import "bootstrap";
import messageState from "./methods/messageState";
import "./style.css";
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import "aos/dist/aos.css"; // 引入 AOS 的 CSS 文件
import AOS from "aos"; // 引入 AOS
import { required, email, min } from "@vee-validate/rules";
import { once } from "process";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

// 配置錯誤訊息
configure({
  validateOnInput: true,
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} 為必填項目`,
      email: `${ctx.field} 必須是有效的電子郵件地址`,
    };
    return messages[ctx.rule.name] || `此項目無效`;
  },
});
const app = createApp(App);
app.config.globalProperties.$filters = { date, currency };
app.config.globalProperties.$messageState = messageState;
app.use(VueAxios, axios);
app.use(router);

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);

app.component("Loading", Loading);
app.mount("#app");
AOS.init({
  duration: 2000, // 動畫持續時間（毫秒）
  offset: 200,
  once: true,
});
