//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import router from '@/router'


//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {
    setMenuList(state, menus) {
        state.menuList = menus
    },
    changeHashRouter(state, hashRouter) {
        state.hashRouter = hashRouter
        sessionStorage.setItem("hashRouter", hashRouter)
    },
    clearMenuAll(state){
        sessionStorage.clear()
        localStorage.clear()
        state.menuList = []
        state.perMList = []
        state.hashRouter = false
        router.options.routes[1].children[0].children=[]
        state.editableTabs = [{
            title: '首页',
            name: 'Home'
        }]
        state.editableTabsValue = "Home"
    },
    //新增标签
    addTab(state, tab) {
        let index = state.editableTabs.findIndex(e=>e.title === tab.menuName);
        if(index === -1){
            state.editableTabs.push({
                title: tab.menuName,
                name: tab.component
            });
        }
        state.editableTabsValue = tab.component
        if(index === 0){
            router.push({name:tab.component})
        }
    }
}
//准备state对象——保存具体的数据
const state = {
    //菜单列表
    menuList: [],
    //权限列表
    perMList: [],
    //是否查询过菜单标识
    hashRouter: false,
    //标签信息
    editableTabsValue: 'Home',
    editableTabs: [{
        title: '首页',
        name: 'Home'
    }]
}

//创建并暴露store
export default {
    actions,
    mutations,
    state
}
