<template>
	<view class="whole">
		<view class="centerBox" v-show="!isloading">
			<text class="loginText">{{isforget?'修改密码':'登录'}}</text>
			<view class="photoBox">
				<text class="iconfont icon-zhanghao loginicon"></text>
				<input type="text"  placeholder="账号" v-model="userCount"/>
			</view>
			<view class="codeBox">
				<text class="iconfont icon-mima loginicon"></text>
				<input type="password" :placeholder="isforget?'输入旧密码':'密码'"  v-model="userPsw"/>
			</view>
			<view class="codeBox" v-if="isforget">
				<text class="iconfont icon-mima loginicon"></text>
				<input type="password" :placeholder="isforget?'输入新密码':'密码'"  v-model="userPsw"/>
			</view>
			<button class="loginBtn" @click="login">{{isforget?'确认修改':'登录'}}</button>
			<!-- <view class="forget">{{isforget?'去登录':'修改密码?'}}</view> -->
		</view>
		<view class="loading" v-show="isloading">
			<image src="../../static/image/loading.gif" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {login} from "@/static/js/require.js" 
	export default {
		data() {
			return {
				title: '这是首页',
				userCount:"",
				userPsw:"",
				isloading:false,
				isforget:false,// 是否修改密码
				newPsw:'',// 新密码
			}
		},
		created(){
			// if(this.$tool.getstorage("lg")){
			// 	this.$tool.jump_switch("/pages/home/home")
			// }else{
			// 	this.isloading = false;
			// }
		},
		onLoad() {
			
		},
		methods: {
			// forgetPsw(){
			// 	// 忘记密码 或者 去登录
			// 	this.isforget = !this.isforget;
			// },
			login(){
				// 点击登录
				if(!this.userCount.trim()) {
					this.$tool.showTip("请输入账号！") 
					return
				}
				if(!this.userPsw.trim()){
					this.$tool.showTip("请输入密码！")
					return
				}
				if(this.isforget){ // 修改密码
					this.resetPsw();
					return
				}
				let that = this;
				if(!this.$tool.getstorage("openid")){
					uni.login({
						success(res){
							console.log("code",res);
							let dat = {
								functionType:22,
								Code:res.code
							}
							that.$api(dat).then(res=>{
								if(res.data.MsgID==1){
									let openid = res.data.Msg;
									that.gologin(openid);
									that.$tool.setstorage("openid",openid);
								}else{
									that.$tool.showTip(res.data.Msg)
								}
							})
						}
					})	
						
				}else{
					that.gologin(that.$tool.getstorage("openid"));
				}
              },
			updataPsw(){
				if(!this.newPsw.trim()){
					this.$tool.showTip("请输入新密码！")
					return
				}
				let dat = {
					functionType:8,
					xieyikehuID:'',
					oldPwd:this.userPsw,
					newPwd:this.newPsw
				}
				this.$api().then(res=>{
					
				})
			},
			gologin(openid){
				let dat = {
					functionType:4,
					vipUserName:this.userCount,
					vipPwd:this.userPsw,
					weixinID:openid
				}
				login(dat).then(res=>{
					// console.log("登录信息",res);
					if(res.data.MsgID==1){
						this.$tool.showTip("登录成功");
						let rel = JSON.parse(res.data.Msg); 
						this.$tool.setstorage("xykh_id",rel.ds[0].xykh_id);
						setTimeout(()=>{
							this.$tool.jump_back();
						},500);
					}else{
						this.$tool.showTip("账号或密码错误！");
					}
				},err=>{
					console.log("失败信息",err);
				})
			},
			jump_nav(){
				this.$tool.jump_nav('/pages/checklogistics/checklogistics');
			}
		}
	}
</script>

<style lang="scss">
	.whole{
		width: 100vw;
		height: 100vh;
		padding: 0 46upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.centerBox{
		width: 100%;
	}
	.loginText{
		color: #333;
		font-size: 56upx;
		font-weight: bold;
		letter-spacing: 8upx;
	}
	.photoBox,.codeBox{
		display: flex;
		align-items: center;
		margin-bottom: 62upx;
		border-bottom: 2upx solid #dedede;
		padding-bottom: 20upx;
	}
	.photoBox{
		margin-top: 100upx;
	}
	.loginicon{
		font-size: 46upx;
		color: #5897E3;
	}
	.photoBox>.loginicon{
		font-size: 52upx;
	}
	.photoBox>input,.codeBox>input{
		flex: 1;
		margin-left: 32upx;
		font-size: 32upx;
	}
	.loginBtn{
		width: 609upx;
		height: 90upx;
		border-radius: 20upx;
		background-color: #5393FD;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 34upx;
		letter-spacing: 8upx;
		margin-top: 140upx;
	}
	.loading{
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		background-color: #FFFFFF;
		z-index: 99;
	}
	.forget{
		text-align: right;
		padding-right: 20upx;
		margin-top: 40upx;
		box-sizing: border-box;
		color: $all-font-Tcolor;
	}
</style>
