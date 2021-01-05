<template>
	<view>
		<!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- /轮播图区域 -->
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" @click="navClickHandle(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- /分类导航区域 -->
    <!-- 楼层区域 -->
   <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key=i>
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧图片 -->
          <navigator class="floor-left-img" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>   
          <!-- /左侧图片 -->
          <!-- 右侧的图片 -->
          <view class="floor-right-box">
            <navigator class="floor-right-img" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          </view>
          <!-- /右侧的图片 -->
        </view>
        <!-- /楼层的图片区域 -->
      </view>
    </view>
    <!-- /楼层区域 -->
    
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据
        swiperList:[],
        // 分类导航的数据
        navList:[],
        // 楼层数据列表
        floorList:[]
			};
		},
    onLoad() {
      this.getSwiperList()
      this.getNavlist()
      this.getFloorList()
    },
    methods:{
      // 获取轮播图数据
      async getSwiperList(){
        const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(res)
        // 请求失败
        if(!res.meta.status === 200) return uni.$showMsg()
        this.swiperList = res.message
        // uni.$showMsg('轮播图数据成功')  //测试封装提示消息的函数
      },
      // 获取分类导航数据
      async getNavlist(){
          const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
          // console.log(res, 233)
          if(!res.meta.status === 200) return uni.$showMsg()
          this.navList = res.message
      },
      // 处理分类导航的函数
      navClickHandle(item){
        // console.log(item, 233)
        if(item.name === '分类') {
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      // 获取楼层数据列表
      async getFloorList(){
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        console.log(res, 2333)
        if(!res.meta.status === 200) return uni.$showMsg()
        // 双重for循环处理跳转路径
        res.message.forEach(floor =>{
          floor.product_list.forEach(prod =>{
            prod.url = '/subpkg/goods_list/goods_list?'+ prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      }
    }
	}
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15rpx 0;
}
.nav-img {
  width: 128rpx;
  height: 140rpx;
}
.floor-title {
  width: 100%;
  height: 60rpx;
}
.floor-img-box {
  display: flex;
  padding: 10rpx;
}
.floor-right-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
