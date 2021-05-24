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
				<view class="rowline">
					<text>长(cm)</text>
					<input type="text" placeholder="请输入" />
				</view>
				<view class="rowline">
					<text>宽(cm)</text>
					<input type="text" placeholder="请输入" />
				</view>
				<view class="rowline">
					<text>高(cm)</text>
					<input type="text" placeholder="请输入" />
				</view>
				<view class="rowline">
					<text>重量(kg)</text>
					<input type="text" placeholder="请输入" />
				</view>
				<view class="rowline">
					<text>中国HSCode</text>
					<input type="text" placeholder="请输入" />
				</view>
				<view class="rowline">
					<text>销售链接</text>
					<input type="text" placeholder="请填写销售链接" />
				</view>
				<view class="rowline">
					<text>用途</text>
					<input type="text" placeholder="备注信息" />
				</view>
				<view class="rowline">
					<text>申报要素</text>
					<input type="text" placeholder="申报要素" />
				</view>
			</view>
			
			<view class="popBody" v-if="showType==1">
				<view class="ulremark row"  v-if="false">
					<view class="rmkItem" v-for="(item,index) in remark" :key="item" :class="kdType == index+1 ? 'kdact':''" @click="()=>{this.kdType = index + 1}">
						{{item}}
					</view>
				</view>
				<view class="rowline">
					<text>目的国</text>
					<view class="right">
						<!-- <text>点击选择</text> -->
						<view class="flex1">
							<picker  @change="bindPickerChange"  range-key="name"  :value="index" :range="array">
								<view class="uni-input">{{mdcount?mdcount:'请选择'}}</view>
							</picker>
						</view>
						<text class="iconfont icon-youjiantou-copy"></text>
					</view>
					<!-- <input type="text" placeholder="请输入" /> -->
				</view>
				<view class="rowline">
					<text>申报价值</text>
					<input type="text" placeholder="请输入" />
				</view>
				<!-- <view class="remarkarea">
					<textarea  placeholder="备注说明" maxlength="30" v-model="remarkTxt"/>
					<text>{{remarkTxt.length}}/30</text>
				</view> -->
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
				titleList:['选择物品类型重量和体积','保价','其他信息'],
				array:[{name:"阿富汗",id:1},{name:"越南",id:2},{name:"缅甸",id:3}],
				wpType:0,// 默认没物品类型0
				kdType:0,//对快递员说 类型
				wigths:0,//重量
				tiji:0,// 体积
				wpthings:0,// 物品件数
				remarkTxt:'', // 备注
				bjprice:'',// 保价多少钱
				mdcount:"",//目的国名称
			}
		},
		mounted(){
			
		},
		methods:{
			bindPickerChange(e){
				// console.log("看看e",e);
				this.mdcount = this.array[e.detail.value].name; 
			},
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
	// 其他物品样式
	.rowline{
		width: 92%;
		height: 96upx;
		margin: 0 auto;
		// background-color: red;
		align-items: center;
		display: flex;
		color: #333;
		font-size: 30upx;
		border-bottom: 1upx solid #dedede;
		text{
			width: 200upx;
		}
		.right{
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// background-color: red;
			text{
				width: auto;
			}
		}
	}
	.popBody>.rowline:last-of-type{
		border-bottom: none;
	}
</style>
