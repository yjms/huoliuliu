<template>
	<view class="whole">
		
		<view class="rowBox iptRow">
			<text>商品SKU</text>
			<view class="rightBox">
				<!-- <text>11</text> -->
				<input type="text"  placeholder="商品SKU"/>
			</view>
		</view>
		
		<view class="rowBox">
			<text>中文品名</text>
			<view class="rightBox">
				<input type="text"  placeholder="中文品名"/>
			</view>
		</view>
		
		<view class="rowBox">
			<text>英文品名</text>
			<view class="rightBox">
				<input type="text"  placeholder="英文品名"/>
			</view>
		</view>
		
		<view class="rowBox">
			<text>是否品牌</text>
			<view class="rightBox">
				<input type="text"  placeholder="是都"/>
			</view>
		</view>
		
		<view class="rowBox">
			<text>型号</text>
			<view class="rightBox">
				<input type="text"  placeholder="型号"/>
			</view>
		</view>
		
		<view class="rowBox">
			<text>材质</text>
			<view class="rightBox">
				<input type="text"  placeholder="材质"/>
			</view>
		</view>
		
		<view class="rowBox">
			<text>单位</text>
			<view class="rightBox yjtBox">
				<text>请选择</text>
				<text class="iconfont icon-youjiantou-copy"></text>
			</view>
		</view>
		
		<view class="rowBox">
			<text>货物类型</text>
			<view class="rightBox yjtBox">
				<text>请选择</text>
				<text class="iconfont icon-youjiantou-copy"></text>
			</view>
		</view>
		
		<view class="rowBox rowImg">
			<text>商品图片</text>
			<view class="imgbox">
				<text class="iconfont icon-xiangji"></text>
			</view>
		</view>
		
		<view class="rowBox rowBox2" @click="otherInfo">
			<view>其他信息</view>
			<view class="rightBox2">
				<text class="txtOver">长：未填写未填写未填写未填写 宽:未填写 高:未填写</text>
				<text class="iconfont icon-youjiantou-copy"></text>
			</view>
		</view>
		
		<view class="rowBox">
			<text>国内申报单价(￥)</text>
			<view class="rightBox addBox">
				<input type="text"  placeholder="单价"/>
			</view>
		</view>
		<!-- <view class="rowBox">
			<text>其他信息</text>
			<text>长：adnjmkasndjkl 宽:未填写</text>
		</view> -->
		<view class="rowBox noborder" @click="checkPrice">
			<text>目的国申报价值</text>
			<view class="rightBox addBox">
				<!-- <input type="text"  placeholder="单价"/> -->
				<view class="addicon">
					<view class="icons">
						+
					</view>
					<text>添加</text>
				</view>
			</view>
		</view>
		<view class="tipBox">
			至少添加一个目的国申报价值
		</view>
		<view class="footBtn">
			保存商品
		</view>
		<Footpop :showType="showType"></Footpop>
	</view>
</template>

<script>
	import Footpop from "../components/Footpop.vue"
	export default {
		components:{
			Footpop
		},
		data() {
			return {
				showType:"0"
			}
		},
		methods: {
			otherInfo(){
				// 编辑其他信息
				this.showType = 3;
			},
			checkPrice(){
				// 选择目的国申报价值
				this.showType = 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-bottom: 20upx;
	}
	.rowBox{
		width: 730upx;
		height: 100upx;
		align-items: center;
		border-bottom:1upx solid #dedede;
		display: flex;
		>text{
			flex-shrink: 0;
			width: 240upx;
			font-size: 30upx;
			color: #333;
		}
		>view>input{
			width: 80%;
			font-size: 28upx;
		}
		.rightBox{
			flex: 1;
			color: #333;
			>.icon-youjiantou-copy{
				font-size: 40upx;
				color: #888;
			}
		}
	}
	.yjtBox{
		display: flex;
		justify-content: space-between;
		padding-right: 30upx;
		box-sizing: border-box;
		align-items: center;
	}
	.rowImg{
		height: 190upx;
		border-bottom: none;
		.imgbox{
			width: 110upx;
			height: 110upx;
			background-color: #F4F9FA;
			display: flex;
			justify-content: center;
			align-items: center;
			>text{
				font-size: 60upx;
				color: #999;
			}
		}
	}
	.rightBox2{
		display: flex;
		flex: 1;
		justify-content: space-between;
		padding-right: 30upx;
		box-sizing: border-box;
		.icon-youjiantou-copy{
			font-size: 40upx;
			color: #888;
			flex-shrink: 0;
		}
	}
	.rowBox2{
		// border-bottom: none;
		border-top: 18upx solid #F2F7F8;
		border-bottom: 18upx solid #F2F7F8;
	}
	
	.txtOver{
		width: 400upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.noborder{
		border-bottom: none;
		min-height: 100upx;
	}
	.addBox{
		display: flex;
		flex-direction: column;
	}
	.addicon{
		display: flex;
		align-items: center;
		height: 100upx;
		>.icons{
			width: 30upx;
			height: 30upx;
			background-color: $all-font-Tcolor;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
		}
		>text{
			font-size: 28upx;
			color: #888;
			margin-left: 8upx;
		}
	}
	.tipBox{
		width: 100%;
		height: 60upx;
		display: flex;
		align-items: center;
		// justify-content: center;
		background-color: #F2F7F8;
		font-size: 26upx;
		color: #888;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.footBtn{
		
		width: 700upx;
		height: 80upx;
		border-radius: 8upx;
		display: flex;
		align-items: center;
		color: #FFFFFF;
		justify-content: center;
		background-color: $all-font-Tcolor;
		margin: 0 auto;
		margin-top: 30upx;
	}
	.rowBox>text:first-of-type::before{
		content: "*";
		color: #EA603F;
		font-size: 26upx;
	}
	.rowBox2>text:first::before{
		content: "";
	}
</style>
