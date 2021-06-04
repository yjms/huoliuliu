<template>
	
	<view class="whole">
		<view class="header">
			<view class="topBox">
				<view class="left">
					<text>订单号:HLL1545454564645</text>
					<text class="iconfont icon-fuzhicopy12"></text>
				</view>
				<text class="rightTxt">待提货/发货</text>
			</view>
			<view class="centerBox">
				<text>深圳宝安区</text>
				<text class="iconfont icon-gjiantous"></text>
				<text>马来西亚吉隆坡</text>
			</view>
		</view>
		
		<view class="statusInfo">
			<text class="iconfont icon-chenggong"></text>
			<view class="right flex1">
				<text class="txt1">已提交待送仓</text>
				<text>您提交了订单，请尽快将货物送到指定仓库</text>
				<text>2021-05-25 20:06:57</text>
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
				<text>自有单号</text>
				<view class="rightBox align">
					<text>HLL145454654564565</text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>订单备注</text>
				<view class="rightBox align">
					<text>啊实打实的回家卡刷道具卡</text>
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
		<view class="footBox">
			<view class="left">
				<text>预估</text>
				<text class="priceTxt">546.00</text>
			</view>
			<view class="right">
				<text>价格明细</text>
				<text class="iconfont icon-youjiantou"></text>
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
				
			},
			backHome(){
				// 返回首页
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		min-height: 100vh;
		min-width: 100vw;
		background-color: $self-body-bgColor;
		padding-top: 20upx;
		padding-bottom: 130upx;
		box-sizing: border-box;
	}
	.header,.statusInfo,.bodyBox{
		width: 698upx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 8upx;
		padding: 35upx 20upx;
		display: flex;
		font-size: 30upx;
		color: #888;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}
	.header{
		flex-direction: column;
		>.topBox{
			display: flex;
			width: 100%;
			justify-content: space-between;
			.rightTxt{
				color: $all-font-Tcolor;
				font-size: 30upx;
				font-weight: bold;
			}
		}
		.centerBox{
			margin-top: 35upx;
			text{
				margin-right: 25upx;
				color: #111;
				font-weight: bold;
				font-size: 32upx;
			}
		}
	}
	.statusInfo{
		padding-left: 50upx;
		>text{
			color: $all-font-Tcolor;
			font-size: 40upx;
		}
		>.right{
			padding-left: 80upx;
			box-sizing: border-box;
			flex-direction: column;
			display: flex;
			font-size: 26upx;
			.txt1{
				font-size: 30upx;
				color: #333;
				margin-bottom: 20upx;
			}
		}
	}
	.bodyBox{
		margin-top: 20upx;
		flex-direction: column;
		margin-bottom: 0;
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
	
	.footBox{
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: space-between;
		padding: 0 46upx;
		align-items: center;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9;
		font-size: 28upx;
		color: #888;
		background-color: #FFFFFF;
		box-shadow:inset 0px 15px 6px -15px #dedede;
		.priceTxt{
			color: #E6A235;
			margin-left: 15upx;
			font-size: 32upx;
			font-weight: bold;
		}
		.priceTxt::before{
			content: "￥";
			font-size: 26upx;
		}
		.right{
			display: flex;
		}
		.right>.icon-youjiantou{
			transform: rotate(90deg);
		}
	}
</style>
