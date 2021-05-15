<template>
	<view class="whole">
		<text class="iconfont icon-zanwushuju nodata"></text>
		<text class="noText">暂无数据</text>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.whole{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// background-color: red;
		// background-color: $self-body-bgColor;
		color: #dddddd;
		.nodata{
			font-size: 80upx;
		}
		.noText{
			font-size: 32upx;
		}
	}
	
</style>
