// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import Login from '../components/Login'
import Index from '../components/Index'
import Main from '../components/main/Main.vue'
import Home from '../components/sys/Home.vue'

import store from '../store/index'
import axios from '../axios/index'


//创建并暴露一个路由器
const router = new VueRouter({
	mode: 'history',
	routes: [

		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/index',
			name: 'Index',
			component: Index,
			children: [{
				path: '/main',
				name: 'main',
				component: Main,
				children: [{
					path: '/home',
					name: 'Home',
					component: Home
				}]
			}]
		}, {
			path: '/',
			name: 'login',
			component: Login
		}
		
	]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
	if (to.path === '/login' || to.path === '/') {
		store.commit("clearMenuAll")
		next();
	} else {
		let token = localStorage.getItem('Authorization');

		if (token === 'null' || token === '' || token === null) {
			store.commit("clearMenuAll")
			next('/login');
		} else {
			next();
		}
	}


	const au = localStorage.getItem("Authorization");

	if (au) {
		
		var flag = router.options.routes[1].children[0].children.length
		if (flag <= 1) {
			axios.get(`http://localhost:8082/sysMenu/getMenuList`, {
				headers: {
					Authorization: localStorage.getItem("Authorization")
				}
			})
				.then(function (response) {
					//设置到全局参数中
					store.commit("setMenuList", response.data.data)
					//设置权限
					//store.state.commit("setPermList",response.data.data)

					//动态绑定路由
					let newRouter = router.options.routes
					response.data.data.forEach(menu => {
						if (menu.childMenu) {
							menu.childMenu.forEach(e => {
								//1.转成路由
								let router = menuToRouter(e)
								//2.把路由添加到路由器中
								if (router) {
									newRouter[1].children[0].children.push(router)
								}
							})
						}

						router.addRoutes(newRouter)
						store.commit("changeHashRouter", true)
					})
				})
				.catch(function (error) {
					console.log("roter", error);
				});
		}

	}
	next();

});


//菜单转路由
const menuToRouter = (menu) => {
	if (!menu.component) {
		return null
	}
	let router = {
		name: menu.component,
		path: menu.menuPath,
		meta: {
			icon: menu.menuIcon,
			title: menu.menuName
		},
		component: () => import('@/components/' + menu.componentDir + menu.component + '.vue')
	}
	return router
}

export default router;