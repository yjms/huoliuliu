<template>
	<view class="whole">
		<view class="iptBox bgWhile">
			<view class="row1 iptRow">
				<input type="text" value="" placeholder="姓名" class="iptItem" v-model="userName"/>
			</view>
			<view class="row1 iptRow">
				<input type="text" value="" placeholder="手机号码或固话" class="iptItem" v-model="userPhone"/>
			</view>
			<view class="row1 iptRow" @click="changeArea">
				<!-- <picker class="setwh" @change="bindPickerChange" @columnchange="columnchange" value="0"  range-key="pName"  mode="multiSelector" :range="array"> -->
					<view class="uni-input setwh flex_col">{{areaName|| "地区"}}</view>
				<!-- </picker> -->
			</view>
			<view class="row1 iptRow">
				<input type="text" value="" placeholder="输入街道、门牌号等信息" class="iptItem" v-model="addressDel"/>
			</view>
			<view class="row1 iptRow">
				<view class="towcol flex_col" @click="changeDefault">
					<view class="checkType" @click="()=>{this.addType=1}">
						<text class="iconfont icon-weixuanzhong" v-show="addType==2"></text>
						<text class="iconfont icon-xuanzhong" v-show="addType==1"></text>
						<text class="txt">寄件地址</text>
					</view>
					
					<view class="checkType" @click="()=>{this.addType=2}">
						<text class="iconfont icon-weixuanzhong" v-show="addType==1"></text>
						<text class="iconfont icon-xuanzhong" v-show="addType==2"></text>
						<text class="txt">收件地址</text>
					</view>
				</view>
				<!-- <text class="clear">清空</text> -->
			</view>
		</view>
		<view class="comBtn" @click="runAddress">
			确定
		</view>
		<view class="pickBox" v-show="showArea">
			<view class="headers" @click="changeArea(1)"></view>
			<view class="foot">
				<view class="pickerTop">
					<text @click="changeArea(1)">取消</text>
					<text @click="changeArea(2)">确定</text>
				</view>
				<picker-view  v-if="visible"  mode="multiSelector" :indicator-style="indicatorStyle"  value="PID" @change="bindChange" class="picker-view">
				    <picker-view-column>
				        <view class="item" v-for="(item,index) in province" :key="index" :data-val="item.PID" >{{item.pName}}</view>
				    </picker-view-column>
				    <picker-view-column>
				        <view class="item" v-for="(item,index) in city" :key="index">{{item.cName}}</view>
				    </picker-view-column>
				    <picker-view-column>
				        <view class="item" v-for="(item,index) in area" :key="index">{{item.UName}}</view>
				    </picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				 province:[],// 省
				 city:[],// 市
				 area:[],// 区
				 visible:true, //  默认不显示picker
				 arr:[0,0,0],
				 showArea:false,// 是否显示地区组件
				 endArr:[],// 保存最终选择的数组
				 userName:'',
				 userPhone:'',
				 areaName:'',
				 addressDel:'',// 详细地址	
				 pram:{},//接受传过来的参数
				 areaId:'',// 区域id
				 addType:1,// 默认为寄件地址
				 addID:'',// 地址id
			}
		},
		created(){
			this.getArea("pro");
		},
		onLoad(query){
			this.pram = query;
			
			if(query.type=="edit"){
				console.log("6666",this.$tool.getstorage("address"));
				let obj = JSON.parse(this.$tool.getstorage("address"));
				this.userName = obj.ma_receiver;
				this.userPhone = obj.ma_Mobile;
				this.addressDel = obj.ma_address;
				this.areaId = obj.ZoneID;
				this.areaName = obj.zoneName;
				this.addID = obj.ma_id;
				// let arr = obj.zoneName
				
			}
		},
		methods: {
			checkPhone(val){ 
				let phone = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))[0-9]{8}$/
				  let ring = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
				  return phone.test(val) || ring.test(val)
			},
			runAddress(){
				//  操作地址
				console.log("类型",this.pram);
				// return
				if(!this.userName.trim()){
					this.$tool.showTip("请填写姓名！");
					return
				}
				if(!this.checkPhone(this.userPhone)){
					this.$tool.showTip("请填写正确手机号！");
					return
				}
				if(!this.areaId){
					 this.$tool.showTip("请选择地区！");
					 return
				}
				if(!this.addressDel.trim()){
					this.$tool.showTip("请填写详细地址！");
					return
				}
				
				let dat = {
					functionType:15,
					weixinID:this.$tool.getstorage("openid"),
					xingming:this.userName,
					ZoneID:this.areaId,// 区域id
					address:this.addressDel,
					tel:this.userPhone,
					email:'',
					m_type:this.addType, // 1 收货地址  2 发货地址
					ma_id:this.pram.type=='edit'?this.addID:'0'  // 0 为新增   id为编辑
				}
				this.$api(dat).then(res=>{
					// console.log("这是操作地址信息",res);
					if(res.data.MsgID==1){
						this.$tool.showTip("操作成功！");
						this.$tool.jump_back();
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			changeArea(type){
				this.showArea = !this.showArea;
				if(type == 1){
					console.log("取消")
					return
				}
				if(type == 2){
					let arr = [];
					arr.push(this.province[this.arr[0]],this.city[this.arr[1]],this.area[this.arr[2]]);
					this.endArr = arr;
					this.areaId = this.endArr[2].UID;
					this.areaName = `${this.endArr[0].pName}_${this.endArr[1].cName}_${this.endArr[2].UName}`
					// console.log(this.endArr,"区域信息");
					return
				}
			},
			bindChange(e){
				console.log("看看e",e)
				let column = e.detail.value;
				if(this.arr[0] != column[0]){
					// console.log("第一列滚动",column)
					this.getArea('city',column[0]);
					this.arr = [...column] ;
					return
				}
				if(this.arr[1] != column[1]){
					// console.log("第二列滚动");
					this.getArea('area',column[1]);
					this.arr = [...column]; 
					return
				}
				if(this.arr[2]!=column[2]){
					// console.log("第三列滚动");
					this.arr = [...column]; 
					return;
				}
			},
			getArea(type,ix=0){ //  获取省
				let obj = {pro:12,city:13,area:14}
				let dat = {
					functionType:obj[type]
				}
				type == 'city' ? dat.ProvinceID = this.province[ix].PID:'';
				type == 'area' ? dat.CityID = this.city[ix].CID:'';
				this.$api(dat).then(res=>{
					// console.log("看看省市区",res.data.Msg);
					if(res.data.MsgID == 1){
						if(type=='pro'){
							this.province = JSON.parse(res.data.Msg).ds;
							// console.log("省",this.province)
							this.getArea("city");
							return
						}
						if(type == 'city'){
							this.city = JSON.parse(res.data.Msg).ds;
							// console.log("市",this.city)
							this.getArea('area')
							return;
						}
						if(type=='area'){
							this.area = JSON.parse(res.data.Msg).ds;
							// console.log("区",this.area)
							return
						}
					}else{
						this.$tool.showTip(res.data.Msg)
					}
				})
			},
			changeDefault(){
				// 是否为默认
				
			}
		}
	}
</script>

<style lang="scss">
	// 公共样式
	.bgWhile{
		background-color: #FFFFFF;
	}
	.row{
		width: 100%;
		padding: 0 28upx;
		box-sizing: border-box;
	}
	.row1{
		width: calc(100vw - 56upx);
		margin: 0 auto;
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
	.whole{
		width: 100vw;
		height: 100vh;
		background-color: $self-body-bgColor;
	}
	.iptBox>.iptRow:not(:last-child){
		border-bottom: 1upx solid #dedede;
	}
	.iptRow{
		display: flex;
		align-items: center;
		height: 88upx;
		justify-content: space-between;
	}
	.iptItem{
		width: 100%;
		font-size: 30upx;
		padding: 0 10upx;
		box-sizing: border-box;
	}
	.comBtn{
		width: 700upx;
		height: 75upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 32upx;
		background-color: $all-font-Tcolor;
		border-radius: 50upx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 60upx;
	}
	.icon-weixuanzhong{
		font-size: 36upx;
	}
	.icon-xuanzhong{
		color: $all-font-Tcolor;
	}
	.clear{
		color: $all-font-Hcolor;
		font-size: 32upx;
	}
	.towcol{
		padding: 0 10upx;
		box-sizing: border-box;
	}
	.setwh{
		width: 100%;
		// height: 100%;
	}
	// picker 组件
	.pickBox{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		// background-color: #FFFFFF;
		z-index: 99;
		display: flex;
		flex-direction: column;
		.headers{
			width: 100%;
			flex: 1;
			background-color: rgba(0,0,0,.3);
		}
		.foot{
			width: 100%;
			height: 500upx;
			background-color: #FFFFFF;
			animation: pickerTop .3s linear;
			position: absolute;
			bottom: 0;
		}
	}
	.pickerTop{
		width: 100%;
		// height: 60upx;
		display: flex;
		justify-content: space-between;
		padding: 15upx 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #888;
	}
	.pickerTop>text:last-child{
		color: $all-font-Tcolor;
	}
	.picker-view {
	      width: 750rpx;
	      height: 600rpx;
	      margin-top: 20rpx;
	  }
	  .item {
	      height: 100upx;
	      // align-items: center;
	      justify-content: center;
	      text-align: center;
		  font-size: 28upx;
		  line-height: 70upx;
	  }
 .checkType{
	display: flex;
	align-items: center;
	.txt{
		color: #666;
		font-size: 28upx;
		margin-right: 30upx;
		margin-left: 5upx;
	}
 }
	@keyframes pickerTop{
		0%{
			bottom: -100%;
		}
		100%{
			bottom: 0%;
		}
	}
</style>
