export default {
  // 为当前模块开启命名空间
  namespaced:true,
  // 模块的store数据
  state:()=>({
    // 购物车的数组,用来存储购物车中每个商品信息对象
    // 每个商品的信息对象,都包含如下6个属性
    // {goog_id,good_name,good_price,good_count,good_small_logo,good_state}
    cart: JSON.parse(uni.getStorageSync('cart') || '[]') 
  }),
  // 模块的mutations方法 
  mutations:{
    // 添加商品到购物车
    addToCart(state, goods){
        // 根据提交的商品的ID,查询购物车中是否存在这件商品
        // 如果存在,则findResult为undefined,否则,为查找到的商品信息对象
        //find方法，符合条件，返回符合条件的元素，不符合条件返回undefined
       const findResult = state.cart.find((x)=>x.goods_id===goods.goods_id)
       // console.log(findResult,233)
       if(!findResult) {
         // 如果购物车中没有这件商品,则直接push
         state.cart.push(goods)        
       } else{
         //如果购物车没有这件商品，则只能更新数量即可
         findResult.goods_count++
      }
      // console.log(state.cart,333)
      // 购物车添加完成后将数据存储到本地
      //通过commit方法，调用m_cart空间下的saveToStorage方法
      this.commit('m_cart/saveToStorage')
    },
    // 更改购物车商品的勾选状态
    updateGoodsState(state, goods){
      // 根据商品id,查询购物车的信息
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)  
      // 有对应的商品信息,则更新勾选状态
      if(findResult){
        findResult.goods_state = goods.goods_state
      }
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    // 更新购物车商品的数量
    updateGoodsCount(state, goods){
      // 根据商品id,查询购物车的信息
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
      // 如果有对应的商品信息,则更新商品的数量
      if(findResult) {
        findResult.goods_count = goods.goods_count
      }
      // 将数据持久化存到本地
      this.commit('m_cart/saveToStorage')
    },
    // 将购物车中的数据存储到本地, 持久化
    // 根据id删除购物车中的商品
    removeGoodsById(state, goods_id){
      state.cart = state.cart.filter(x=>x.goods_id !== goods_id)
      // 持久化存储
      this.commit('m_cart/saveToStorage')
    },
    // 更新所有商品的勾选状态
    updateAllGoodsState(state, newState){
      // 循环所有商品中每件商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState)
      // 持久化到本地
      this.commit('m_cart/saveToStorage')
    },
    
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    }
  } ,
  // 模块的getters属性
  getters:{
    // 统计购物车中商品的总数量
    total(state){
      // let c = 0
      // // 循环统计商品的数量,累加到变量C中
      // state.cart.forEach(goods => c += goods.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count,0)
    },
    // 统计计结算模块的商品数量,即购物车中被勾选的商品数量
    checkedCount(state){
      return state.cart.filter(x=>x.goods_state).reduce((total, item)=> total +=item.goods_count,0)
    },
    // 更新已勾选商品的总价
    checkedGoodsAmout(state){
     return state.cart.filter(x => x.goods_state).reduce((total, item)=> total += item.goods_count * item.goods_price,0).toFixed(2)
    }
  }  
}