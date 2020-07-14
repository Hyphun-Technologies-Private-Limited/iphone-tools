import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import cnt from './locales/cntranditional.json'
import cns from './locales/cnsimplified.json'
import Pagination from 'laravel-vue-pagination';
import VueProgressBar from "vue-progressbar";
import VueElectronJSONStorage from 'vue-electron-json-storage';
import VModal from 'vue-js-modal';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import JsonCSV from 'vue-json-csv';
import VTooltip from 'v-tooltip';
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueSocketIOExt from 'vue-socket.io-extended';
const storage = require('electron-json-storage');
import io from 'socket.io-client';
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
const socket = io('http://178.128.21.236/');
Vue.prototype.$UserApiKey = '';
Vue.prototype.$locale = 'cns';
Vue.use(VModal);
Vue.component('downloadCsv', JsonCSV);
Vue.use(VTooltip);
Vue.use(PerfectScrollbar);
const options = {
  color: "rgba(118,128,255,.98)",
  failedColor: "#874b4b",
  thickness: "2px",
  transition: {
    speed: "0.3s",
    opacity: "0.6s",
    termination: 300
  },
  autoRevert: true,
  location: "right",
  inverse: false
};

const alertoptions = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueProgressBar, options);
Vue.use(Pagination);
Vue.use(VueSocketIOExt, socket);
Vue.use(VueI18n);
//Vue.use(VueElectronStorage);
Vue.use(VueFriendlyIframe);
Vue.use(VueElectronJSONStorage);
Vue.use(VueSweetalert2, alertoptions);
Vue.config.productionTip = false

const messages = { en: en, cnt: cnt,cns:cns };


const i18n = new VueI18n({
  locale: Vue.prototype.$locale,
  fallbackLocale: 'cns',
  messages
});

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
//var ve = this;
// storage.get('locale', (err, data) => {
//   //console.log(Vue.prototype.$locale);
//   //ve.$i18n.locale = data;
//   //this.prototype.$locale = data;
// })

storage.get('apikey', (err, data) => {
  Vue.prototype.$UserApiKey = data;
})

//storage.get('locale', (err, data) => {
Vue.$locale = 'cns';
storage.set('locale', 'cns', () => {});
//})