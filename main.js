import Vue from 'vue'
import { $http } from '@escook/request-miniprogram'
import store from './store/store.js'
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({ title: '数据加载中...', })

	// 判断请求的是否为有权限的 API 接口
	if (options.url.indexOf('/my/') !== -1) {
		// 为请求头添加身份认证字段
		options.header = {
			// 字段的值可以直接从 vuex 中进行获取
			Authorization: store.state.m_user.token,
		}
	}
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}

//封装一个“数据请求失败的提示”方法
uni.$showMsg = function(title = '数据加载失败啦~', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})

}



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({ ...App, store })
app.$mount()
