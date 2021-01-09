<template>
	<view>
		<view class="goods-list">
		      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
		        <my-goods :goods="goods"></my-goods>
		      </view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
          // 查询关键词
          qurey:'',
          // 商品分类id
          cid:'',
          // 页数索引
          pagenum:1,
          // 每页长度
          pagesize:10
        },
        // 商品列表
        goodsList:[],
        // 商品的总数量
        total: 0,
        // 是否正在请求数据
        isloading:false
			};
		},
    onLoad(options) {
      // console.log(options,23)
      // 将页面传递过来的参数,传递到queryObj中
      this.queryObj.query = options.qurey || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods:{
      // 获取商品列表数据
      async getGoodsList(cb){
        // 打开节流阀
        this.isloading = true
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        console.log(res, '商品列表')
        // 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕,立即调用回调函数
        cb && cb()
        
        if(res.meta.status !== 200) return uni.$showMsg()
        // 为数据重新赋值,用展开运算符,进行新旧数据拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        // this.goodsList.push(...res.message.goods)
        // this.goodsList = res.message.goods
        this.total = res.message.total
      },
      // 下拉触底事件
      onReachBottom(){
        // 判断是否还有下一页的数据
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
        // 判断是否在请求其他数据,如果是,则不发起请求
       if(this.isloading) return
        // 让页码加1
        this.queryObj.pagenum +=1
        // 重新获取列表数据
        this.getGoodsList()
      },
      // 下拉刷新事件
      onPullDownRefresh(){
        // 1.重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        // 2.重新发起请求,同时关闭下拉刷新
        this.getGoodsList(()=>uni.stopPullDownRefresh())
      },
      // 点击商品,跳转到商品详情页
      gotoDetail(item){
        // console.log(item)
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
