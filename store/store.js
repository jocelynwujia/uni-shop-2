// 导入vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
//1. 导入购物车的vuex模块
import moduleCart from './cart.js'
// 导入用户的vuex模块
import moduleUser from './user.js'
// 将vuex注册为vue的插件
Vue.use(Vuex)

// 创建vue的实例对象
const store = new Vuex.Store({
  // 挂载store模块
  modules:{
    // 2.挂载购物车的vuex模块,模块内成员的访问路径被调整为m_cart
    m_cart: moduleCart,
    // 挂载购物车的vuex模块,模块内成员的访问路径被调整为m_user
    m_user: moduleUser
  },
})

// 向外共享store的实例对象
export default store
