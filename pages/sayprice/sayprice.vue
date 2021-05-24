<template>
	<view class="whole">
		<!-- 这是保价列333表页面 -->
		<view class="centerBox" @click="showHide">
			<view class="iconBox">
				<text class="iconfont icon-5"></text>
			</view>
			<view class="rightBox">
				<text>西马海运普货专线B</text>
				<view class="price">
					<text>预估</text>
					<text class="priceTxt">650.00</text>
				</view>
			</view>
		</view>
		
		<view class="centerBox">
			<view class="iconBox">
				<text class="iconfont icon-chuan3"></text>
			</view>
			<view class="rightBox">
				<text>西马海运普货专线B</text>
				<view class="price">
					<text>预估</text>
					<text class="priceTxt">650.00</text>
				</view>
			</view>
		</view>
		<!-- <view class="footBox">
			<view class="kefuBox">
				<text class="iconfont icon-lianxiwomen"></text>
				<text class="kefuTxt">联系客服</text>
			</view>
			<view class="rightBtn">
				立即下单
			</view>
		</view> -->
		<Rulepop ref="rule"></Rulepop>
	</view>
</template>

<script>
	import Rulepop from '../components/Rulepop/Rulepop.vue'
	export default {
		components:{
			Rulepop
		},
		data() {
			return {
				
			}
		},
		methods: {
			showHide(){
				this.$refs.rule.showHide();
			}
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		width: 100vw;
		height: 100vh;
		background-color:$self-body-bgColor;
		padding-top: 20upx;
	}
	.centerBox{
		width: 700upx;
		padding: 20upx;
		box-sizing: border-box;
		// height: 210upx;
		margin: 0 auto;
		margin-bottom: 20upx;
		border-radius: 8upx;
		display: flex;
		background-color: #FFFFFF;
	}
	.iconBox{
		width: 110upx;
		height: 110upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #EFFAFF;
		border-radius: 8upx;
		text{
			font-size: 62upx;
			color: #7EC6FB;
		}
		.icon-chuan3{
			font-size: 50upx;
		}
	}
	.rightBox{
		flex: 1;
		padding-left: 20upx;
		box-sizing: border-box;
		>text{
			font-size: 32upx;
			font-weight: bold;
		}
		.price{
			margin-top: 15upx;
			font-size: 30upx;
		}
		.priceTxt{
			font-size: 34upx;
			font-weight: bold;
			color: #F3AB62;
			margin-left: 10upx;
		}
		
	}
	.priceTxt::before{
		content: '￥';
		font-size: 28upx;
	}
	.footBox{
		width: 100%;
		height: 120upx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		z-index: 9;
		align-items: center;
		padding: 0 20upx;
		box-sizing: border-box;
		justify-content: space-between;
		.kefuBox{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.kefuBox>.iconfont{
			font-size: 40upx;
			font-weight: bold;
			color: #666;
		}
		.kefuTxt{
			font-size: 30upx;
			font-weight: 400;
			color: #666;
		}
		.rightBtn{
			width: 540upx;
			height: 90upx;
			background-color: $all-font-Tcolor;
			border-radius: 8upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 30upx;
		}
	}
</style>
