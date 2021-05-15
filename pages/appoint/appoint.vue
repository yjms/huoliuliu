<template>
	<view class="whole">
		<view class="hander rowBox">
			<view class="address">深圳/宝安区---------马来西亚/吉隆坡</view>
		</view>
		<view class="bfcBox rowBox">
			
			<view class="lineRow">
				<text class="leftName">提货方式</text>
				<view class="right flexCenter">
					<view class="checkbox">上门提货</view>
					<view class="checkbox">自行送仓</view>
				</view>
			</view>
			
			<view class="lineRow">
				<text class="leftName">提货方式</text>
				<view class="right flexCenter">
					<view class="delTxt rightTxt overflowTxt">上门提货</view>
					<view class="righticon iconfont icon-youjiantou-copy"></view>
				</view>
			</view>
			
			<view class="lineRow">
				<view class="tips">提</view>
				<view class="right flex1">
					<view class="addBox rightTxt">
						<view class="flex1 overflowTxt setwidth">从哪里提货?</view>
						<text class="righticon iconfont icon-dizhi"></text>
					</view>
				</view>
			</view>
			
			<view class="lineRow noborder"> 
				<view class="tips tips2">发</view>
				<view class="right flex1">
					<view class="addBox rightTxt">
						<view class="flex1 overflowTxt setwidth">发到哪里去?</view>
						<text class="righticon iconfont icon-dizhi"></text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="sigleRow rowBox">
			<view>
				<text class="leftName">商品信息</text>
				<view class="rightInfo rightTxt">
					<view class="delTxt rightTxt overflowTxt">上门提货</view>
					<view class="righticon iconfont icon-youjiantou-copy"></view>
				</view>
			</view>
		</view>
		
		<view class="bfcBox rowBox">
			
			<view class="lineRow">
				<view class="leftName">装箱信息 <text class="rightTxt">(后续可添加)</text></view>
				<view class="right flexCenter">
					<view class="delTxt rightTxt overflowTxt">添加装箱信息</view>
					<view class="righticon iconfont icon-youjiantou-copy"></view>
				</view>
			</view>
			
			<view class="lineRow">
				<text class="leftName">报关信息</text>
				<view class="right flexCenter">
					<view class="delTxt rightTxt overflowTxt">请填写报关信息</view>
					<view class="righticon iconfont icon-youjiantou-copy"></view>
				</view>
			</view>
			
			<view class="lineRow">
				<text class="leftName">其他信息<text class="rightTxt">(非必填)</text></text>
				<view class="right flexCenter">
					<view class="delTxt rightTxt overflowTxt">自有单号、备注</view>
					<view class="righticon iconfont icon-youjiantou-copy"></view>
				</view>
			</view>
			
		</view>
		
		
		
		<view class="footBox boxSize">
			<view class="leftFoot">
				<text class="ygtxt">预估</text>
				<text class="ygjtxt">￥638.00</text>
			</view>
			<view class="rightFoot">
				提交订单
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
			
		}
	}
</script>

<style scoped lang="scss">
	// 共用样式
	.rowBox{
		width: 700upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.leftName{
		color: #333;
		font-size: 30upx;
	}
	.rightTxt{
		font-size: 28upx;
		color: #888;
	}
	.noborder{
		border: none !important;
	}
	// 私用样式
	.whole{
		width: 100vw;
		// height: 100vh;
		display: flex;
		padding-bottom: 200upx;
		flex-direction: column;
		align-items: center;
		background-color: $self-body-bgColor;
		padding: 20upx 0;
		box-sizing: border-box;
	}
	.hander{
		height: 182upx;
		display: flex;
		align-items: center;
		font-size: 32upx;
		font-weight: bold;
		padding-left: 26upx;
		margin-bottom: 20upx;
		border-radius: 8upx;
	}
	.bfcBox{
		display: flex;
		flex-direction: column;
		align-items: center;
		>.lineRow{
			width: 660upx;
			height: 100upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1upx solid #dedede;
			.right>.checkbox{
				padding: 10upx 26upx;
				background-color: $self-body-bgColor;
				border-radius: 30upx;
				margin-left: 15upx;
				font-size: 28upx;
				color: #666;
			}
			.delTxt{
				margin-left: 15upx;
				width: 300upx;
				text-align: right;
			}
			.righticon{
				font-size: 36upx !important;
				color: #888888;
			}
			.tips{
				width: 50upx;
				height: 50upx;
				font-size: 26upx;
				color: #fff;
				background-color: #5B5B5B;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				flex-shrink: 0;
			}
			.tips2{
				background-color: #E57635;
			}
			.addBox{
				width: 100%;
				padding-left: 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
			}
			.setwidth{
				width: 300upx;
			}
			
		}
	}
	.sigleRow{
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20upx 0;
		border-radius: 8upx;
		>view{
			width: 660upx;
			height: 100upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.rightInfo{
			display: flex;
			align-items: center;
		}
	}
	.footBox{
		width: 100%;
		height: 130upx;
		align-items: center;
		padding: 0 27upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		.ygtxt{
			font-size: 26upx;
			margin-right: 15upx;
		}
		.ygjtxt{
			color: #B97040;
			font-size: 34upx;
		}
		.rightFoot{
			width: 317upx;
			height: 92upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			background-color: $all-font-Tcolor;
			font-size: 30upx;
			border-radius: 8upx;
		}
	}
	
</style>
