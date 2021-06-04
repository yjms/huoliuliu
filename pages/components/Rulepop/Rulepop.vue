<template>
	<view class="whole" v-if="popShow">
		<view class="center animated bounceIn">
			<view class="topBox">
				<scroll-view scroll-y="true">
					<view class="item1">asdhajskhdjkash</view>
				</scroll-view>
			</view>
			<view class="footBtn">
				<view class="footBox">
					<view class="kefuBox">
						<text class="iconfont icon-lianxiwomen"></text>
						<text class="kefuTxt">联系客服</text>
					</view>
					<view class="rightBtn" @click="createOrder">
						立即下单
					</view>
				</view>
			</view>
			<text class="iconfont icon-guanbi" @click="showHide"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popShow:false,// 默认 不显示弹窗
			}
		},
		methods: {
			createOrder(){
				// 创建订单
				this.$tool.jump_nav("/pages/appoint/appoint")
			},
			showHide(){
				this.popShow = !this.popShow;
			}
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,.3);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		.center{
			width: 680upx;
			height: 80vh;
			border-radius: 8upx;
			background-color: #FFFFFF;
			padding: 20upx;
			padding-top: 40upx;
			box-sizing: border-box;
			position: relative;
			overflow: hidden;
			.icon-guanbi{
				font-size: 52upx;
				color: #666;
				position: absolute;
				right: 10upx;
				top: 10upx;
			}
		}
	}
	// .topBox{
	// 	height: ;
	// }
	.topBox>scroll-view{
		height: calc(80vh - 140upx);
	}
	.footBox{
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		z-index: 9;
		align-items: center;
		padding: 0 20upx;
		box-sizing: border-box;
		justify-content: space-between;
		border-top: 1upx solid #dedede;
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
			width: 340upx;
			height: 70upx;
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
