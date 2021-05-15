<template>
	<view class="content">
		<view class="header">
			<image src="../../static/image/banner.jpg"></image>
		</view>
		<view class="ullist">
			<view class="items">
				<view class="iconBox iconfont icon-yuyue">
				</view>
				<view class="titleBox" @click="jump(1)">
				   <text class="itemTitle">预约寄件</text>
				   <text class="itemDle">支持2小时上门取件</text>
				</view>
			</view>
			
			<view class="items">
				<view class="iconBox iconfont icon-jijianfasong-xianxing">
					
				</view>
				<view class="titleBox" @click="jump('other')">
				   <text class="itemTitle">我的寄件</text>
				   <text class="itemDle">查看预约寄件</text>
				</view>
			</view>
			
			<view class="items">
				<view class="iconBox iconfont icon-B">
					
				</view>
				<view class="titleBox" @click="jump(2)">
				   <text class="itemTitle">查询物流</text>
				   <text class="itemDle">快捷查询物流</text>
				</view>
			</view>
			
			<view class="items">
				<view class="iconBox iconfont icon-tubiao_kucun">
					
				</view>
				<view class="titleBox" @click="jump(3)">
				   <text class="itemTitle">查看库存</text>
				   <text class="itemDle">查看库存总量</text>
				</view>
			</view>
			
			<view class="items">
				<view class="iconBox iconfont icon-mingxi">
					
				</view>
				<view class="titleBox" @click="jump(4)">
				   <text class="itemTitle">发货明细</text>
				   <text class="itemDle">查询发货明细</text>
				</view>
			</view>
			
			<view class="items">
				<view class="iconBox iconfont icon-zhangdan">
					
				</view>
				<view class="titleBox" @click="jump(5)">
				   <text class="itemTitle">查看账单</text>
				   <text class="itemDle">在线查看账单</text>
				</view>
			</view>
			
			
			
			<view class="items">
				<view class="iconBox iconfont icon-lianxiwomen">
					
				</view>
				<view class="titleBox">
				   <text class="itemTitle">联系我们</text>
				   <text class="itemDle">问题咨询</text>
					<button class="linkbtn" open-type="contact"></button>
				</view>
			</view>
		</view>
		<!-- 查看我的预约寄件 -->
		
		<!-- <view class="gzhBox" @click="jump('other')">
			<view class="hzBox">
			    我的寄件
			</view>
		</view> -->
		<!-- 关注公众号的盒子 -->
<!-- 		<view class="gzhBox">
			<view class="close iconfont icon-guanbi"></view>
			<text>关注公众号，随时接收物流消息</text>
			<button type="default" class="gzBtn">去关注</button>
		</view> -->
	</view>
</template>

