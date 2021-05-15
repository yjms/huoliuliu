<template>
	<view class="whole">
		<view class="bgWhile setbuttom">
			<view class="header row">
				<view class="sjadd" :class="currTab==0?'tabAct':''" @click="changTab(0)">
					所有订单
				</view>
				<view class="jjadd" :class="currTab==1?'tabAct':''" @click="changTab(1)">
					正在处理
				</view>
				<view class="jjadd" :class="currTab==2?'tabAct':''" @click="changTab(2)">
					作废订单
				</view>
				<view class="sjadd" :class="currTab==3?'tabAct':''" @click="changTab(3)">
					已处理
				</view>
			</view>
		</view>
		<view class="nodataBox" v-if="!hasData">
			<Nodata></Nodata>
		</view>
		<view class="ullist" v-if="hasData">
			
			<view class="ulitem row bgWhile" v-for="(it,ix) in yyList" :key="it">
				<view class="ltops">
					<text>下单时间:{{it.mo_Time}}</text>
					<text>付款方式:到付</text>
				</view>	
				<view class="flex_col">
					<view class="leftinfo">
						<view class="ltop flex_col">
							<view class="dot">寄</view>
							<view class="flex1 setstyle">
								<text class="txtInfo">{{it.mo_fahuorenxingming}} {{it.mo_fahuorenTel}}</text>
								<text class="txtInfo">{{it.mo_zone_sender}}</text>
							</view>
						</view>
						
						<view class="headCenter">
							<text class="iconfont icon-zhuanhuan"></text>
							<view class="linebox"></view>
						</view>
						
						<view class="lcenter flex_col">
							<view class="accpte">收</view>
							<view class="flex1 setstyle">
								<text class="txtInfo">{{it.mo_shouhuorenxingming}} {{it.mo_shouhuorenTel}}</text>	
								<text class="txtInfo">{{it.mo_zone_recer}}</text>
							</view>
						</view>
						
						
					</view>
					<view class="editBox iconfont icon-bianjimian" @click.stop="editAddress(it)"></view>
					<view class="delBox iconfont icon-shanchu" @click.stop="delOrder(it.mo_id)"></view>
				</view>
				<view class="lfoot">
					<view>备注 : {{it.mo_qujianbeizhu?it.mo_qujianbeizhu:'无'}}</view>
				</view>
			</view>
			<!-- v-if="moreData" -->
			<text class="nomore" v-if="moreData">~没有更多数据啦~</text>
		</view>
		<view class="address" @click="yuyue">寄</view>
		
		<view class="delPop" v-if="delPop">
			<view class="delcenter animated bounceIn">
				<view class="top">
					确定取消该订单？
				</view>
				<view class="foot">
					<view class="cancel" @click="showhide(1)">取消</view>
					<view class="comfim" @click="showhide(2)">确定</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Nodata from "@/pages/components/nodata.vue"
	export default {
		components:{
			Nodata
		},
		data() {
			return {
				hasData:true,// 是否有数据	
				currTab:0,// 默认查寄件地址
				addressData:[],// 存放地址数据
				delPop:false,// 默认不显示删除弹窗
				delId:null,// 删除的地址id
				pram:{},// 保存地址栏参数
				yyList:[],// 我的预约寄件数组
				moreData:false,//是否有更多数据
				pageIndex:1,// 分页index
			}
		},
		mounted(){
			// this.getAddress();
		},
		onReachBottom(){//uniapp 监听下拉加载生命周期
			// console.log("上拉加载")
			this.pageIndex = ++this.pageIndex;
			this.getyuyue();
		},
		onLoad(pram){
			this.pram = pram;
			this.getyuyue();
		},
		methods:{
			getyuyue(){ //获取预约寄件
				let dat = {
					functionType:21,
					weixinID:this.$tool.getstorage("openid"),
					OrderNo:'',
					beginDate:'',
					endDate:'',
					dingdanzhuangtai:this.currTab,
					pageSize:10,
					pageIndex:this.pageIndex
				}
				this.$api(dat).then(res=>{
					if(res.data.MsgID==1){
						// console.log("这是预约寄件数据",JSON.parse(res.data.Msg).ds)
						let arr = [];
						if(JSON.parse(res.data.Msg).ds instanceof Array){
							arr = JSON.parse(res.data.Msg).ds;
						}
						this.yyList =[...this.yyList,...arr];
						console.log("数组",this.yyList);
						arr.length<10?this.moreData = true : this.hasData = false;
						this.yyList.length>0?this.hasData=true : this.hasData =false;
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			showhide(type){
				//  显示删除弹窗
			 this.delPop = !this.delPop;
			 if(type==2){
				 let dat = {
					 functionType:19,
					 weixinID:this.$tool.getstorage("openid"),
					 mo_id:this.delId
				 }
				 this.$api(dat
				 ).then(res=>{
					 if(res.data.MsgID==1){
						 this.$tool.showTip("删除成功！");
						 this.yyList = [];
						 this.getyuyue();
					 }else{
						 this.$tool.showTip(res.data.Msg);
					 }
				 })
			 }
			},
			changTab(tab){
				// 切换选项卡
				this.yyList = [];
				this.pageIndex = 1;
				this.currTab = tab;
				this.getyuyue();
			},
			editAddress(it){
				// 编辑地址
				this.getsignOrder(it.mo_id);
			},
			getsignOrder(id){ //  获取单个订单的数据
				let dat = {
					functionType:20,
					weixinID:this.$tool.getstorage("openid"),
					mo_id:id
				}
				this.$api(dat).then(res=>{
					if(res.data.MsgID==1){
						console.log("这是单个订单",JSON.parse(res.data.Msg).ds);
						this.jump_setstorage(JSON.parse(res.data.Msg).ds[0])
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			jump_setstorage(it){
				// 跳转设置缓存
				let pram = {
					 type:{
						 ix:1
					 },
					 obj:{
						 "ma_receiver":it.mo_fahuorenxingming,
						 "ZoneID":it.mo_zoneID_sender,
						 "zoneName":it.mo_zone_sender,
						 "ma_address":it.address_sender,
						 "ma_Mobile":it.mo_fahuorenTel,
					 }
				}
				let pram2 = {
				 type:{
					 ix:2
				 },
				 obj:{
					 "ma_receiver":it.mo_shouhuorenxingming,
					 "ZoneID":it.mo_zoneID_recer,
					 "zoneName":it.mo_zone_recer,
					 "ma_address":it.address_recer,
					 "ma_Mobile":it.mo_shouhuorenTel
				 }
				}
				this.$tool.setstorage("pram",JSON.stringify(pram));
				this.$tool.setstorage("pram2",JSON.stringify(pram2));
				this.$tool.jump_nav(`/pages/appoint/appoint?query=${JSON.stringify(it)}`);
			},
			delOrder(adId){
				// 删除地址
				this.delId = adId;
				this.showhide(1,adId);
			},
			yuyue(){
				this.$tool.setstorage("pram","");
				this.$tool.setstorage("pram2","");
				this.$tool.jump_red('/pages/appoint/appoint');
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		min-height: 100vh;
		background-color: $self-body-bgColor;
		display: flex;
		flex-direction: column;
	}
	.header{
		display: flex;
		height: 100upx;
		justify-content: space-around;
		align-items: center;
		>.jjadd,.sjadd{
			// width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $all-font-Hcolor;
			padding-bottom: 20upx;
			box-sizing: border-box;
		}
		.tabAct::before{
			position: absolute;
			content: "";
			width: 100%;
			height: 4upx;
			background-color: $all-font-Tcolor;
			bottom: 0;
		}
		.tabAct{
			position: relative;
			color: $all-font-Tcolor;
		}
	}
	.searchIpt{
		height: 64upx;
		border-radius: 38upx;
		background-color: #EBF0F1;
		padding: 0 24upx;
		text{
			font-size: 50upx;
			color: $all-font-Hcolor;
		}
		>input{
			flex: 1;
			margin-left: 16upx;
			font-size: 30upx;
		}
	}
	.setbuttom{
		padding-bottom: 12upx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		width: 100%;
	}
	.ullist{
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		width: 95%;
		padding-top: 140upx;
		border-radius: 10upx;
		overflow: hidden;
		position: relative;
		padding-bottom: 20upx;
		.ulitem{
			width: 100%;
			// height: 360upx;
			display: flex;
			flex-direction: column;
			margin-bottom: 30upx;
			padding-bottom: 15upx;
		}
	}
	.ullist .leftinfo>.ltop{
		width: 468upx;
		margin-bottom: 18upx;
		justify-content: space-between;
		text{
			font-size: 30upx;
			color: #333;
		}
		
	}
	.dot,.accpte{
		width: 60upx;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: #3578FB;
		color: #FFFFFF;
		font-size: 28upx;
	}
	.accpte{
		background-color: #F5913C;
	}
	.leftinfo>.lcenter,.leftinfo>.lfoot{
		font-size: 30upx;
		color: #333;
		margin-bottom: 18upx;
	}
	.leftinfo>.lfoot{
		margin: 0;
	}
	.editBox,.delBox{
		margin-left: 20upx;
		border: 1upx solid #dedede;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: none;
		border-bottom: none;
		width: 104upx;
		color: $all-font-Tcolor;
		font-size: 44upx;
	}
	.delBox{
		margin: 0;
		border: none;
	}
	.nodataBox{
		// flex: 1;
		height: 100vh;
		width:100vw;
		// background-color: red;
	}
	.address{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		background-color: #17A05D;
		border-radius: 40upx;
		position: fixed;
		bottom: 50upx;
		right: 20upx;
		color:#FFFFFF;
		text-align: center;
		font-size: 30upx;
		line-height: 80upx;
		z-index: 9;
		box-shadow: -0.5px .5px 6px #888888;
	}
	//  删除提示框
	.delPop{
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		.delcenter{
			width: 580upx;
			height: 300upx;
			border-radius: 20upx;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			.top{
				flex: 1;
				width: 100%;
				// background-color: red;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32upx;
				color: #666;
			}
			.foot{
				height: 75upx;
				display: flex;
				border-top: 1upx solid #dedede;
				view{
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					color: #888;
				}
				.cancel{
					border-right: 1upx solid #dedede;
					box-sizing: border-box;
				}
				.comfim{
					color: $all-font-Tcolor;
				}
			}
		}
	}
	.flex1{
		flex: 1;
	}
	.txtInfo{
		padding-left: 15upx;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow:ellipsis; 
		white-space: nowrap;
		flex-shrink: 0;
		width: 380upx;
	}
	
	.headCenter{
		display: flex;
		align-items: center;
		padding-left: 10rpx;
		width: 100%;
		box-sizing: border-box;
		margin: 15upx 0;
	}
	.headCenter>text{
		color: #999;
	}
	.headCenter>.linebox{
		// width: ;
		flex: 1;
		margin-left: 18upx;
		height: 2upx;
		background-color: #dedede;
	}
	.ltops{
		display: flex;
		margin:15upx 0;
		justify-content: space-between;
	}
	.ltops>text{
		color: #888;
		font-size: 30upx;
		letter-spacing: 1.5upx;
	}
	.lfoot{
		width: 100%;
		width: 100%;
		padding-top: 20upx;
		color: #888;
		font-size: 28upx;
		display: flex;
		flex-direction: column;
		border-top: 1upx solid #dedede;
		view{
			width: 100%;
			overflow: hidden;
			text-overflow:ellipsis; 
			white-space: nowrap;
			margin: 5upx 0;
		}
	}
	.nomore{
		position: absolute;
		bottom: 0upx;
		left: 50%;
		transform: translateX(-50%);
		color: #999;
		margin-top: 10upx;
		font-size: 28upx;
	}
	.setstyle{
		display: flex;
		flex-direction: column;
	}
</style>
