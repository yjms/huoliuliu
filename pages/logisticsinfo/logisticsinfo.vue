<template>
	<view class="whole">
		<view class="header">
			<view class="iptBox">
				<text class="seachIcon iconfont icon-chaxun"></text>
				<input type="text" placeholder="请输入运单号" v-model="keyword"   @focus="search(1)"/>
			</view>
			<view class="searchTxt" v-show="searchStatus" @click="search(3)">
				查询
			</view>
			<view class="saoma iconfont icon-saoma" v-show="!searchStatus" @click="scancode" >
				<!-- 扫码 -->
			</view>
		</view>
		<view class="zhanwei">
			
		</view>
		<view class="nodata" v-if="!hasData">
			<Nodata></Nodata>
		</view>
		<view class="centerBox" v-if="hasData">
			<view class="itemBox" :class="it.status==1?'final':'wling'" v-for="(it,index) in dataList" :key="it">
				<view class="statusTxt">{{it.statusTxt}}</view>
				<view class="rigInfo">
					<!-- 5-7-7 -->
					<!-- <text class="time">{{it.addtime?it.addtime:'暂无'}}</text> 2019143-->
					<text>{{it.content}}</text>
					<!-- <view class="start" v-show="index==1">发</view> -->
					<view class="end" v-show="it.content.indexOf('签收信息')> -1">签</view>
					<!-- 大菱形 -->
					<view class="startbox"  :class="it.status==1?'hsbox':'lsbox'" v-show="it.content.indexOf('签收信息')> -1"></view>
					<!-- 小菱形 -->
					<view class="center" :class="it.status==1?'hsbox':'lsbox'" v-show="!it.content.indexOf('签收信息')> -1"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Nodata from "../components/nodata.vue"
	export default {
		components:{
			Nodata
		},
		data() {
			return {
				keyword:'',
				hasData:false,//默认没数据。
				searchStatus:false,
				dataList:[
					// {
					// 	status:1,
					// 	statusTxt:'已取件',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'运送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'运送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'运送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'运送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'运送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'运送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:1,
					// 	statusTxt:'派送中',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// },
					// {
					// 	status:2,
					// 	statusTxt:'已签收',
					// 	time:'2012-03-03 09:41',
					// 	info:"您的快件代签收（驿站）,如有疑问请电联快递员【翼龙，电话176736155001】。疫情期间顺丰每日对网点消毒、快递员每日测温、佩戴口罩，感谢您使用顺丰，期待在次为您服务。",
					// }
				]
			}
		},
		mounted(){
			this.dataList = this.dataList.reverse();
		},
		onLoad(option){
			if(option.num||option.num==0){
				this.keyword = option.num;
				this.getwuliu();
			}
		},
		methods: {
			getwuliu(){// 获取物流信息
				let dat = {
					functionType:3,
					orderNOColl:this.keyword
				}
				this.$api(dat).then(res=>{
					// console.log("物流数据",res)
					if(res.data.MsgID==1){
						this.dataList = JSON.parse(res.data.Msg).ds;
						let arr = this.dataList;
						// console.log(arr,'9989');
						arr = arr.map((it,ix)=>{
							if(ix==0){
								it.status = 2;
							}else{
								it.status = 1;
							}
							return it;
						})
						console.log("物流信息2",arr);
						this.dataList = arr;
						console.log("物流信息",this.dataList)
						this.dataList.length>0?this.hasData=true : this.hasData=false;
					}else{
						this.hasData=false;
					}
				})
			},
			scancode(){
				// 只允许通过相机扫码
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				});
			},
			search(type){
				type == 1 ? this.searchStatus = true : this.searchStatus = false;
				if(type ==  3 || type ==  2){
					this.timeTab = 0;
					this.getwuliu();
					// this.dealfun();
				}
			}
		}
	}
</script>

