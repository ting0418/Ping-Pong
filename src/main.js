import { createApp } from "vue";
// swiper
import "swiper/swiper-bundle.css";
// vue3-loading-overlay"
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import axios from "axios";
import VueAxios from "vue-axios";
import "../src/assets/all.scss";
import { currency, date } from "../src/methods/filters";
// animate
import "animate.css";
// bootstrap js
import "bootstrap";
import messageState from "./methods/messageState";
// css
import "./style.css";

// Aos
import AOS from "aos";
import "aos/dist/aos.css";

// vee-validate
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

import App from "./App.vue";
import router from "./router";
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
// aos init
AOS.init({
  duration: 2000, // 動畫持續時間（毫秒）
  offset: 200,
  once: true,
});
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.component("Loading", Loading);
app.mount("#app");
