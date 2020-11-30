// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.css'
import {Window} from '@/lib/maui.min.js'
import Vuex from 'vuex'
import '@/assets/style/index.css'
import VueI18n from 'vue-i18n'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Window);
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Vant);
const i18n = new VueI18n({
  locale: localStorage.getItem('lang')||'xb', // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./VueI18n/language-zh'),  //
    'xb': require('./VueI18n/language-xb')
  }
});

Vue.filter("toFixed2", (value) => {
	if (!value) return 0.00
	return value.toFixed(2)
});

import moment from 'moment'

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
