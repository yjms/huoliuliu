<template>
	<view class="whole">
		
		<view class="headerBox">
			<view class="iptBox">
				<text class="iconfont icon-chaxun"></text>
				<input type="text" placeholder="支持SKU编码或中文品名" />
			</view>
			<view class="addBox" @click="addshop">
				<text class="addicon">+</text>
				<text class="addtxt">添加商品</text>
			</view>
		</view>
		
		<view class="shoplist">
			<view class="shopItem" v-for="(it,ix) in shoplist">
				<text class="title">{{it.name}}</text>
				<view class="addshop">
					<text>{{it.attr}}</text>
					<view class="right">
						<text class="addicon" v-if="it.num>0" @click="reduceNum(ix)">-</text>
						<input type="text" placeholder="数量" v-if="it.num>0" v-model="it.num"/>
						<text class="addicon" @click="addNum(ix)">+</text>
					</view>
				</view>
				<text class="priceTxt">申报单价:{{it.price}}</text>
			</view>
			
			<!-- <view class="shopItem">
				<text class="title">商品名字</text>
				<view class="addshop">
					<text>属性名字</text>
					<text class="addicon">+</text>
				</view>
				<text class="priceTxt">申报单价</text>
			</view> -->
		</view>
		<view class="footBox">
			<view class="txtBox">
				<text>已选</text>
				<text class="colTxt">{{shoptype}}</text>
				<text>种商品</text>
				<text class="setmar">总数量</text>
				<text class="colTxt">{{totle}}</text>
			</view>
			<view class="comBtn">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shoplist:[
					{
						name:"商品一",
						attr:"属性一",
						price:355,
						num:0,
					},
					{
						name:"商品二",
						attr:"属性二",
						price:455,
						num:0,
					}
				],
				shoptype:0,// 商品种类
				
			}
		},
		computed:{
			totle(){
				return this.shoplist.reduce((pre,curr)=>{
					return parseInt(pre.num)  + parseInt(curr.num) 
				})
			}
		},
		watch:{
			shoplist(val,old){
				let flag = 0;
				for(let i =0 ;i<val.length;i++){
					if(val[i].num>0){
						++flag;
					}
				}
				this.shoptype = flag;
			}
		},
		methods: {
			addshop(){
				// 添加商品
				this.$tool.jump_nav(`/pages/editGoods/editGoods`);
			},
			reduceNum(ix){
				// 减少商品数量
				// 添加商品
				let arr = this.shoplist.concat();
				if(arr[ix].num>0)
				arr[ix].num = --arr[ix].num;
				this.shoplist = arr;
			},
			addNum(ix){
				// 添加商品
				let arr = this.shoplist.concat();
				arr[ix].num = ++arr[ix].num;
				this.shoplist = arr;
			}
		}
	}
</script>

<style scoped lang="scss">
	.whole{
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		background-color: $self-body-bgColor;
	}
	.headerBox{
		width: 100%;
		padding: 0 38upx;
		background-color: #FFFFFF;
		display: flex;
		height: 100upx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		.iptBox{
			flex: 1;
			margin-right: 30upx;
			align-items: center;
			display: flex;
			font-size: 28upx;
			color: #888;
			background-color: $self-body-bgColor;
			border-radius: 8upx;
			height: 62upx;
			padding: 0 18upx;
			box-sizing: border-box;
			.icon-chaxun{
				font-size: 46upx;
			}
			input{
				flex: 1;
				margin-left: 15upx;
			}
		}
	}
	.addBox{
		display: flex;
		align-items: center;
		color: #666;
		font-size: 28upx;
		.addicon{
			width: 40upx;
			height: 40upx;
			color: #FFFFFF;
			display: flex;
			margin-right: 8upx;
			line-height: 36upx;
			justify-content: center;
			font-size: 40upx;
			background-color: $all-font-Tcolor;
			border-radius: 50%;
		}
	}
	.shoplist{
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 14upx;
		background-color: #FFFFFF;
		.shopItem{
			width: 100%;
			position: relative;
			height: 200upx;
			display: flex;
			flex-direction: column;
			padding: 20upx 37upx 20upx 24upx;
			box-sizing: border-box;
		}
	}
	.shopItem>.title{
		font-size: 32upx;
		font-weight: bold;
	}
	.shopItem>.addshop{
		display: flex;
		font-size: 28upx;
		margin: 20upx 0;
		color: #888;
		justify-content: space-between;
		.addicon{
			width: 40upx;
			height: 40upx;
			color: #FFFFFF;
			display: flex;
			margin-right: 8upx;
			line-height: 36upx;
			justify-content: center;
			font-size: 40upx;
			background-color: $all-font-Tcolor;
			border-radius: 50%;
		}
	}
	.addshop>.right{
		display: flex;
		align-items: center;   
		input{
			width: 130upx;
			text-align: center;
			height: 40upx;
			font-size: 26upx;
			margin: 0 10upx;
			background-color: $self-body-bgColor;
			border-radius: 8upx;
		}
		// right: ;
	}
	.priceTxt{
		color: #888;
		font-size: 28upx;
	}
	.shoplist>.shopItem::after{
		content: "";
		width: 700upx;
		height: 1upx;
		background-color: $self-body-bgColor;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
	}
	.footBox{
		position: fixed;
		width: 100%;
		height: 120upx;
		background-color: #FFFFFF;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding: 0 25upx;
		box-sizing: border-box;
		justify-content: space-between;
		.txtBox{
			display: flex;
			align-items: center;
			font-size: 30upx;
			color: #333;
			.colTxt{
				color: $all-font-Tcolor;
				font-weight: bold;
				margin: 0 3upx;
			}
			.setmar{
				margin-left: 10upx;
			}
		}
	}
	.comBtn{
		width: 280upx;
		height: 90upx;
		color: #FFFFFF;
		background-color: $all-font-Tcolor;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		border-radius: 10upx;
	}
</style>
