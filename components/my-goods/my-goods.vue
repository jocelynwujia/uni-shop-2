<template>
	<view>
		<view class="goods-item">
		  <!-- 商品左侧图片区域 -->
		  <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"></radio>
		    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		  </view>
		  <!-- 商品右侧信息区域 -->
		  <view class="goods-item-right">
		    <!-- 商品标题 -->
		    <view class="goods-name">{{goods.goods_name}}</view>
		    <view class="goods-info-box">
		      <!-- 商品价格 -->
		      <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
          <!-- 商品数量，数字输入框 -->
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
     // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
          },
    // 是否展示图片左侧的radio,默认不展示
      showRadio:{
        type: Boolean,
        default: false
      } ,
      // 是否显示NumberBox的状态
      showNum:{
        type: Boolean,
        default: false
      }
    },
        // 处理价格过滤器
    filters:{
      tofixed(num){
      return Number(num).toFixed(2)
      }
    },
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
    methods:{
      // radio的点击处理函数
      radioChangeHandler(){
        // 通过$emit触发外界绑定的radio-change事件
        //把商品的id和商品的最新勾选状态传递给事件处理函数
        this.$emit('radio-change',{
          // 商品的id
          goods_id: this.goods.goods_id,
          // 商品的最新勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      // 商品数量变化的处理函数
      numChangeHandler(val){
        // 通过$emit触发外界绑定的事件
        this.$emit('num-change',{
          //商品的id
          goods_id: this.goods.goods_id,
          // 商品的最新数量，隐式转换成数据类型
          goods_count: +val
        })
      }
    }
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  width: 750rpx;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;

  .goods-item-left {
    display: flex;
    margin-right: 5px;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
.goods-info-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
