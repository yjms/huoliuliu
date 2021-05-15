<template>
	<view class="whole2">
		<view class="setbg row">
			<scroll-view class="ydList" scroll-y="true">
				<view class="bgWhile row1 yditem">
					<view class="ydHeader">
						<text>{{lookType==1?"订单明细":"订单明细"}}</text>
					</view>
					<view class="timebox" v-for="it in kcData" :key="it">
						 <text class="setwid">{{it.name}}: </text>
						 <text class="setpad">{{relObj[it.type]}}</text>
					</view>
					<!-- <view class="timebox">
						 <text class="setwid">派送费: </text>
						 <text class="setpad">{{it.paisongfei_sum}}</text>
					</view>
					<view class="timebox">
						 <text class="setwid">费用: </text>
						 <text class="setpad">{{it.heji_sum}}</text>
					</view>
					<view class="timebox">
						 <text class="setwid">件数: </text>
						 <text class="setpad">{{it.jianshu_sum}}</text>
					</view>
					<view class="timebox">
						 <text class="setwid">重量: </text>
						 <text class="setpad">{{it.zhongliang_sum}}</text>
					</view>
					<view class="timebox">
						 <text class="setwid">体积: </text>
						 <text class="setpad">{{it.tiji_sum}}</text>
					</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kcData:[
					{
						name:'运费',
						type:'yunfei_sum',
					},
					{
						name:'派送费',
						type:'paisongfei_sum',
					},
					{
						name:'费用',
						type:'heji_sum',
					},
					{
						name:'件数',
						type:'jianshu_sum',
					},
					{
						name:'重量',
						type:'zhongliang_sum',
					},
					{
						name:'体积',
						type:'tiji_sum'
					}
				],// 库存数据
				lookType:1,// 查看类型
				relObj:null,// 数据对象
			}
		},
		onLoad(qurey){
			// console.log("看看参数",qurey);
			if(qurey.order || qurey.order == 0){
				this.getmingxi(qurey.order);
				this.lookType = 1;
			}else{
				this.getkucun();
				this.lookType = 2;
			}
		},
		onShow(){
		},
		methods: {
			previewImage(){
				//预览轮播图
				    let imageList = ["https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=966038593,805734814&fm=26&gp=0.jpg"];
						//uniapp预览轮播图
						uni.previewImage({
							current:0, //预览图片的下标
							urls:imageList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
						})
			},
			getmingxi(order){
				let arr = [
					{
						name:"订单号",
						type:"daidan_no",
					},
					{
						name:"品名",
						type:"daidan_pingming"
					},
					{
						name:"收货地址",
						type:"daidan_shouhuorenAddress"
					},
					{
						name:"收货人姓名",
						type:"daidan_shouhuorenXingming"
					},
					{
						name:"件数",
						type:"daidan_jianshu"
					},
					{
						name:"代收款",
						type:"daidan_daishoukuan"
					},
					{
						name:"开单日期",
						type:"daidan_kaidanriqi"
					},
					{
						name:"送货方式",
						type:"daidan_tihuofangshi"
					},
					{
						name:"付款方式",
						type:"daidan_fukuanfangshi"
					},
					{
						name:"保险价值",
						type:"daidan_baoxianjiazhi"
					},
					{
						name:"派送费",
						type:"daidan_paisongfeiyong"
					},
					{
						name:"计费重量",
						type:"daidan_jifeizhongliang"
					},
					{
						name:"计费体积",
						type:"daidan_jifeitiji"
					},
					{
						name:"是否出发",
						type:"fache"
					},
					{
						name:"要求时效",
						type:"daidan_kehushixiao"
					},
					{
						name:"合计金额",
						type:"daidan_hejijine"
					}
				]
				this.kcData = arr;
				let dat = {
					functionType:7,
					orderNO:order
				}
				this.$api(dat).then(rel=>{
					console.log("看看明细",rel);
					if(rel.data.MsgID==1){
						this.relObj = JSON.parse(rel.data.Msg).ds[0];
					}
				})
			},
			getkucun(){
				// 获取库存
				let dat = {
					functionType:10,
					xieyiKehuID:this.$tool.getstorage("xykh_id"),
					begindate:'',
					enddate:'',
					city_shifazhan:'',
					city_mudizhan:'',
					shouhuoren:'',
					orderNO:''
				}
				this.$api(dat).then(res=>{
					// console.log("看看库存数据");
					if(res.data.MsgID == 1){
						this.relObj = JSON.parse(res.data.Msg).ds[0];
						 console.log("看看库存数据",this.relObj)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// // 公共样式
	// .setOver{
	// 	overflow: hidden;
	// 	text-overflow:ellipsis; 
	// 	white-space: nowrap;
	// }
	// .bgWhile{
	// 	background-color: #FFFFFF;
	// }
	// .row{
	// 	width: 100%;
	// 	padding: 0 28upx;
	// 	box-sizing: border-box;
	// }
	// .row1{
	// 	width: calc(100vw - 56upx);
	// 	margin: 0 auto;
	// }
	// .flex_row{ // 横向居中 flex
	// 	display: flex;
	// 	justify-content: center;
	// 	box-sizing: border-box;
	// }
	// .flex_col{// 纵向居中flex
	// 	display: flex;
	// 	align-items: center;
	// 	box-sizing: border-box;
	// }
	// .flex_center{
	// 	justify-content: center;
	// 	align-items: center;
	// 	display: flex;
	// 	box-sizing: border-box;
	// }
	// .whole2{
	// 	width: 100vw;
	// 	min-height:100vh;
	// 	letter-spacing: 1upx;
	// 	background-color: $self-body-bgColor;
	// }
	// .ulbox{
	// 	padding-top: 18upx;
	// }
	// .itemBox{
	// 	border-radius: 8upx;
	// 	padding: 16upx;
	// 	box-sizing: border-box;
	// 	font-size: 30upx;
	// 	color: #666;
	// 	margin-bottom: 10upx;
	// }
	// .orederTop{
	// 	justify-content: space-between;
	// 	padding-bottom: 20upx;
	// 	border-bottom: 1upx solid #dedede;
	// }
	// .orderCenter>.delRow{
	// 	width: 100%;
	// 	text{
	// 		width: 50%;
	// 		line-height: 60upx;
	// 	}
	// }
	// .address>text.addtxt{
	// 	width: 100%;
	// 	line-height: 40upx;
	// }
	// .gName{
	// 	width: 180upx;
	// }
	
	// .orderFoot{
	// 	width: 100%;
	// 	border-top: 1upx solid #dedede;
	// 	margin-top: 20upx;
	// 	font-size: 30upx;
	// 	justify-content: flex-end;
	// 	view{
	// 		width: 180upx;
	// 		height: 60upx;
	// 		background-color: $all-font-Tcolor;
	// 		color: #FFFFFF;
	// 		border-radius: 35upx;
	// 		margin:20upx 10upx;
	// 	}
	// 	.imgBtn{
	// 		background-color:#fff;
	// 		color: $all-font-Hcolor;
	// 		border: 1upx solid;
			
	// 	}
	// }
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
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
	}
	.header{
		width: $all-width;
		display: flex;
		position: fixed;
		left: 50%;
		top: 20upx;
		transform: translateX(-50%);
		align-items: center;
		box-sizing: border-box;
		
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
	.kjList>.nodata{
		font-size: 80upx;
		color: #ddd;
	}
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
	.setbg{
		background-color: $self-body-bgColor;
		flex: 1;
	}
	.ydList{
		width: 100%;
		height:100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 18upx;
		box-sizing: border-box;
	}
	.yditem{
		width: 100%;
		padding: 24upx 0 18upx 24upx;
		box-sizing: border-box;
		margin-bottom: 18upx;
		font-size: 28upx;
		.icon-fuzhicopy12{
			font-size: 34upx;
			padding-left: 6upx;
			color: #888;
		}
	}
	.yditem>.ydHeader{
		display: flex;
		font-size: 36upx;
		font-weight: bold;
	}
	.arive{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 20upx;
		box-sizing: border-box;
		margin:18upx 0;
	}
	.arive>view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.arrcenter>image{
		width: 120upx;
		height: 20upx;
		object-fit: cover;
	}
	.setmar{
		margin-top: 10upx;
		font-weight: bold;
	}
	.towRow{
		color: #888;
		margin-top: 10upx;
	}
	.cityName{
		color: #000;
		font-size: 36upx;
	}
	.statusBox{
		width: 100%;
		display: flex;
		color: #777;
		.rigTxt{
			flex: 1;
			text-align: justify;
			padding: 0 18upx;
			box-sizing: border-box;
		}
	}
	.shink{
		flex-shrink: 0;
	}
	.timebox{
		display: flex;
		color: #777;
		margin: 18upx 0;
		border-bottom: 1upx solid #dedede;
		padding-bottom: 18upx;
	}
	.ydFoot{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.share,.del{
			width: 160upx;
			height: 60upx;
			border: 1upx solid #dedede;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #666;
			border-radius: 35upx;
			margin-right: 18upx;
		}
		.del{
			margin-right: 26upx;
		}
	}
	.setwid{
		width: 120upx;
	}
	.setpad{
		padding: 0 18upx;
	}
</style>
