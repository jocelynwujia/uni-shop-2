<template>
	<view class="settle-container">
    <!-- 全选 -->
      <label class="radio" @click="changeAllState">
        <radio color="#C00000" :checked="isFullChecked"/><text>全选</text>
      </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{checkedGoodsAmout}}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmout']),
      // 2.是否全选
      isFullChecked(){
        return this.total === this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllState(){
        // console.log(!this.isFullChecked)
        // 更新选择状态
        this.updateAllGoodsState(!this.isFullChecked)
      }
    }
	}
</script>

<style lang="scss">
.settle-container{
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: white;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount-box {
    .amount {
      color: #C00000;
      font-weight: 700;
    }
  }
  .btn-settle {
    background-color: #C00000;
    height: 50px;
    line-height: 50px;
    color: #fff;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
