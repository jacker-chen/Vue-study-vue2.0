// 1. 引入
import axios from "axios";
import router from "../router";


var ui = require('element-ui')

// 2. 创建实例
const instance = axios.create(config)

// 3. 全局配置信息
let config = {
    // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
    baseURL: "http://127.0.0.1:8082",
    // 请求超时时间
    timeout: 10000,
    // 每次请求携带cookie
    withCredentials: true,
    
}
instance.defaults.baseURL="http://127.0.0.1:8082"
// 请求拦截
instance.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    (err) => {
        console.log('err', err);
        Promise.reject(err);
    }
)
/* 响应拦截器 */

instance.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
    console.log("axios",response)//返回401
    if (response.data.code === 401 || response.data.code === '401' || response.data.code === '400') {

        localStorage.removeItem('Authorization') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
        /*
           router.replace({
        
               path: '/login' // 到登录页重新获取token
        
           })*/
        router.push("/login")

    } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token

        //Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)

    }

    return response

}, function (error) {
    console.log("响应错误");
    // 响应头发生错误发生的操作
    if (error.response.status) {
        switch (error.response.status) {
            // 在登录成功后返回当前页面，这一步需要在登录页操作。                
            // 401 token过期                
            // 登录过期对用户进行提示                
            // 清除本地token和清空sessionStorage的             
            // // 跳转登录页面                
            case 401:
                // 清除token                    
                localStorage.removeItem('Authorization');
                ui.Message({
                    message: error.response.data.msg || '页面加载失败',
                    type: 'warning'
                })
                // this.$message.error="token已过期";
                // store.commit('loginSuccess', null);                    
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                this.$message.error("登入已经过期")

                break;
            // 404请求不存在                /*  */
            case 403:
                this.$message.error('没有权限');

                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                break;
            case 400:
                this.$message.error('请求错误');
                // localStorage.removeItem('token');                    
                // store.commit('loginSuccess', null);                    
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                break;
            // 其他错误，直接抛出错误提示                
            default:
        }
        return Promise.reject(error.response)
    }

})

// 4. 导出
export default instance