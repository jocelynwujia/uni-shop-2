<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
      <!-- 使用uni-ui图标组件 -->
		  <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
    props:{
      bgcolor:{
        type: String,
        default:'#C00000'
      },
      radius:{
        type: Number,
        default: 18
      }
    },
		data() {
			return {
			};
		},
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  height: 50px;
  // background-color: #C00000;
  padding: 0 10px;
  .my-search-box {
    width: 100%;
    height: 36px;
    background-color: #fff;
    text-align: center;
    line-height: 36px;
    // border-radius:18px;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
