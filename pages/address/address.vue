<template>
	<view class="whole">
		<view class="bgWhile setbuttom">
			<view class="header row">
				<view class="sjadd" :class="currTab==0?'tabAct':''" @click="changTab(0)">
					所有地址
				</view>
				<view class="jjadd" :class="currTab==1?'tabAct':''" @click="changTab(1)">
					寄件地址
				</view>
				<view class="sjadd" :class="currTab==2?'tabAct':''" @click="changTab(2)">
					收件地址
				</view>
			</view>
		</view>
		<view class="nodataBox" v-if="!hasData">
			<Nodata></Nodata>
		</view>
		<view class="ullist" v-if="hasData">
			
			<view class="ulitem row bgWhile flex_col" v-for="(it,ix) in addressData" :key="it"  @click="checkAddress(it)">
				<view class="leftinfo">
					<view class="ltop flex_col">
						<view>
							<text>{{it.ma_receiver}}</text>
							<text class="photoTxt">{{it.ma_Mobile}}</text>
						</view>
						<!-- <view class="defaults">默认</view> -->
					</view>
					<view class="lcenter">
						<text>{{it.zoneName}}</text>
					</view>
					<view class="lfoot">
						{{it.ma_address}}
					</view>	
				</view>
				<view class="editBox iconfont icon-bianjimian" @click.stop="editAddress('edit',it.ZoneID,ix)"></view>
				<view class="delBox iconfont icon-shanchu" @click.stop="delAddress(it.ma_id)"></view>
			</view>
		</view>
		<view class="address" @click="editAddress('add')">添加地址</view>
		
		<view class="delPop" v-if="delPop">
			<view class="delcenter animated bounceIn">
				<view class="top">
					确定删除该地址？
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
			}
		},
		mounted(){
			
		},
		onShow(){
			this.getAddress();
		},
		onLoad(pram){
			// console.log("看看pram",pram);
			this.pram = pram;
		},
		methods:{
			checkAddress(obj){
				//  选择地址
				let dat = {
					type:this.pram,
					obj:obj
				};
				this.pram.ix==1?this.$tool.setstorage("pram",JSON.stringify(dat)):this.$tool.setstorage("pram2",JSON.stringify(dat));
				this.$tool.jump_back();
			},
			showhide(type){
				//  显示删除弹窗
			 this.delPop = !this.delPop;
			 if(type==2){
				 let dat = {
					 functionType:17,
					 weixinID:this.$tool.getstorage("openid"),
					 ma_id:this.delId
				 }
				 this.$api(dat).then(res=>{
					 if(res.data.MsgID==1){
						 this.$tool.showTip("删除成功！");
						 this.getAddress();
					 }else{
						 this.$tool.showTip(res.data.Msg);
					 }
				 })
			 }
			},
			changTab(tab){
				// 切换选项卡
				if(this.currTab ==  tab){
					return
				}
				this.currTab = tab;
				this.getAddress();
			},
			getAddress(){
				// 获取地址数据
				let dat = {
					functionType:16,
					weixinID:this.$tool.getstorage("openid"),
					m_type:this.currTab
				}
				this.$api(dat).then(res=>{
					if(res.data.MsgID==1){
						let arr = JSON.parse(res.data.Msg).ds; 
						this.addressData = arr;
						arr.length>0?this.hasData = true : this.hasData = false;
						// console.log("看看地址数据",arr);
					}else{
						this.$tool.showTip(res.data.Msg);
					}
				})
			},
			editAddress(type,addID='0',ix=0){
				// 编辑地址
				this.$tool.setstorage("address",JSON.stringify(this.addressData[ix]));
				this.$tool.jump_nav(`/pages/editaddress/editaddress?type=${type}&jj_type=${this.currTab==0?1:this.currTab}&addID=${addID}`);
			},
			delAddress(adId){
				// 删除地址
				// console.log("删除地址",adId)
				this.delId = adId;
				this.showhide(1,adId);
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
		height: 100vh;
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
	}
	.ullist{
		margin-top: 10upx;
		display: flex;
		flex-direction: column;
		.ulitem:not(:last-child){
			border-bottom: 1upx solid #dedede;
		}
		.ulitem{
			width: 100%;
			height: 200upx;
			// display: flex;
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
		.photoTxt{
			margin-left: 16upx;
		}
		.defaults{
			width: 85upx;
			height: 32upx;
			border-radius: 18upx;
			background-color: #FA9231;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28upx;
			color: #fff;
		}
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
		flex: 1;
		width:100vw;
		// background-color: red;
	}
	.address{
		width: 620upx;
		height: 65upx;
		background-color: $all-font-Tcolor;
		border-radius: 40upx;
		position: fixed;
		bottom: 50upx;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		text-align: center;
		font-size: 30upx;
		line-height: 65upx;
		z-index: 9;
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
	
</style>
