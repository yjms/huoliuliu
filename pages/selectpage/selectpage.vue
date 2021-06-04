<template>
	<view class="whole">
		<!-- 这是查询保价页面 -->
		<view class="handerBox">
			<image src="../../static/image/indexbannar.jpg" mode="widthFix"></image>
		</view>
		
		<view class="centerBox allrow">
			
			<view class="rowBox">
				<text>出发地</text>
				<view class="rightBox setOther flex1">
					<!-- <text>请选择</text> -->
					<view class="flex1">
						 <picker @change="pickerStart" @columnchange="chinaColumn"  mode="multiSelector" range-key="country_name_ch" :value="index" :range="startArr">
							<view class="uni-input">{{startObj?`${startObj.pro.country_name_ch}/${startObj.city.country_name_ch}/${startObj.area.country_name_ch}`:"请选择"}}</view>
						</picker>
					</view>
					<text class="iconfont icon-youjiantou-copy righticon"></text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>收货地</text>
				<view class="rightBox setOther flex1">
					<view class="flex1">
						<picker @change="pickerEnd" @columnchange="columnchange"	 mode="multiSelector" range-key="country_name_ch" :value="index" :range="endArr">
							<view class="uni-input">{{endObj?`${endObj.pro.country_name_ch}/${endObj.city.country_name_ch}`:"请选择"}}</view>
						</picker>
					</view>
					<text class="iconfont icon-youjiantou-copy righticon"></text>
				</view>
			</view>
			
			<view class="rowBox">
				<text>货物类型</text>
				<view class="rightBox setOther flex1">
					<!-- <text>请选择</text> -->
					<view class="flex1">
						 <picker @change="pickerType"  range-key="name" :value="index" :range="typeList">
							<view class="uni-input">{{typeObj?`${typeObj.name}`:"请选择"}}</view>
						</picker>
					</view>
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
						<text @click="reduce(1)">-</text>
						<view class="numBox">
							<input type="text" v-model="thingWigth" />
							<text>KG</text>
						</view>
						<text @click="add(1)">+</text>
					</view>
				</view>
			</view>
			
			<view>
				<view class="rowInfo">
					<text>总体积</text>
					<view class="addrdu">
						<text  @click="reduce(2)">-</text>
						<view class="numBox">
							<input type="text" v-model="thingTiji" />
							<text>CBM</text>
						</view>
						<text  @click="add(2)">+</text>
					</view>
				</view>
			</view>
			
			
		</view>
	
		<view class="footBtn allrow" @click="goOrder">
			查询
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				startAdd:"",// 出发地
				endAdd:"",// 收货地
				thingType:"",// 货物类型
				thingWigth:0,// 货物重量
				thingTiji:0,// 货物体积
				typeList:[
					{name:"普货",id:1},
					{name:"内置电池",id:2},
					{name:"配套电池",id:3},
					{name:"纺织品",id:4},
					{name:"弱磁",id:5}
				],
				startArr:[
					[
						{name:"深圳",id:"1"}
					],
					[
						{name:"宝安区",id:"1"}
					],
					[
						{name:"宝安区",id:"1"}
					]
				],
				endArr:[
					[
						{name:"马来西亚",id:"1"}
					],
					[
						{name:"吉隆坡",id:"1"}
					]
				],
				startObj:null,// 出发地对象
				endObj:null,// 收货地对象
				typeObj:null,// 货物类型对象
			}
		},
		created(){
			this.getCountry();
			this.initCity(1,"pro"); // 第一次调用是获取省份
		},
		methods: {
			// 中国的country_ID:1
			getCountry(){
				//  获取国家
				let arr =  this.endArr.concat();
				let dat = {
					functionType:26,
				}
				this.$api(dat).then(res=>{
					// console.log("res",res.data);
					if(res.data.MsgID==1){
						console.log(JSON.parse(res.data.Msg));
						arr[0] = JSON.parse(res.data.Msg).ds;
						this.endArr = arr;
						this.initCity(this.endArr[0][0].country_ID); //根据国家id获取国家城市
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			initCity(id,pro=""){
				//  初始化国家城市
				let arr =  pro === "pro" ? this.startArr.concat() : this.endArr.concat();
				let dat = {
					functionType:2,
					countryID:id
				}
				this.$api(dat).then(res=>{
					if(res.data.MsgID==1){
						let type = toString.call(JSON.parse(res.data.Msg).ds);
						if(type != "[object Array]") return;
						let zjArr = JSON.parse(res.data.Msg).ds;
						zjArr = zjArr.map((it,ix)=>{
							it.country_name_ch = it.pName;
							return it;
						})
						if(pro == "pro"){
							arr[0] = zjArr;
							this.startArr = arr;
							this.initCitys(this.startArr[0][0].PID);
						}else{
							arr[1] = zjArr;
							this.endArr = arr;
						}
						
						 // ? this.startArr
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			initCitys(id){
				//  获取中国的城市
				let arr =  this.startArr.concat();
				let dat = {
					functionType:3,
					ProvinceID:id
				}
				this.$api(dat).then(res=>{
					// console.log("res",res.data);
					if(res.data.MsgID==1){
						let zjArr = JSON.parse(res.data.Msg).ds;
						zjArr = zjArr.map((it,ix)=>{
							it.country_name_ch = it.cName;
							return it;
						})
						arr[1] = zjArr;
						this.startArr = arr;
						console.log("this.startArr",this.startArr)
						this.initArea(this.startArr[1][0].CID); //根据国家id获取国家城市
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			initArea(id){
				//  获取城市所有的区域
				let arr =  this.startArr.concat();
				let dat = {
					functionType:4,
					CityID:id
				}
				this.$api(dat).then(res=>{
					// console.log("res",res.data);
					if(res.data.MsgID==1){
						let zjArr = JSON.parse(res.data.Msg).ds;
						zjArr = zjArr.map((it,ix)=>{
							it.country_name_ch = it.UName;
							return it;
						})
						arr[2] = zjArr;
						this.startArr = arr;
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			chinaColumn(e){
				//  改变中国的省 市
				if(e.detail.column==0){
					this.initCitys(this.startArr[0][e.detail.value].PID);
				}else if(e.detail.column==1){
					this.initArea(this.startArr[1][e.detail.value].CID);
				}
				
			},
			columnchange(e){
				//  改变国家 重新计算发货地
				if(e.detail.column==0){
					this.initCity(this.endArr[0][e.detail.value].country_ID);
				}
			},
			pickerStart(e){
				// 选择出发地
				let obj = {};
				let arr = e.detail.value;
				obj.pro = this.startArr[0][arr[0]];
				obj.city = this.startArr[1][arr[1]];
				obj.area = this.startArr[2][arr[2]];
				this.startObj = obj;
			},
			pickerEnd(e){
				// 选择收货地
				let obj = {};
				let arr = e.detail.value;
				obj.pro = this.endArr[0][arr[0]];
				obj.city = this.endArr[1][arr[1]];
				this.endObj = obj;
			},
			pickerType(e){
				// console.log("1111",e);
				this.typeObj = this.typeList[e.detail.value];
			},
			goOrder(){
				//去下单
				if(!this.startObj){
					this.$tool.showTip("请选择出发地!");
					return
				}
				if(!this.endObj){
					this.$tool.showTip("请选择收货地!");
					return
				}
				if(!this.typeObj){
					this.$tool.showTip("请选择货物类型!");
					return
				}
				if(!this.thingWigth){
					this.$tool.showTip("请填写重量!");
					return
				}
				if(!this.thingTiji){
					this.$tool.showTip("请填写体积!");
					return
				}
				let dat = {
					functionType:"33",
					ckid_sender:"",
					ckid_recer:"",
					huowuleibie:"",
					weight:"",
					volume:""
				}
				this.$api(dat).then(res=>{
					console.log("获取报价信息",res.data);
				})
				// this.$tool.jump_nav("/pages/sayprice/sayprice");
			},
			getckList(){
				// 根据国家id 获取仓库
				let dat = {
					
				}
				this.$api(dat).then(res=>{
					console.log("所有仓库",res.data);
				})
			},
			reduce(type){
				// 减 重量体积
				switch(type){
					case 1:
					// console.log("减重量")
					this.thingWigth = this.thingWigth>0 ? --this.thingWigth : this.thingWigth;
					break;
					case 2:
					// console.log("减体积")
					this.thingTiji = this.thingTiji>0 ? --this.thingTiji : this.thingTiji;
					break;
				}
			},
			add(type){
				// 加 重量体积
				switch(type){
					case 1:
					// console.log("加重量")
					this.thingWigth = ++this.thingWigth;
					break;
					case 2:
					// console.log("加体积")
					this.thingTiji = ++this.thingTiji;
					break;
				}
			}
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
	.setOther{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 30upx;
		color: #888;
		>view{
			display: flex;
			justify-content: flex-end;
			picker{
				width: 100%;
				text-align: right;
				// background-color: red;
			}
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
			// background-color: ;
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
			border: 10upx solid transparent;
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
