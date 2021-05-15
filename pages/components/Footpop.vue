<template>
	<view class="whole" name="Footpop" v-if="showType>0"  @click="hidePop">
		<view class="footBody" @click.stop>
			
			<view class="header">
				<text>{{titleList[showType-1]}}</text>
				<text class="iconfont icon-guanbi close" @click="hidePop"></text>
			</view>
			<!-- 寄件备注 -->
			<view class="popBody" v-if="showType==3">
				<view class="ulremark row"  v-if="false">
					<view class="rmkItem" v-for="(item,index) in remark" :key="item" :class="kdType == index+1 ? 'kdact':''" @click="()=>{this.kdType = index + 1}">
						{{item}}
					</view>
				</view>
				<view class="remarkarea">
					<textarea  placeholder="备注说明" maxlength="30" v-model="remarkTxt"/>
					<text>{{remarkTxt.length}}/30</text>
				</view>
			</view>
			<!-- 保价 -->
			<view class="popBody" v-if="showType==2">
				<view class="priceBox row flex_col">
					<text>保价金额</text>
					<view class="priceIpt flex_col">
						<input type="text" v-model="bjprice" />
						<text>元</text>
					</view>
				</view>
			<!-- 	<view class="priceTxt flex_col row">
					<text class="bjTxt">报价费: </text>
					<text class="bjNum">150</text>
				</view> -->
				<view class="priTip">
					当快件在运输过程中发生遗失、破损时、我们将在第一时间提供理赔受理
				</view>
				<view class="sbTip row">
					申报价值提示
				</view>
				<view class="imTip row">
					<view>1.寄件人交寄物品申报物品价值，并根据申报价值支付保费。</view>
					<view>2.单票交寄物超过500的快件，寄人应当保价。单票交寄物价值30000以下分别寄件，并分别进行申报价值。</view>
					<view>3.申报价值快件，赔偿按照实际价值损失赔偿，上限为交寄物的申报价值；如快件未足额保价的，则赔偿金额按照保价率折扣，即赔偿金额=实际价值损失*申报价值/实际价值；未申报价值快件，赔偿上限为500元，但无论如何赔偿范围不包括商业机会、预计收益等间接损失。</view>
				</view>
			</view>
			
			<view class="popBody" v-if="showType==1">
					<view class="ulTitle row" v-if="false">
						选择物品类型
					</view>
					
					<view class="ullist row" v-if="true">
						<view class="wpitem" v-for="(item,index) in things" :class="wpType == index+1 ? 'wpact':''" :key="item" @click="()=>{this.wpType = index + 1}">
							{{item}}
						</view>
					</view>
					
					<view class="tipTxt row">
						禁寄物品: 各种枪支弹药、易燃易爆、化学危险品、毒品、各类生化制品、传染性物质、各类非法伪造、侵权物品...
					</view>
					
					<!-- <view class="ygTxt row">
						预估重量
					</view> -->
					
					<view class="delRow row">
						<text class="wxtip">注: 实际重量以快递员确定为准</text>
						<view class="numBox">
							<view class="runBox" @click="reduce(1)">-</view>
							<view class="numItem">
								<input type="text" v-model="wigths"/>
								<text>kg</text>
							</view>
							<view class="runBox" @click="addprice(1)">+</view>
						</view>
					</view>
					
					<view class="delRow row">
						<text class="wxtip">注: 实际体积以快递员确定为准</text>
						<view class="numBox">
							<view class="runBox"  @click="reduce(2)">-</view>
							<view class="numItem">
								<input type="text" v-model="tiji"/>
								<text>m³</text>
							</view>
							<view class="runBox" @click="addprice(2)">+</view>
						</view>
					</view>
					
					<view class="delRow row">
						<text class="wxtip">注: 实际件数以快递员确定为准</text>
						<view class="numBox">
							<view class="runBox"  @click="reduce(3)">-</view>
							<view class="numItem">
								<input type="text" v-model="wpthings"/>
								<text>件</text>
							</view>
							<view class="runBox" @click="addprice(3)">+</view>
						</view>
					</view>
			</view>
			
			<view class="comBtn" @click="compileCheck">
				确 定
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			showType:{
				type:String,
				default:"0"
			}
		},
		name:"Footpop",
		data(){
			return{
				things:["文件","电子类产品","生活用品","服饰","生鲜","食品","易碎品","化妆品","药品","其他"],
				remark:["请带纸箱","需要爬楼","缺文件袋","来前电话","请带面单","	请带胶袋"],
				titleList:['选择物品类型重量和体积','保价','对快递员说'],
				wpType:0,// 默认没物品类型0
				kdType:0,//对快递员说 类型
				wigths:0,//重量
				tiji:0,// 体积
				wpthings:0,// 物品件数
				remarkTxt:'', // 备注
				bjprice:'',// 保价多少钱
			}
		},
		mounted(){
			
		},
		methods:{
			updata(obj){
				// 更新数据
				console.log("看看obj",obj);
				this.wpType = obj.mo_pinming;
				this.wigths = obj.mo_weight;
				this.tiji = obj.mo_volume;
				this.wpthings = obj.mo_jianshu;
				this.remarkTxt = obj.mo_qujianbeizhu;
				this.bjprice = obj.mo_baoxianjiazhi;
			},
			reduce(type){
				if(type == 1){
					let price = this.wigths;
					price = --price;
					this.wigths = price > 0 ?price : 0;
				}else if(type==2){
					let price = this.tiji;
					price = --price;
					this.tiji = price > 0 ?price : 0;
				}else{
					let price = this.wpthings;
					price = --price;
					this.wpthings = price > 0 ?price : 0;
				}
			},
			addprice(type){
				if(type == 1){
					let price = this.wigths;
					price = ++price;
					this.wigths = price;
				}else if(type==2){
					let price = this.tiji;
					price = ++price;
					this.tiji = price;
				}else{
					let price = this.wpthings;
					price = ++price;
					this.wpthings = price;
				}
			},
			hidePop(){
				this.$parent.showType = 0;
				// console.log(this.showType) 
			},
			compileCheck(){
				console.log("点确定",this.$parent.showType);
				switch(this.$parent.showType){
					case 1:// 重量体积类型
						this.$parent.wigths = this.wigths;
						this.$parent.tiji = this.tiji;
						this.$parent.wpthings = this.wpthings;
						this.$parent.wpType = this.wpType; 
						console.log("物品名字",this.wpType)
					break;
					case 2:// 保价
					  this.$parent.bxprice = this.bjprice;
					break;
					case 3:// 对快递员说
						this.$parent.remark = this.remarkTxt;
					break;
				}
				this.hidePop();
			}
		}
		
	}
