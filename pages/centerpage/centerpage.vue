<template>
	<view class="whole">
		<!-- 这是个人中心页面 -->
		<view class="statusBox" :style="{height:statusBox}">
			
		</view>
		<view class="headerBox" :style="{height:headerBox,top:statusBox}">
			个人中心
		</view>
		<view class="realHead" :style="{paddingTop:topHeight}">
			<view class="centerInfo">
				<view class="handerTop">
					<view class="headImg"></view>
					<view class="headerRight">
						<text class="useName">沵</text>
						<text class="useId">ID: 7459</text>
					</view>
				</view>
				
				<view class="headerfoot">
					<view class="item">
						<text class="iconfont icon-jijianfasong-xianxing"></text>
						<text>寄件下单</text>
					</view>
					<view class="item">
						<text class="iconfont icon-huoyunzhandizhiguanli"></text>
						<text>地址管理</text>
					</view>
					<view class="item">
						<text class="iconfont icon-jibenxinxi"></text>
						<text>基本信息</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 这是行列表 -->
		
		
		<view class="rowBox">
			<view class="rowTop">
				<text class="topName">我的订单</text>
				<text class="allOrder">全部订单</text>
			</view>
			<view class="headerfoot">
				
				<view class="item">
					<text class="iconfont icon-icon-test"></text>
					<text class="funtxt">待付款</text>
				</view>
				<view class="item">
					<text class="iconfont icon-rukuguanli"></text>
					<text class="funtxt">待入库</text>
				</view>
				<view class="item">
					<text class="iconfont icon-yunshuzhongwuliu-xianxing"></text>
					<text class="funtxt">运输中</text>
				</view>
				<view class="item">
					<text class="iconfont icon-wancheng1"></text>
					<text class="funtxt">已签收</text>
				</view>
				
				
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBox:20,// 状态栏高度
				headerBox:160,// 头部高度
				topHeight:0, // 距离头部高度
			}
		},
		created(){
			// console.log("缓存",this.$store.state)
			 this.$tool.getHeight().then(res=>{
				 console.log("666",res)
				 this.statusBox = res.SET_STATUS_BAR + 'px';
				 this.headerBox = (res.SET_CUSTOM_BAR - res.SET_STATUS_BAR) + 'px';
				 this.topHeight = res.SET_CUSTOM_BAR + 'px'
			 })
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		width: 100vw;
		height: 100vh;
		background-color: $self-body-bgColor;
	}
	.statusBox{
		background-color: $all-font-Tcolor;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 99;
	}
	.headerBox{
		background-color: $all-font-Tcolor;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		position: fixed;
		width: 100%;
		z-index: 99;
	}
	.realHead,.rowBox{
		width: 100%;
		height: 230upx;
		left: 0;
		background-color: $all-font-Tcolor;
		position: relative;
	}
	.centerInfo{
		width: 698upx;
		height: 330upx;
		position: absolute;
		top: 240upx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		border-radius: 18upx;
		display: flex;
		flex-direction: column;
		.handerTop{
			width: 100%;
			height: 196upx;
			display: flex;
			border-bottom: 1upx solid #dedede;
			padding: 0 24upx;
			box-sizing: border-box;
			align-items: center;
			.headImg{
				width: 124upx;
				height: 124upx;
				background-color: #dedede;
				border-radius: 50%;
			}
			.headerRight{
				flex: 1;
				display: flex;
				// align-items: center;
				flex-direction: column;
				justify-content: center;
				padding-left: 15upx;
				box-sizing: border-box;
			}
			.useName{
				font-weight: bold;
				font-size: 32upx;
			}
			.useId{
				color: #888;
				margin-top: 20upx;
				font-size: 28upx;
			}
		}
		.headerfoot{
			display: flex;
			// justify-content: space-around;
			padding-left: 15upx;
			box-sizing: border-box;
			color: #666;
			font-size: 30upx;
			align-items: center;
			width: 100%;
			flex: 1;
			.item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 33.33%;
				.iconfont{
					font-size: 60upx;
					color: $all-font-Tcolor;
				}
				text{
					text-align: center;
				}
			}
		}
	}
	.rowBox{
		width: 698upx;
		height: 330upx;
		box-sizing: border-box;
		margin: 0 auto;
		border-radius: 18upx;
		background-color: #FFFFFF;
		margin-top: 240upx;
		padding: 0 24upx;
		.rowTop{
			display: flex;
			align-items: center;
			height: 100upx;
			justify-content: space-between;
		}
		.topName{
			color: #333;
			font-size: 30upx;
			font-weight: bold;
		}
		.allOrder{
			color: #888;
			font-size: 28upx;
		}
		.headerfoot{
			display: flex;
			padding-left: 15upx;
			box-sizing: border-box;
			color: #666;
			font-size: 30upx;
			align-items: center;
			width: 100%;
			flex: 1;
			margin-top: 50upx;
			.item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 25%;
				.iconfont{
					font-size: 60upx;
					color: $all-font-Tcolor;
				}
				text{
					text-align: center;
				}
			}
			.funtxt{
				margin-top: 20upx;
			}
		}
	}
</style>
