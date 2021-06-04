<template>
	<view class="whole">
		<view class="hander rowBox">
			<view class="address">
				<text>深圳/宝安区</text>
				<text class="iconfont icon-gjiantous"></text>
				<text>马来西亚/吉隆坡</text>
			</view>
		</view>
		<view class="bfcBox rowBox">
			
			<view class="lineRow">
				<text class="leftName">提货方式</text>
				<view class="right flexCenter">
					<view class="checkbox" :class="{active:thType==1}" @click="_=>{this.thType=1}">上门提货</view>
					<view class="checkbox" :class="{active:thType==2}" @click="_=>{this.thType=2}">自行送仓</view>
				</view>
			</view>
			
			<view class="lineRow" v-if="thType==1">
				<text class="leftName">上门提货时间</text>
				<view class="right flexCenter pickBox">
					<picker @change="bindPickerChange"  range-key="name" @columnchange="columnchange" mode="multiSelector" :value="index" :range="array">
						<view class="uni-input">{{timeTxt?timeTxt:'请选择'}}</view>
					</picker>
					<view class="righticon iconfont icon-youjiantou-copy"></view>
				</view>
			</view>
			
			<view class="lineRow" @click="checkAddress(1)"  v-if="thType==1">
				<view class="tips">提</view>
				<view class="right flex1">
					<view class="addBox rightTxt">
						<view class="flex1 overflowTxt setwidth">从哪里提货?</view>
						<text class="righticon iconfont icon-dizhi"></text>
					</view>
				</view>
			</view>
			
			
			
			<view class="lineRow"  v-if="thType==2">
				<text class="leftName">发货联系人</text>
				<view class="right flex1">
					<view class="addBox rightTxt">
						<view class="flex1 overflowTxt setwidth">
							<input type="text"  placeholder="请输入发货联系人" class="scipt"/>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="lineRow"  v-if="thType==2">
				<text class="leftName">联系电话</text>
				<view class="right flex1">
					<view class="addBox rightTxt">
						<view class="flex1 overflowTxt setwidth">
							<input type="text"  placeholder="发货联系人电话" class="scipt"/>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="lineRow lineRow2" v-if="thType==2">
				<view class="tips">仓</view>
				<view class="right flex1 setstyle">
					请下单后留意短信，仓库地址会在下单后发送给您，或者联系负责您的销售人员提供
				</view>
			</view>
			
			
			<view class="lineRow noborder" @click="checkAddress(2)"> 
				<view class="tips tips2">发</view>
				<view class="right flex1">
					<view class="addBox rightTxt">
						<view class="flex1 overflowTxt setwidth">发到哪里去?</view>
						<text class="righticon iconfont icon-dizhi"></text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="sigleRow rowBox" @click="shopInfo">
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
			
			<view class="lineRow noborder">
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
			<view class="rightFoot" @click="submit">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				thType:2,
				array:[[1,2,3],[{name:'01'},{name:'02'}],[{name:"上午"},{name:"下午"}]],
				index: 0,
				timeTxt:'',
			}
		},
		created(){
			this.getDate();
		},
		methods: {
			submit(){
				// 提交订单
				this.$tool.jump_red("/pages/orderDel/orderDel")
			},
			shopInfo(){
				// 去选择商品信息
				// console.log("进来了");
				this.$tool.jump_nav(`/pages/shoplist/shoplist`)
			},
			checkAddress(val){
				// 选择地址
				this.$tool.jump_nav(`/pages/address/address?ix=${val}`);	
			},
			getLastSixMon() {
			  let data = new Date("2021-05-01");
			  //获取年
			  let year = data.getFullYear();
			  //获取月
			  let mon = data.getMonth() + 1;
			  let arry = new Array();
			  for (let i = 0; i < 6; i++) {
			    if (mon>12) {
			      year = year + 1;
			      mon = 1;
			    }
			    if (mon < 10) {
			      mon = "0" + mon;
			    }
			    arry[i] = {name:year + "年" + mon + "月",key:year+'/'+mon,year:year,mon:mon};
			    mon = parseInt(mon) + 1;
			  }
			  return arry;
			},
			getDate(){
				// 处理时间函数
				let pickerArr = this.array.concat();
				let date = new Date();
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				let arr =  this.getLastSixMon();
				let monArr = [];
				let many = new Date(y,m,0).getDate();
				console.log("many",many)
				let i = new Date().getDate() - 1;
				for(;i<many;++i){
					monArr.push({name:i+1>9?`${i+1}`:'0'+(i+1)})
				}
				pickerArr[0] = arr;
				pickerArr[1] = monArr;
				this.array =  pickerArr;
			},
			bindPickerChange(e){
				// 确定选择
				let arr = e.detail.value;
				let str = this.array[0][arr[0]].key + '/' + this.array[1][arr[1]].name + this.array[2][arr[2]].name;
				this.timeTxt = str;
			},
			columnchange(e){
				// 列改变
				let val = e.detail.value;
				if(e.detail.column==0){
					let pickArr = this.array.concat();
					let arr = [];
					let year = this.array[0][val].year;
					let mon = this.array[0][val].mon;
					let day = new Date(year,mon,0);   //最后一个参数为0,意为获取2018年10月一共多少天
					let currMon = (new Date().getMonth()) + 1;
					let currDay = new Date().getDate();
					let i = 0;
					if(currMon == parseInt(mon)){
						i = currDay-1;
					}
					for(;i<day.getDate();++i){
						arr.push({name:i+1>9?`${i+1}`:'0'+(i+1)});
					}
					pickArr[1] = arr;
					this.array = pickArr;
				}
			}
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
		flex-direction: column;
		align-items: center;
		background-color: $self-body-bgColor;
		padding: 20upx 0;
		padding-bottom: 160upx;
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
		border-radius: 8upx;
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
			.right>.active{
				color: #FFFFFF;
				background-color: $all-font-Tcolor;
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
	.address>.icon-gjiantous{
		margin: 0 20upx;
	}
	.pickBox{
		// background-color: red;
		height: 100%;
		flex: 1;
		// width: 400upx;
		display: flex;
		picker{
			flex: 1;
			color: #333;
		}
		.uni-input{
			text-align: right;
			font-size: 26upx;
		}
		// width: 80%;
	}
	.lineRow2{
		height: 120upx !important;
		>.tips{
			background-color: #E6A235 !important;
		}
	}
	.setstyle{
		background-color: #FAF6EB;
		color: #F8BE6F;
		font-size: 26upx;
		padding: 15upx;
		box-sizing: border-box;
		margin: 0 30upx;
		border-radius: 8upx;
	}
	.scipt{
		text-align: right;
	}
</style>
