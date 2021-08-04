//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

//引入axios
import axios from './axios'
//引入store
import store from './store'
import qs from 'qs'


//引入element-ui 全部引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//按需引入
//import { Button, Form,Input,FormItem } from 'element-ui';

//关闭Vue的生产提示
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI)

/*
Vue.component('el-button', Button);
Vue.component('el-form', Form);
Vue.component('el-input', Input);
Vue.component('el-form-item', FormItem);*/

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	router:router,
	store
})
