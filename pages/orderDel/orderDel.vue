<template>
	<view class="whole">
		<view class="header">
			<text class="iconfont icon-chenggong"></text>
			<view class="right flex1">
				<view class="titleBox">
					<text class="succTxt">下单成功</text>
					<text>自行送仓</text>
				</view>
				<view class="orderDer">
					请尽快打印面单贴至箱子外包装并将货物送至官方仓库中
				</view>
				<view class="footBtn">
					<view class="delBtn" @click="orderDel">订单详情</view>
					<view class="backBtn" @click="backHome">返回首页</view>
				</view>
			</view>
		</view>
		<view class="bodyBox">
			
			
			
			<view class="rowBox">
				<text>订单编号</text>
				<view class="rightBox align">
					<text>HLL100012424541224</text>
					<text class="iconfont icon-fuzhicopy12"></text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>订单编号</text>
				<view class="rightBox align">
					<text>五先生</text>
					<text>18229829006</text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>仓库地址</text>
				<view class="rightBox align">
					<text>请下单后留意短信，仓库地址会在下单后发送给您，或者联系您的销售人员提供</text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>收货地址</text>
				<view class="rightBox column marbottom">
					<text>yls 18229829006</text>
					<text>马来西亚 吉隆坡 详细地址（417689）</text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>装箱信息</text>
				<view class="rightBox align">
					<text>1箱1件</text>
					<view class="clickBox">
						<text>详情</text>
						<text class="iconfont icon-youjiantou-copy"></text>
					</view>
				</view>
			</view>
			
			<view class="rowBox">
				<text>商品信息</text>
				<view class="rightBox setder">
					<text>预估总重量/总体积:1KG/0.001CBM</text>
					<view class="shopList">
						<text>商品名字</text>
						<text class="settxt">中文品名</text>
						<view class="footbox settxt">
							<text>申报单价：555.00MYR</text>
							<text>数量：1</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="bodyFoot">
				<view class="btnBox">
					<text class="iconfont icon-lianxiwomen"></text>
					<text>联系客服</text>
				</view>
				<view class="btnBox">
					<text class="iconfont icon-bianjimian"></text>
					<text>修改订单</text>
				</view>
				<view class="btnBox">
					<text class="iconfont icon-quxiao"></text>
					<text>取消订单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			orderDel(){
				// 去订单详情
				this.$tool.jump_nav("/pages/orderDels/orderDels")
			},
			backHome(){
				// 返回首页
				this.$tool.swith_nav("/pages/index/index")
			}
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		min-height: 100vh;
		min-width: 100vw;
		background-color: $self-body-bgColor;
	}
	.header{
		width: 100vw;
		padding: 55upx 26upx 46upx 26upx;
		box-sizing: border-box;
		background-color: $all-font-Tcolor;
		display: flex;
		color: #dedede;
		font-size: 30upx;
		.titleBox{
			margin-bottom: 35upx;
		}
		.icon-chenggong{
			font-size: 56upx;
			color: #FFFFFF;
		}
		.right{
			padding-left: 15upx;
			box-sizing: border-box;
		}
		.succTxt{
			font-size: 34upx;
			font-weight: bold;
			margin-right: 50upx;
			color: #FFFFFF;
		}
		.orderDer{
			margin-bottom: 35upx;
		}
		.footBtn{
			display: flex;
			>view{
				width: 178upx;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1upx solid;
				margin-right: 30upx;
				border-radius: 8upx;
			}
		}
	}
	.bodyBox{
		width: 698upx;
		border-radius: 8upx;
		padding: 35upx 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		margin: 0 auto;
		margin-top: 20upx;
		display: flex;
		flex-direction: column;
		font-size: 30upx;
		color: #888;
	}
	.rowBox{
		display: flex;
		margin-bottom: 40upx;
		>text{
			width: 150upx;
			flex-shrink: 0;
		}
		.align{
			align-items: center;
		}
		.rightBox{
			display: flex;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// white-space: nowrap;
			text{
				color: #333;
				margin-right: 10upx;
			}
		}
		.column{
			flex-direction: column;
		}
		.marbottom{
			text{
				margin-bottom: 20upx;
			}
		}
		.clickBox{
			display: flex;
			align-items: center;
			>text{
				color: $all-font-Tcolor;
			}
		}
		.setder{
			flex-direction: column;
		}
		.shopList{
			display: flex;
			flex-direction: column;
			margin-top: 35upx;
		}
		text.settxt,.settxt>text{
			color: #888;
			font-size: 28upx;
			line-height: 35upx;
		}
		.settxt>text{
			margin-right: 30upx;
		}
	}
	.bodyFoot{
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-top: 1upx solid #dedede;
		.btnBox>text{
			color: #333;
			margin-right: 8upx;
		}
	}
</style>
