<template>
	<view>
    <!-- 搜索框 -->
		<view class="search-box">
		  <!-- 基本用法 -->
		  <uni-search-bar @input="input" :radius="18" cancelButton="none"></uni-search-bar>
		</view>
    <!-- /搜索框 -->
    <!-- 搜索商品建议区 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoGoodsDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="17"></uni-icons>
      </view>
    </view>
    <!-- /搜索商品建议区-->
    <!-- 搜索历史记录 -->
    <view class="history-box" v-else>
      <!-- 标题区 -->
      <view class="history-title">
        <view>搜索历史</view>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <!-- /标题区 -->
      <!-- 历史列表区 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in newHistoryList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
      <!-- /历史列表区 -->
    </view>
    <!-- /搜索历史记录 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定时器
        timer:null,
        // 搜索框关键字
        kw:'',
        // 关键词搜索结果数据
        searchResults:[],
        // 搜索历史数据
        historyList:[]
			};
		},
    computed:{
      newHistoryList:function(){
        return [...this.historyList].reverse()
      }
    },
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods:{
      input(e) {
        // 清除定时器
        clearTimeout(this.timer)
        // 搜索框防抖
        this.timer = setTimeout(()=>{
          this.kw = e.value
          // console.log(this.kw)
          this.getSearchResults()
        },500)
      },
      // 根据关键词,搜索结果
      async getSearchResults(){
        // 判断关键词是否为空
        if(this.kw === '') {
          this.searchResults = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        // console.log(res,'hello')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        // 将所搜关键词添加到历史搜索中
        this.saveHistoryList()
      },
      // 保存历史搜索记录
      saveHistoryList(){
        // 将关键字添加到历史记录的最前面
        // this.historyList.unshift(this.kw)
        // console.log(this.historyList,'hello')
        // 数组去重：方法一
        // this.historyList = Array.from(new Set(this.historyList))
        // 数组去重:方法二
        // this.historyList = [...new Set(this.historyList)]
        // console.log(this.historyList,'world')
        // console.log(this.newHistoryList,'ok')
        // 将Array数组转化成set对象
        const set = new Set(this.historyList)
        // 调用set对象的delete方法,移除对应的元素
        set.delete(this.kw)
        // 调用set对象的add方法,添加对应的元素
        set.add(this.kw)
        // 将set对象转换成Array数组
        this.historyList = Array.from(set)
        // 将历史记录存到本地存储
        uni.setStorageSync('kw',  JSON.stringify(this.historyList))
      },
       
      // 点击搜索结果跳转商品详情页
      gotoGoodsDetail(goods_id){
        // console.log(goods_id, 233)
        uni.navigateTo({
          //跳转到商品详情页，并携带参数goods_id
          url:'/subpkg/goods_detail/goods_detail?goods_id='+ goods_id
        })
      },
      // 清空历史记录
      clearHistory(){
        // 清空历史数据
        this.historyList = [],
        // 清空本地存储
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
      
    }
	}
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    display: flex;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    justify-content: space-between;
    align-items: center;
    .goods-name {
      // 文字不允许换行
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文字超出部分用省略号表示
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-title {
 display: flex;
 justify-content: space-between;
 align-items: center;
 height: 40px;
 font-size: 13px;
 border-bottom: 1px solid #efefef;
 }
 .history-list {
   display: flex;
   flex-wrap: wrap;
 }
uni-tag {
  margin-top: 5px;
  margin-right: 5px;
}
</style>
