// const baseUrl = "https://www.hyk56.net/";// 冠雄
const baseUrl = "https://www.hyk56.com/"; // 货六六
export const api = (url,option={})=>{
	console.log(`${baseUrl}${url}`);
	uni.showLoading({
	    title: '加载中'
	});
	let dat = option.data||{};
	dat.pwd = 'zzxxyyffttdgchdbggf1kisjhen';
 	return new Promise((resolve,rejuct)=>{
			uni.request({
				url:`${baseUrl}${url}`,
				method:option.method || 'POST',
				data:dat,
				header:{'content-type':'application/x-www-form-urlencoded'},
				success:(res)=>{
					resolve(res)
					// console.log("看看res",JSON.stringify(res));
				},
				fail:(err)=>{
					rejuct(err);
					console.log("失败");
				},
				complete:()=>{
					setTimeout(function () {
					    uni.hideLoading();
					}, 200);
				}
			})
	})
	
}
