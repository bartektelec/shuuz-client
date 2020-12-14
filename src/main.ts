import { createApp } from "vue";
import "./axios";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store";
import "./assets/styles/tailwind.css";
import "./assets/styles/fonts.css";

import Spinner from "@/components/atoms/Spinner.vue";
import Alert from "@/components/atoms/Alert.vue";
import BaseSelect from "@/components/atoms/BaseSelect.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import BaseInput from "@/components/atoms/BaseInput.vue";
import Container from "@/components/atoms/Container.vue";
import Icon from "@/components/atoms/Icon.vue";

import Modal from "@/components/molecules/Modal.vue";
import Toastie from "@/components/molecules/Toastie.vue";

createApp(App)
  .component("Spinner", Spinner)
  .component("Toastie", Toastie)
  .component("Modal", Modal)
  .component("Alert", Alert)
  .component("BaseSelect", BaseSelect)
  .component("BaseButton", BaseButton)
  .component("BaseInput", BaseInput)
  .component("Container", Container)
  .component("Icon", Icon)
  .use(store)
  .use(router)
  .mount("#app");
