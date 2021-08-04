
 //准备actions对象——响应组件中用户的动作
 const actions = {}
 //准备mutations对象——修改state中的数据
 const mutations = {
     setLoginUser(state,val){
        state.loginUser.username = val.username
        state.loginUser.token = val.token
        localStorage.setItem("username",val.username)
     }
 }
 //准备state对象——保存具体的数据
 const state = {
     loginUser:{
         username:''||localStorage.getItem("username"),
         token:''
     }
   }
const getters = {
    username:(state)=>state.loginUser.username
}
 
 //创建并暴露store
 export default {
     actions,
     mutations,
     state,
     getters
 }