<style lang="scss" scoped> 
	.whole{
		display: flex;
		width: 100vw;
		min-height: 100vh;
		flex-direction: column;
		background-color: $self-body-bgColor;
	}
	.bgWhile{
		background-color: #FFFFFF;
	}
	.header{
		width: 100%;
		display: flex;
		position: fixed;
		left: 50%;
		top: 0upx;
		transform: translateX(-50%);
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		justify-content: center;
		z-index: 99;
		height: 160upx;
		align-items: center;
	}
	.iptBox{
		display: flex;
		width:615upx;
		height: 70upx;
		border-radius: 35upx;
		background-color: #F7F7F7;
		align-items: center;
		padding: 0 28upx;
		box-sizing: border-box;
	}
	.iptBox>input{
		margin-left: 12upx;
		flex: 1;
		font-size: 28upx;
	}
	.navBox{
		width: 100%;
		// padding: 0 0upx;
		padding-bottom: 6upx;
		padding-top: 130upx;
		display: flex;
		justify-content: space-around;
		border-bottom: 2upx solid #F2F2F2;
		box-sizing: border-box;
	}
	//all-font-Tcolor
	.navBox>.navItem{
		display: flex;
		justify-content: center;
		padding-bottom: 20upx;
		font-size: 34upx;
		color: $all-font-Hcolor;
	}
	.navBox>.active{
		color: $all-font-Tcolor;
		position: relative;
	}
	.navBox>.active::before{
		content: "";
		width: 100%;
		height: 4upx;
		background-color: $all-font-Tcolor;
		position: absolute;
		bottom: 0;
	}
	.navTime{
		width: 100%;
		height: 108upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.navTime>.timeItem{
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333;
		height: 60upx;
		font-size: 28upx;
		border-radius: 30upx;
		background-color: #F2F2F2;
	}
	.navTime>.active{
		color: $all-font-Tcolor;
		background-color: #EDF3FE;
	}
	.kjList{
		width: 100%;
		flex: 1;
		background-color: #F2F2F2;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	// .kjList>.nodata{
	// 	font-size: 80upx;
	// 	color: #ddd;
	// }
	.kjList>.noText{
		font-size: 32upx;
		color: #ddd;
	}
	.seachIcon{
		font-size: 52upx;
		color: #999;
	}
	.saoma{
		font-size: 46upx;
		margin-left: 18upx;
	}
	.header>.searchTxt{
		color: #888;
		font-size: 30upx;
		margin-left: 2upx;
		border: 8upx solid #FFFFFF;
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
	.itemBox{
		display: flex;
		width: 100%;
		padding:0upx 66upx 50upx 40upx;
		box-sizing: border-box;
	}
	.statusTxt{
		font-size: 32upx;
		color: $all-font-Tcolor;
		font-weight: bold;
	}
	.rigInfo{
		display: flex;
		flex-direction: column;
		flex: 1;
		text-align: justify;
		padding-left: 50upx;
		box-sizing: border-box;
		margin-left: 34upx;
		position: relative;
		font-size: 28upx;
	}
	.itemBox>.rigInfo::before{
		content: "";
		width: 0upx;
		// height: 50upx;
		border-left: 2upx dashed $all-font-Hcolor;
		position: absolute;
		left: 0;
		top: 0;
	}
	.itemBox:not(:last-child)>.rigInfo::before{
		height:calc(100% + 50upx);
	}
	.time{
		font-size: 28upx;
	}
	.final,.final>.statusTxt{
		color: #888;
	}
	.final>.statusTxt{
		font-size: 32upx;
		font-weight: bold;
	}
	.start,.end{
		position: absolute;
		left: 0;
		color: red;
		top: 0;
		transform: translateX(-50%);
		z-index: 99;
		font-size: 26upx;
		line-height: 42upx;
		color: #fff !important;
	}
	.startbox,.center{
		width: 46upx;
		height: 46upx;
		background-color: #dedede;
		border-radius: 8upx;
		position: absolute;
		left: 0;
		top: 0;
		transform: translateX(-50%) rotate(45deg);
	}
	.center{
		width: 20upx;
		height: 20upx;
		top: 0upx;
	}
	.hsbox{
		background-color: #dedede;
	}
	.zhanwei{
		width: 100%;
		height: 180upx;
	}
	.nodata{
		flex: 1;
		width: 100%;
		height: 80vh;
		// background-color: red;
	}
	
</style>
