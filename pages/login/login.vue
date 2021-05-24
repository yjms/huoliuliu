<template>
	<view class="whole">
		<view class="centerBox" v-show="!isloading">
			<text class="loginText">{{isforget?'注册':'登录'}}</text>
			<view class="photoBox">
				<text class="iconfont icon-zhanghao loginicon"></text>
				<input type="text"  placeholder="手机号" v-model="userCount"/>
			</view>
			<!-- <view class="codeBox">
				<text class="iconfont icon-mima loginicon"></text>
				<input type="password" :placeholder="isforget?'密码':'密码'"  v-model="userPsw"/>
			</view> -->
		<!-- 	<view class="codeBox" v-if="isforget">
				<text class="iconfont icon-mima loginicon"></text>
				<input type="password" :placeholder="isforget?'输入新密码':'密码'"  v-model="userPsw"/>
			</view> -->
			<!-- <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button> -->
			<button class="loginBtn" @click="getUserInfo" >{{isforget?'确定':'注册并登录'}}</button>
			<!-- <view class="forget" @click="forgetPsw">{{isforget?'去登录':'注册'}}</view> -->
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
				openid:'',// openid
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
			this.login();
		},
		methods: {
			isPoneAvailable(val) {
				// 验证手机号
				var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if (!myreg.test(val)) {
					return false;
				} else {
					return true;
				}
			},
			getUserInfo(e){
				// 点击登录
				if(!this.isPoneAvailable(this.userCount.trim())) {
					this.$tool.showTip("请正确手机号！") 
					return
				}
				// if(!this.userPsw.trim()){
				// 	this.$tool.showTip("请输入密码！")
				// 	return
				// }
				let that = this;
				uni.getUserProfile({
				      desc: 'Wexin', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				      success: (res) => {
						// console.log("看看res",res);
						this.registLogin(res.userInfo);
				      }
				    })
			},
			forgetPsw(){
				// 忘记密码 或者 去登录
				// this.isforget = !this.isforget;
			},
			login(){
					let that = this;
					if(this.$tool.getstorage("openid")){
						this.openid = this.$tool.getstorage("openid");
						return
					}
					uni.login({
						success(res){
							console.log("code",res);
							let dat = {
								functionType:38,
								Code:res.code,
							}
							that.$api(dat).then(res=>{
								if(res.data.MsgID==1){
									let openid = res.data.Msg;
									that.openid = openid;
									that.$tool.setstorage("openid",openid);
								}else{
									that.$tool.showTip(res.data.Msg)
								}
							})
						}
					})	
             },
			registLogin(obj){
				//注册登录
				// console.log("obj",obj);
				// return
				let dat = {
					functionType:9,
					openID:this.openid,
					nickname:obj.nickName,
					sex:'',
					province:obj.province,
					city:obj.city,
					headimgurl:obj.avatarUrl,
					mobile:this.userCount
				}
				this.$api(dat).then(res=>{
					if(res.data.MsgID==1){
						this.$tool.showTip("登录成功");
						let rel = JSON.parse(res.data.Msg); 
						this.$tool.setstorage("userInfo",rel);
						setTimeout(()=>{
							this.$tool.jump_back();
						},500);
					}else{
						this.$tool.showTip(res.data.Msg);
					}
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
