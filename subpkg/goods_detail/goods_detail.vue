<template>
	<view class="goods_detail-container">
    <!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
		  <swiper-item v-for="(item, i) in goods_info.pics" :key="i" class="swiper-item">
		    <image :src="item.pics_big" @click="preview(i)"></image>
		  </swiper-item>
		</swiper>
    <!-- /轮播图区域 -->
    <!-- 商品信息区域 -->
    <!-- 确保在拿到数据后再进行渲染页面，避免页面商品、价格出现闪烁的情况，用v-if判断 -->
    <view class="goods-info-box" v-if="goods_info.goods_name">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce" class="rich-text"></rich-text>
    <!-- /商品详情信息 -->
    <!-- 商品导航 -->
    <!-- fill 控制右侧按钮的样式 -->
    <!-- options左侧按钮的配置项 -->
    <!-- buttonGroup右侧按钮的配置项 -->
    <!-- click左侧按钮的点击事件处理函数 -->
    <!-- bottonClick右侧按钮的点击处理函数 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick"/>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 商品详情数据
        goods_info:{},
        options: [{
                    icon: 'headphones',
                    text: '客服'
                }, {
                    icon: 'shop',
                    text: '店铺',
                    info: 2,
                    infoBackgroundColor:'#007aff',
                    infoColor:"red"
                }, {
                    icon: 'cart',
                    text: '购物车',
                    info: 2
                }],
                buttonGroup: [{
                  text: '加入购物车',
                  backgroundColor: '#ff0000',
                  color: '#fff'
                },
                {
                  text: '立即购买',
                  backgroundColor: '#ffa200',
                  color: '#fff'
                }
                ]
			};
		},
    onLoad(options) {
      console.log(options,'hello')
      // 获取商品的id
      const goods_id = options.goods_id
      // 调用请求商品详情的方法
      this.getGoodsDetail(goods_id)
    },
    methods:{
      // 获取商品详情
      async getGoodsDetail(goods_id){
        const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
        console.log(res,'商品详情')
        if(res.meta.status !== 200) return uni.$showMsg()
        // 使用字符串的replace方法:将img标签,添加style的行内样式,从而解决底部的空白间隙的问题
        //使用字符串的replace方法：解决webp格式的文件，在iso系统上无法显示的问题
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g,'jpg')
        this.goods_info = res.message
      },
      // 点击图片,图片预览
      preview(i){
        uni.previewImage({
          // 预览时,默认显示图片的索引
          current: i,
          // 所有图片的url地址
          //map 遍历数组，返回值是新数组，不影响原数组
          urls: this.goods_info.pics.map(x => x.pics_big) 
        })
      },
      // 商品导航处理函数
      onClick (e) {
        console.log(e,'world')
        if(e.content.text === '购物车') {
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      buttonClick (e) {
        console.log(e,'hello')
          this.options[2].info++
      }
    }
	}
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods_detail-container {
  padding-bottom: 50px;
}
.goods-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
