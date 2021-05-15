const baseUrl = "https://www.hyk56.net/";
export const api = (url,option={})=>{
	console.log(`${baseUrl}${url}`);
	uni.showLoading({
	    title: '加载中'
	});
 	return new Promise((resolve,rejuct)=>{
			uni.request({
				url:`${baseUrl}${url}`,
				method:option.method || 'POST',
				data:option.data||{},
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
