 //引入Vue核心库
 import Vue from 'vue'
 //引入Vuex
 import Vuex from 'vuex'

 import menus from './modules/menu'

 import loginUser from './loginUser/index'


 //应用Vuex插件
 Vue.use(Vuex)
 
 //准备actions对象——响应组件中用户的动作
 const actions = {}
 //准备mutations对象——修改state中的数据
 const mutations = {
     // 修改token，并将token存入localStorage
    changeLogin (state, user) {
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
      }
 }
 //准备state对象——保存具体的数据
 const state = {
     // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
 }
 
 //创建并暴露store
 export default new Vuex.Store({
     actions,
     mutations,
     state,
     modules:{
         menus,loginUser
     }
 })
