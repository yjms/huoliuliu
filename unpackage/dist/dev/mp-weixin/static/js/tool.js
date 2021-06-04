class tools {
	constructor(arg) {

	}
	jump_nav(url) {
		// console.log("查看url",url);
		uni.navigateTo({ // 不请空页面栈跳转
			url: `${url}`,
			animationType: 'pop-in',
			animationDuration: 200
		})
	}
	jump_red(url) { //情况当前页面栈跳转
		uni.redirectTo({ 
			url: `${url}`,
			animationType: 'pop-in',
			animationDuration: 200
		})
	}
	jump_run(url) { // 清空所有页面栈跳转
		uni.reLaunch({
			url: `${url}`,
			animationType: 'pop-in',
			animationDuration: 200
		})
	}
	jump_switch(url) { // 导航栏跳转
		uni.navigateTo({ // 不请空页面栈跳转
			url: `${url}`,
			animationType: 'pop-in',
			animationDuration: 300
		})
	}
	swith_nav(url){// 导航栏跳转
		uni.switchTab({
			url: `${url}`,	
		})
	}
	jump_back(url) { // 返回 传数字
		uni.navigateBack({
			delta: `${url}`,
		});
	}
	jump_pre(url) { // 预加载跳转 
		uni.preloadPage({
			url: `${url}`
		});
	}
	showTip(val,type="none"){ // 轻提示  默认没图标
		uni.showToast({
			title:val,
			icon:type,
			mask:true
		})
	}
	setstorage(key="",val=""){// 存缓存
		uni.setStorageSync(key,val);	
	}
	getstorage(key){
		return uni.getStorageSync(key)
	}
	getHeight(){
		let that = this;
		return new Promise((resolve,rejuct)=>{
			uni.getSystemInfo({
			    success: (e=any) => {
			      // this.compareVersion(e.SDKVersion, '2.5.0')
			      let statusBar = 0;
			      let customBar = 0;
			      
			      
			      // #ifdef MP
			      statusBar = e.statusBarHeight
			      customBar = e.statusBarHeight + 45
			      if (e.platform === 'android') {
			        this.$store.commit('SET_SYSTEM_IOSANDROID', false)
			        customBar = e.statusBarHeight + 50
			      }
			      // #endif
			      
			      
			      // #ifdef MP-WEIXIN
			      statusBar = e.statusBarHeight
			      // @ts-ignore
			      const custom = wx.getMenuButtonBoundingClientRect()
			      customBar = custom.bottom + custom.top - e.statusBarHeight
			      // #endif
			
			
			      // #ifdef MP-ALIPAY
			      statusBar = e.statusBarHeight
			      customBar = e.statusBarHeight + e.titleBarHeight
			      // #endif
			
			
			      // #ifdef APP-PLUS
			      console.log('app-plus', e)
			      statusBar = e.statusBarHeight
			      customBar = e.statusBarHeight + 45
			      // #endif
			
			
			      // #ifdef H5
			      statusBar = 0
			      customBar = e.statusBarHeight + 45
			      // #endif
			
				// 这里你可以自己决定存放方式，建议放在store中，因为store是实时变化的
			      // that.$store.commit('SET_STATUS_BAR', statusBar);
			      // that.$store.commit('SET_CUSTOM_BAR', customBar);
			      // that.$store.commit('SET_SYSTEM_INFO', e);
				  resolve({SET_STATUS_BAR:statusBar,SET_CUSTOM_BAR:customBar})
			    },
				fail(err){
					rejuct(err)
				}
			})
		})
		
	}
}
export default {
	jump_nav: (new tools).jump_nav,
	jump_red: (new tools).jump_red,
	jump_run: (new tools).jump_run,
	jump_switch: (new tools).jump_switch,
	jump_back: (new tools).jump_back,
	jump_pre: (new tools).jump_pre,
	showTip:(new tools).showTip,
	setstorage:(new tools).setstorage,
	getstorage:(new tools).getstorage,
	getHeight:(new tools).getHeight,
	swith_nav:(new tools).swith_nav,
}