<script>
	import {login} from "@/static/js/require.js"
	export default {
		 onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '华秀物流',
		      path: '/pages/index/index'
		    }
		  },
		data() {
			return {
				title: '这是首页'
			}
		},
		created(){
			// this.$tool.set
		},
		mounted(){
			// console.log(this.$api)
		},
		onLoad() {
			this.getopenid();
		},
		methods: {
			getopenid(){
				let that = this;
				if(!this.$tool.getstorage("openid")){
					uni.login({
						success(res){
							let dat = {
								functionType:22,
								Code:res.code
							}
							that.$api(dat).then(res=>{
								if(res.data.MsgID==1){
									let openid = res.data.Msg;
									that.$tool.setstorage("openid",openid);
								}else{
									that.$tool.showTip(res.data.Msg)
								}
							})
						}
					})	
				}
			},
			jump(nav){
				// console.log(nav);
				this.$tool.setstorage("pram","");
				this.$tool.setstorage("pram2","");
				let kh_id = this.$tool.getstorage("xykh_id");
				if((nav == 3 || nav == 4 || nav == 5 || nav=="other") && !kh_id ){ // 查看库存 和发货明细需要登录
					this.$tool.jump_nav("/pages/login/login")
					return
				}
				if(nav == "other"){
					this.$tool.jump_nav('/pages/sendThing/sendThing');
					return
				}
				if(nav == 4 || nav == 5 ||  nav == 3){
					this.$tool.setstorage("pageType",nav);
					this.$tool.jump_nav(`/pages/checkSite/checkSite?ix=${nav}`);
					return;
				}
				let arr = ["/pages/appoint/appoint",
						   `/pages/logisticsinfo/logisticsinfo`,
						   `/pages/orderlist/orderlist?ix=${nav}`,
						   `/pages/checkSite/checkSite?ix=${nav}`,
				]
				if(nav == 2){
					this.$tool.jump_switch(`/pages/logisticsinfo/logisticsinfo`);
					return
				}
				this.$tool.jump_nav(arr[nav - 1]);
			},
			jump_nav(){
				tools.jump_nav('/pages/checklogistics/checklogistics');
			},
			linkOur(){
				uni.makePhoneCall({
				    phoneNumber: '0738-6608' //仅为示例
				});
			},
			
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		background-color:$self-body-bgColor;
	}
	.header{
		width: $all-width;
		height: 261upx;
		border-radius: 20upx;
		// background-color: $uni-color-primary;
		margin-top: 18upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		// background:  no-repeat /100% 100%;
	}
	.header>image{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.ullist{
		width: $all-width;
		display: flex;
		flex-wrap: wrap;
		margin-top: 17upx;
		border-radius: 20upx;
		overflow: hidden;
		background-color: #FFFFFF;
		.items{
			width: 50%;
			height: 172upx;
			background-color: #FFFFFF;
			box-sizing: border-box;
			display: flex;
			border-bottom:2upx solid #EFEFEF;
			align-items: center;
			justify-content: center;
			padding-left: 18upx;
			box-sizing: border-box
		}
	}
	.ullist>.items:nth-child(2n+1){
		border-right:2upx solid #EFEFEF;
	}
	.iconBox{
		width: 62upx;
		height: 62upx;
		border-radius: 50%;
		background-color: #DEECFF;
	}
	.titleBox{
		padding-left: 12upx;
		box-sizing: border-box;
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.itemTitle,.itemDle{
		color: #333;
		font-weight: bold;
		font-size: 28upx;
	}
	.itemDle{
		color: #A2A2A2;
		font-weight: 400;
		margin-top: 18upx;
	}
	// .gzhBox{
	// 	width: $all-width;
	// 	background-color: #484848;
	// 	height: 94upx;
	// 	border-radius: 47upx;
	// 	display: flex;
	// 	position: fixed;
	// 	bottom: 80upx;
	// 	// margin-top: 18upx;
	// 	align-items: center;
	// 	padding: 0 32upx;
	// 	box-sizing: border-box;
	// 	justify-content: space-between;
	// 	text{
	// 		color: #FFFFFF;
	// 		font-size: 28upx;
	// 		// margin-left: 28upx;
	// 	}
	// 	.close{
	// 		flex-shrink: 0;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		color: #FFFFFF;
	// 		font-size: 46upx;
	// 	}
	// 	.gzBtn{
	// 		// #6D6D6D #5897E3
	// 		width: 165upx;
	// 		height: 60upx;
	// 		border-radius: 30upx;
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		color: #FFFFFF;
	// 		font-size: 26upx;
	// 		margin: 0;
	// 		background-image:linear-gradient(to right,#5097E8,#377BFB) ;
	// 	}
	// }
	
	.gzhBox{
		width: 150upx;
		height: 60upx;
		// background-color: red;
		position: fixed;
		right: 0;
		bottom: 100upx;
		overflow: hidden;
		// border-radius: ;
	}
	.hzBox{
		width: 200upx;
		height: 60upx;
		border-radius: 40upx;
		background-color: $all-font-Tcolor;
		// background-color: ;
		background-image: linear-gradient(to right,#5393FD,#FA7240);
		color: #fff;
		font-size: 26upx;
		display: flex;
		line-height: 60upx;
		// align-items: center;
		padding-left: 26upx;
		box-sizing: border-box;
	}
	.iconBox{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 42upx;
		color: #5C96FC;
	}
	.linkbtn{
		position: absolute;
		z-index: 9;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		opacity: .01;
	}
</style>
