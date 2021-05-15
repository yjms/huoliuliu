<template>
	<view class="whole" ref="pp">
		<view class="header">
			<view class="iptBox">
				<text class="seachIcon iconfont icon-chaxun"></text>
				<input type="text" placeholder="请输入订单号" v-model="keyword"   @focus="search(1)" @blur="search(2)"/>
			</view>
			<view class="searchTxt" v-show="searchStatus" @click="search(3)">
				查询
			</view>
			<view class="saoma iconfont icon-saoma" v-show="!searchStatus" @click="scancode" >
				<!-- 扫码 -->
			</view>
		</view>
		<!-- <view class="navBox">
		</view> -->
		<view class="navTime">
		<!-- 	<view class="timeItem" :class="timeTab==1?'active':''" @click="changeTab(1,'time')">
				今天
			</view> -->
			<view class="timeItem" :class="timeTab==2?'active':''" @click="changeTab(2,'time',array[0])">
				{{pageType == 5 ? array[0]:'近七天'}} 
			</view>
			<view class="timeItem" :class="timeTab==3?'active':''" @click="changeTab(3,'time',array[1])">
				{{pageType == 5 ? array[1]:'近一个月'}} 
			</view>
			<view class="timeItem" :class="timeTab==1?'active':''" @click="changeTab(1,'time',array[2])">
				{{pageType == 5 ? array[2]:'近俩个月'}} 
			</view>
			<view class="timeItem" :class="timeTab==4?'active':''" @click="changeTab(4,'time')">
				 <picker @change="bindPickerChange" :value="index" :range="array" v-if="pageType==5">
					<view class="uni-input">自定义</view>
				</picker>
				<text v-if="pageType != 5">自定义</text>
			</view>
		</view>
		<view class="kjList" v-if="!hasData">
			<text class="iconfont icon-zanwushuju nodata"></text>
			<text class="noText">暂无数据</text>
		</view>
		<view class="setbg row ydList" v-if="hasData">
			<!-- <scroll-view class="ydList" scroll-y="true"  lower-threshold="30" @scrolltolower="scrollLower"> -->
				<view class="setposi">
					<view class="bgWhile row1 yditem" v-for="(it,index) in orderData" :key="it.Row" @click="lookDel(it.daidan_no)">
						<view class="ydHeader" @click.stop="copeText(it.daidan_no)">
							<text>订单号: {{it.daidan_no}} </text>
							<text class="iconfont icon-fuzhicopy12"></text>
						</view>
						<view class="arive">
							<view class="arrLeft">
								<text class="cityName">{{it.shifazhan}}</text>
								<text class="towRow">{{it.daidan_fahuorenxingming}}</text>
							</view>
							<view class="arrcenter">
								<image src="../../static/image/dancheng.png"></image>
								<text class="setmar">{{it.fache}}</text>
							</view>
							<view class="arrRight">
								<text class="cityName">{{it.mudizhan}}</text>
								<text class="towRow">{{it.daidan_shouhuorenXingming}}</text>
							</view>
						</view>
						<view class="statusBox" v-if="pageType == 5">
							<text class="shink setwid">运费: </text>
							<view class="shink rigTxt">{{it.daidan_hejijine}}</view>
						</view>
						<view class="statusBox">
							<text class="shink setwid">{{it.qianshou}}: </text>
							<view class="shink rigTxt">{{it.qianshouxinxi==""?"快件运输中，请耐心等待~":it.qianshouxinxi}}</view>
						</view>
						<view class="timebox">
							 <text class="setwid">开单日期: </text>
							 <text class="setpad">{{it.daidan_kaidanriqi}}</text>
						</view>
						<view class="ydFoot" @click.stop style="padding-top: 10upx;">
							<view class="share" @click="lookmingxi(it.daidan_no)">
								查看明细
							</view>
							<view class="del" @click="electronicOrder(it.daidan_no)">
								电子订单
							</view>
						</view>
					</view>
				<text class="nomore" v-if="moreData">~没有更多数据啦~</text>
				</view>
				
			<!-- </scroll-view> -->
		</view>
		<uni-calendar ref="calendar" :clear-date="true" :date="info.date" :insert="info.insert" :lunar="info.lunar" :startDate="info.startDate" :endDate="info.endDate" :range="info.range" @confirm="confirm" @close="close" />
		<!-- 关注公众号的盒子 -->
		<view class="gzhBox" @click="showHidePop">
			<view class="hzBox">
				查看汇总
				<!-- <text class="iconfont icon-guanbi close"></text> -->
			</view>
		</view>
		<!-- 汇总弹窗 -->
		<view class="allScree" v-if="popStatus">
			<view class="allBox animated bounceIn">
				<text class="iconfont icon-guanbi close" @click="showHidePop"></text>
				<text class="title">{{pageType == 3?'库存':'订单'}}汇总</text>
				<view class="rowTxt" v-for="it in popData" :key="it">
					{{it.name}} : {{popObj[it.type] || ""}}
				</view>
			</view>
		</view>
		<!-- 显示查询条件-->
		<view class="selectBox" v-show="zdySelectPop" @click="()=>{this.zdySelectPop = false}">
			<view class="topBox" @click.stop>
				<view class="rowBox">
					<text>单号:</text>
					<input type="text" placeholder="单号" v-model="keyword"/>
				</view>
				<view class="rowBox">
					<text>开始时间:</text>
					<!-- <input type="text" placeholder="开始时间"/> -->
					<view>
						<picker mode="date" :value="startTime" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{startTime?startTime:'选择开始时间'}}</view>
						</picker>
					</view>
				</view>
				<view class="rowBox">
					<text>截止时间:</text>
					<view>
						<picker mode="date" :value="endTime" :start="startDate" :end="endDate" @change="bindDateChange2">
							<view class="uni-input">{{endTime?endTime:'选择结束时间'}}</view>
						</picker>
					</view>
				</view>
				<view class="rowBox">
					<text>始发站:</text>
					<input type="text" placeholder="始发站" v-model="startAddress"/>
				</view>
				<view class="rowBox">
					<text>目的站:</text>
					<input type="text" placeholder="目的站" v-model="endAddress"/>
				</view>
				<view class="rowBox">
					<text>收货人:</text>
					<input type="text" placeholder="收货人" v-model="acceptMan"/>
				</view>
				<view class="selBtn" @click="selectData">
					查询
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	function getDate(date, AddDayCount = 0) {
		if (!date) {
			date = new Date()
		}
		if (typeof date !== 'object') {
			date = date.replace(/-/g, '/')
		}
		const dd = new Date(date)
	
		dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
	
		const y = dd.getFullYear()
		const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
		const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
		return {
			fullDate: y + '-' + m + '-' + d,
			year: y,
			month: m,
			date: d,
			day: dd.getDay()
		}
	}
	export default {
		data() {
			// const currentDate = this.getDate({
			// 	format: true
			// })
			return {
				currTab:0,//默认显示今天的单号
				timeTab:0,// 默认选择今天查询 
				searchStatus:false, // 是否是搜索状态
				keyword:"",// 搜索关键字
				hasData:true,// 默认没数据
				pageType:null,// 看看页面类型
				array: ['1月', '3月', '4月', '5月'], // picker 组件数据
				orderData:[],// 订单数据
				currIndex:1,// 默认查询第一页的数据
				needReff:true,// 是否可以加载更多
				showCalendar: false,
				startTime:'', //
				zdySelectPop:false,// 默认隐藏自定义查询弹窗
				startAddress:'',// 始发站
				endAddress:'',// 目的站
				acceptMan:'',// 收货人
				endTime:'',
				moreData:false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				popStatus:false,// 默认不显示弹窗
				popData:[
					{
						name:"总运费",
						type:"yunfei_sum",
					},{
						name:"总派送费",
						type:"paisongfei_sum"
					},{
						name:"总件数",
						type:"jianshu_sum"
					},{
						name:"总重量",
						type:"zhongliang_sum"
					},{
						name:"总体积",
						type:"tiji_sum"
					},{
						name:"总费用",
						type:"heji_sum"
					}
				],
				popObj:{},// 弹窗对象
				mouths:'',// 月份
			}
		},
		onShow(){
			if(this.pageType != this.$tool.getstorage("pageType")){
					this.pageType =  this.$tool.getstorage("pageType");
					this.showCalendar = true;
					this.dealfun();
					// console.log("pageType",this.pageType);
			}
		},
		onLoad(option) {
			this.getmonth();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onReachBottom(){//uniapp 监听下拉加载生命周期
			if(this.needReff){
				this.currIndex =  ++this.currIndex;
				this.delivery();
			} 
		},
		methods: {
			selectData(){
				//  点击自定义查询按钮
				this.orderData = [];
				this.delivery();
				this.keyword = "";
				this.zdySelectPop = false;
			},
			getDate(type) { // 日期转换
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindPickerChange: function(e) {
				this.mouths = this.array[e.target.value];
				this.orderData = [];
				this.currIndex = 1;
				this.delivery();
			},
			bindDateChange(e){
			   // 时间选择器
			   this.startTime = e.target.value
			 },
			 bindDateChange2(e){
				 this.endTime = e.target.value
			 },
			getmonth(){
					// 获取最近12个月
					var dataArr = [];
				　　var data = new Date();
				　　var year = data.getFullYear();
				　　data.setMonth(data.getMonth()+1, 1)           //获取到当前月份,设置月份
				　　for (var i = 0; i < 12; i++) {
				　　　　data.setMonth(data.getMonth() - 1);     //每次循环一次 月份值减1
				　　　　var m = data.getMonth() + 1;
				　　　　m = m < 10 ? "0" + m : m;
				　　　　dataArr.push(data.getFullYear() + "-" + (m));
				    }
					 this.array = dataArr;
					 this.mouths = dataArr[0];
			},
			showHidePop(){
				// 显示隐藏弹窗
				this.popStatus = !this.popStatus;
			},
			getallDel(){
				// 查询汇总明细  // 5 账单 3库存  4 发货明细
				let funType = 10;
				if(this.pageType != 3){
					funType = 5;
				}
				
				let dat = {
					functionType:funType,
					xieyiKehuID:this.$tool.getstorage("xykh_id"),
					begindate:this.startTime,
					enddate:this.endTime,
					city_shifazhan:this.startAddress,
					city_mudizhan:this.endAddress,
					shouhuoren:this.acceptMan,
					orderNO:this.keyword
				}
				if(this.pageType == 5){
					delete dat.begindate;
					delete dat.enddate;
					dat.functionType = 23;
					dat.yuefen = this.mouths;
				}
				this.$api(dat).then(res=>{
					 console.log("看看汇总明细",res);
					 if(res.data.MsgID == 1){
						 this.popObj = JSON.parse(res.data.Msg).ds[0];
					 }else{
						 this.$tool.showTip(res.data.Msg)
					 }
				})
			},
			lookmingxi(order){ //  查看明细
				this.$tool.jump_nav(`/pages/orderlist/orderlist?order=${order}`)
			},
			electronicOrder(orderNO){
				this.previewImage(orderNO);
			},
			previewImage(orderNO){
				//预览轮播图
				    let imageList = [`http://www.hyk56.net:8114/mobile_xiaochengxu.aspx?functionType=9&orderNO=${orderNO}`];
						//uniapp预览轮播图
						uni.previewImage({
							current:0, //预览图片的下标
							urls:imageList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
						})
			},
			copeText(val){ // 复制单号
				// console.log("复制")
				uni.setClipboardData({data:val})
			},
			changeTab(tab,type,mouths=""){ // 改变时间
				if(tab==this.timeTab){ 
					this.dealfun();
					this.timeTab = 0;
					return
				}else{
					this.timeTab = tab;
				}
				if(this.pageType == 5 && tab != 4){
					this.mouths = mouths;
					this.dealfun();
					return;
				}
				if(tab == 4 && this.pageType != 5){
					// 自定义
					this.zdySelectPop = true;
					return
				}
				if(type == "time"){
					let arr = [60,7,30];
					let obj = this.getDelTime(arr[tab-1]);
					this.dealfun(obj.LDate,obj.nowDate)
				}
			},
			dealfun(startTime="",endtime=""){ // 处理函数
				console.log("进来了么")
				this.currIndex = 1;
				this.orderData = [];
				this.needReff = true;
				this.hasData = false;
				this.startTime = startTime;
				this.endTime = endtime;
				this.delivery();
				this.getallDel();
			},
			search(type){
				type == 1 ? this.searchStatus = true : this.searchStatus = false;
				if(type ==  3 || type ==  2){
					this.timeTab = 0;
					this.dealfun();
				}
			},
			getOrder(){// 获取订单数据
				// console.log(333)
			    let dat = {
					functionType:9,
					orderNO:this.keyword
				}
				this.$api(dat).then(res=>{
					console.log("订单数据",res);
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
			getDelTime(type,currTime = new Date()){
				//type 天数   currTime 丛哪天开始算 默认当天
				// 获取几天的前的时间
				let date = new Date(currTime);
				console.log("date",date)
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				let nowDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
				let lastDate = new Date(date - 1000 * 60 * 60 * 24 * type);//最后30天可以更改，意义：是获取多少天前的时间
				let lastY = lastDate.getFullYear();
				let lastM = lastDate.getMonth()+1;
				let lastD = lastDate.getDate();
				let LDate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-"+ (lastD < 10 ? "0" + lastD : lastD);//得到30天前的时间
				return {nowDate,LDate}
			},
			delivery(){ //发货明细  // 5 账单 3库存  4 发货明细
				this.pageType =  this.$tool.getstorage("pageType");
				let funType = '';
			    if(this.pageType == 3){
					funType = 11;
				}else if(this.pageType == 4){
					funType = 6;
				}else{
					funType = 24;
				}
				let dat = {
					functionType:funType,
					orderNO:this.keyword,
					xieyiKehuID:this.$tool.getstorage("xykh_id"),
					begindate:this.startTime,
					enddate:this.endTime,
					city_shifazhan:this.startAddress,
					city_mudizhan:this.endAddress,
					shouhuoren:this.acceptMan,
					pageSize:10,
					pageIndex:this.currIndex
				}
				if(this.pageType == 5){
					delete dat.begindate;
					delete dat.enddate;
					dat.yuefen = this.mouths;
				}
				this.$api(dat).then((res)=>{
					console.log("看看发货明细",res)
					if(res.data.MsgID == 0){
						this.$tool.showTip(res.data.Msg);
						let rel = res.Msg
					}else{
						if(Object.prototype.toString.call(JSON.parse(res.data.Msg).ds) == '[object Object]'){
							console.log("laizhe")
							this.moreData = true;
							this.needReff = false;
							return 
						}
						this.orderData = [...this.orderData,...(JSON.parse(res.data.Msg).ds)];
						this.orderData.length == 0 ? this.hasData = false : this.hasData = true; 
						JSON.parse(res.data.Msg).ds.length == 10 ? this.needReff = true : this.needReff = false;
						JSON.parse(res.data.Msg).ds.length != 10 ? this.moreData = true : "";
					}
				},(err)=>{
					console.log("看看呗")
				}).catch((err)=>{
					console.log(656)
				})
			},
			lookDel(num){// 去详情
				this.$tool.jump_nav(`/pages/logisticsinfo/logisticsinfo?num=${num}`)
			},
			open() {
				this.$refs.calendar.open()
			},
			close() {
				console.log('弹窗关闭');
			},
			change(e) {
				console.log('change 返回:', e)
				// 模拟动态打卡
				if (this.info.selected.length > 5) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				})
			},
			confirm(e) {
				if(!e.range.after){
					this.startTime = this.getDelTime(1,e.range.before).LDate;
					this.endTime = e.range.before;
				}
				if(e.range.after=="" && e.range.before==""){
					this.startTime = this.getDelTime(1).LDate;
					this.endTime = this.getDelTime(1).nowDate;
				} 
				if(e.range.after && e.range.before){
					this.startTime = e.range.before;
					this.endTime = e.range.after;
				}
				this.compareTime(this.startTime,this.endTime);
				this.dealfun(this.startTime,this.endTime);
			},
			compareTime(start,end){
				let startTime = new Date(start);
				let endTime = new Date(end);
				console.log("5656",start,end);
				if(startTime > endTime){
					this.startTime = end;
					this.endTime = start;
				}else{
					this.startTime = start;
					this.endTime = end;
				}
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			}
		}
	}
</script>

<style lang="scss">
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
		background-color: $self-body-bgColor;
		// justify-content: center;
	}
	.header{
		width: $all-width;
		display: flex;
		position: fixed;
		left: 50%;
		top: 0upx;
		z-index: 9;
		padding: 20upx 0;
		display: flex;
		justify-content: center;
		width: 100%;
		transform: translateX(-50%);
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
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
		position: fixed;
		left: 0;
		top: 0;
		background-color: #FFFFFF;
		z-index: 9;
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
		position: fixed;
		left: 0;
		top: 110upx;
		z-index: 9;
		background-color: #fff;
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
		// width: 100%;
		padding-top: 240upx;
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
		margin: 0;
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
	.setposi{
		position: relative;
		padding-bottom: 20upx;
	}
	.nomore{
		position: absolute;
		// bottom: -10upx;
		width: 100vw;
		text-align: center;
		background-color: $self-body-bgColor;
		left: 50%;
		transform: translateX(-50%);
		color: #999;
		margin-top: 10upx;
		font-size: 28upx;
	}
	.arrLeft>text,.arrRight>text{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 150upx;
		text-align: center;
	}
	.gzhBox{
		width: 150upx;
		height: 60upx;
		// background-color: red;
		position: fixed;
		right: 0;
		bottom: 100upx;
		overflow: hidden;
		// border-radius: ;
	}
	.hzBox{
		width: 200upx;
		height: 60upx;
		border-radius: 40upx;
		background-color: $all-font-Tcolor;
		// background-color: ;
		background-image: linear-gradient(to right,#5393FD,#FA7240);
		color: #fff;
		font-size: 26upx;
		display: flex;
		line-height: 60upx;
		// align-items: center;
		padding-left: 26upx;
		box-sizing: border-box;
	}
	.allScree{
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.3);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.allBox{
		width: 650upx;
		// height: 800upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 18upx 20upx;
		box-sizing: border-box;
		position: relative;
		.title{
			font-size: 32upx;
			font-weight: bold;
		}
		.rowTxt{
			margin: 20upx 0;
			font-size: 28upxx;
			color: #666;
			letter-spacing: 1.5upx;
		}
		.close{
			font-size: 68upx;
			color: #000 !important;
			position: absolute;
			right: 10upx;
			top: 10upx;
			// padding: 10px;
			// border: 10px solid;
		}
	}
	.selectBox{
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.3);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		.topBox{
			width: 100%;
			// height: 500upx;
			padding-bottom: 30upx;
			padding-top: 30upx;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}
		.rowBox{
			width: 90%;
			height: 70upx;
		    margin: 0 auto;
			// margin: 15upx 0;
			// background-color: rgba(0,0,0,.3);
			display: flex;
			align-items: center;
			margin-bottom: 20upx;
			text{
				color: #666;
				font-size: 28upx;
				width: 120upx;
				text-align: right;
			}
			input,>view{
				flex: 1;
				height: 60upx;
				font-size: 28upx;
				padding-left: 20upx;
				box-sizing: border-box;
				margin-left: 20upx;
				border-radius: 15upx;
				border: .5upx solid #dedede;
			}
			
		}
	}
	.selBtn{
		width: 60%;
		margin: 0 auto;
		height: 70upx;
		background-color: $all-font-Tcolor;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		border-radius: 10upx;
		margin-top: 40upx;
	}
	.uni-input{
		width: 100%;
		height: 60upx;
		display: flex;
		align-items: center;
		// justify-content: center;
	}
</style>
