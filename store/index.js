import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		// height:100
		SET_STATUS_BAR:0, // 状态栏高度
		SET_CUSTOM_BAR:0, // 状态栏 + 导航栏的高度
	},
    mutations: {},
    actions: {}
})

export default store