import Vue from 'vue'
import App from './App'
// 按需导入$http
import {$http} from '@escook/request-miniprogram'
// 导入store的实例对象
import store from './store/store.js'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 封装数据请求失败的函数
uni.$showMsg = function(title='数据加载失败', duration = 1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'

//请求拦截器
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title:"数据加载中..."
  })
}

//响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
  // 将store挂载到vue的实例对象上
  store
})
app.$mount()