</script>

<style scoped lang="scss">
	// 公共样式
	.row{
		width: 100%;
		padding: 0 28upx;
		box-sizing: border-box;
	}
	.flex_row{ // 横向居中 flex
		display: flex;
		justify-content: center;
		box-sizing: border-box;
	}
	.flex_col{// 纵向居中flex
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
	// 非公共样式
	.whole{
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		display: flex;
		overflow: hidden;
		align-items: flex-end;
		background-color: rgba(0,0,0,.5);
	}
	.footBody{
		position: relative;
		width: 100%;
		height: 1080upx;
		background-color: #FFFFFF;
		border-radius:40upx 40upx 0 0;
	}
	.footBody>.header{
		padding-top: 26upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 36upx;
		letter-spacing: 4upx;
		font-weight: 700;
		position: relative;
		.close{
			position: absolute;
			right: 28upx;
			border: 10upx;
			font-size: 56upx;
			font-weight: 400;
			color: $all-font-Hcolor;
		}
	}
	.ulTitle{
		margin-top: 60upx;
		font-size: 32upx;
		letter-spacing: 2upx;
		margin-bottom: 37upx;
		font-weight: bold;
	}
	.ullist{
		display: flex;
		flex-wrap: wrap;
		.wpitem{
			width: 160upx;
			height: 60upx;
			border-radius: 10upx;
			background-color: #EFEFEF;
			color: $all-font-Hcolor;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30upx;
			margin-bottom: 15upx;
		}
		.wpitem:not(:nth-child(4n+1)){
			margin-left: 18upx;
		}
	}
	.tipTxt{
		font-size: 28upx;
		color: $all-font-Hcolor;
		margin: 28upx 0 58upx 0;
	}
	.ygTxt{
		font-size: 34upx;
		font-weight: bold;
		letter-spacing: 2upx;
		margin-bottom: 40upx;
	}
	.wxtip{
		font-size: 28upx;
		flex-shrink: 0;
		color: $all-font-Hcolor;
	}
	.delRow{
		display: flex;
		align-items: center;
		margin-bottom: 40upx;
		justify-content: space-between;
		.numItem{
			display: flex;
			border: 1upx solid #dedede;
			border-left: none;
			border-right: none;
			height: 62upx;
			padding: 0 10upx;
			align-items: center;
			box-sizing: border-box;
			font-size: 28upx;
			color: $all-font-Hcolor;
			text{
				width: 30upx;
			}
		}
	}
	.numBox{
		display: flex;
		// flex: 1;
		align-items: center;
		input{
			flex: 1;
			width: 100upx;
			text-align: center;
		}
	}
	.runBox{
		width: 62upx;
		height: 62upx;
		flex-shrink: 0;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		border: 1upx solid #dedede;
	}
	.comBtn{
		width: 100%;
		height: 82upx;
		background-color: $all-font-Tcolor;
		color: #FFFFFF;
		font-size: 34upx;
		letter-spacing: 4upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom: 0;
	}
	.popBody{
		width: 100%;
		height: 100%;
		padding-top: 20upx;
	}
	//  第二个弹窗样式
	.priceBox{
		padding-top: 54upx;
		>text{
			color:#000;
			font-weight:bold;
			font-size: 32upx;
			margin-right: 18upx;
		}
		>view{
			flex: 1;
			padding: 0 20upx;
			box-sizing: border-box;
			display: flex;
			color: $all-font-Hcolor;
			height: 82upx;
			border: 1upx solid #dedede;
			border-radius: 8upx;
			>input{
				color: #666;
				flex: 1;
				text-align: right;
				padding: 0 24upx;
				box-sizing: border-box;
			}
		}
	}
	.priceTxt{
		justify-content: flex-end;
		margin: 12upx 0 32upx 0;
		.bjNum::after{
			content: " 元 ";
		}
		.bjTxt,.bjNum::after{
			color: $all-font-Hcolor;
			font-size: 30upx;
		}
		.bjNum{
			margin-left: 19upx;
			color: $all-font-Tcolor;
			font-size: 30upx;
		}
	}
	.priTip{
		width:calc(100vw - 56upx);
		margin: 0 auto;
		color: $all-font-Hcolor;
		font-size: 32upx;
		padding-bottom: 34upx;
		border-bottom: 1upx solid #dedede;
	}
	.sbTip{
		margin: 32upx 0;
		font-size: 32upx;
		font-weight: bold;
	}
	.imTip>view{
		font-size: 28upx;
		color: $all-font-Hcolor;
		margin-bottom: 26upx;
	}
	// 寄件备注样式
	.ulremark{
		margin-top: 55upx;
		display: flex;
		flex-wrap: wrap;
		.rmkItem{
			width: 216upx;
			height: 60upx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $all-font-Hcolor;
			font-size: 32upx;
			background-color: #F0F0F0;
			border-radius: 10upx;
			margin-bottom: 18upx;
		};
		.rmkItem:not(:nth-child(3n+1)){
			margin-left: 18upx;
		}
	}
	.remarkarea{
		margin: 0 auto;
		margin-top: 58upx;
		padding: 38upx 30upx;
		box-sizing: border-box;
		position: relative;
		font-size: 30upx;
		width:calc(100vw - 56upx);
		height: 164upx;
		border: 1upx solid #dedede;
		textarea{
			border: none;
			outline: none;
			width: 100%;
		}
		>text{
			position: absolute;
			right: 30upx;
			bottom: 38upx;
			color: $all-font-Hcolor;
		}
	}
	.ullist>.wpact,.ulremark>.kdact{
		color: #fff;
		background-color: $all-font-Tcolor;
		opacity: .8;
	}
</style>
