<template>
	<view class="whole">
		<!-- 这是查询保价页面 -->
		<view class="handerBox">
			<image src="../../static/image/indexbannar.jpg" mode="widthFix"></image>
		</view>
		
		<view class="centerBox allrow">
			
			<view class="rowBox">
				<text>出发地</text>
				<view class="rightBox">
					<text>请选择</text>
					<text class="iconfont icon-youjiantou-copy righticon"></text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>收货地</text>
				<view class="rightBox">
					<text>请选择</text>
					<text class="iconfont icon-youjiantou-copy righticon"></text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>货物类型</text>
				<view class="rightBox">
					<text>请选择</text>
					<text class="iconfont icon-youjiantou-copy righticon"></text>
				</view>
			</view>
			
		</view>
		
		<view class="wigthBox allrow">
			<view>
				<view class="title">体积重量</view>
				<view class="rowInfo">
					<text>总重量</text>
					<view class="addrdu">
						<text>-</text>
						<view class="numBox">
							<input type="text" value="20" />
							<text>KG</text>
						</view>
						<text>+</text>
					</view>
				</view>
			</view>
			
			<view>
				<view class="rowInfo">
					<text>总体积</text>
					<view class="addrdu">
						<text>-</text>
						<view class="numBox">
							<input type="text" value="20" />
							<text>KG</text>
						</view>
						<text>+</text>
					</view>
				</view>
			</view>
			
			
		</view>
	
		<view class="footBtn allrow">
			查询
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
	.whole{
		width: 100vw;
		min-height: 100vh;
		background-color: $self-body-bgColor;
	}
	.allrow{
		width: 700upx;
		margin: 0 auto;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.handerBox{
		width: 100%;
		image{
			width: 100%;
			height: auto;
		}
	}
	.centerBox{
		margin-top: 20upx;
		background-color: #FFFFFF;
		border-radius: 8upx;
	}
	.centerBox>.rowBox:not(:last-child){
		border-bottom: 1upx solid #dedede;
	}
	.rowBox{
		width: 100%;
		display: flex;
		height: 90upx;
		padding-right: 20upx;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		>text{
			font-size: 32upx;
			color: #333;
		}
		.rightBox>text{
			font-size: 30upx;
			margin-left: 10upx;
			color: $all-font-Hcolor;
		}
		.rightBox>.righticon{
			font-size: 34upx;
		}
	}
	.wigthBox{
		padding: 32upx 20upx;
		background-color: #FFFFFF;
		border-radius: 8upx;
		margin-top: 20upx;
		.title{
			font-size: 32upx;
			font-weight: bold;
		}
		.rowInfo{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80upx;
			margin-top: 36upx;
			font-size: 30upx;
			color: #333;
		}
	}
	.rowInfo>.addrdu{
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		>text{
			font-size: 42upx;
		}
		.numBox{
			display: flex;
			width: 290upx;
			height: 100%;
			background-color: #F3F3F3;
			border-radius: 8upx;
			align-items: center;
			padding:0 15upx;
			box-sizing: border-box;
			margin: 0 30upx;
			input{
				flex: 1;
				text-align: center;
			}
			>text{
				color: #999;
			}
		}
	}
	.footBtn{
		// width: ;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		margin-top: 60upx;
		background-color: $all-font-Tcolor;
		border-radius: 8upx;
		height: 80upx;
		font-size: 30upx;
	}
</style>
