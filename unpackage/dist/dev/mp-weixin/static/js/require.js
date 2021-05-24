import {api} from "@/static/js/api.js"
// 存放所有接口
const _request = (url,option) =>{
	return new Promise((resolve,rejuct)=>{
		api(url,option).then((res)=>{
			resolve(res)
		},(err)=>{
			rejuct(err)
		}).catch((err)=>{
			rejuct(err)
		})
	})
	
}

const login =(data)=> {return _request('webService.aspx',{data:data})} // 货六六
// const login =(data)=> {return _request('mobile_xiaochengxu.aspx',{data:data})} // 冠雄
export {
	login
} 

