export default {
  // 开启命名空间
  namespaced:true,
  // state数据
  state:{
    // 收货地址
    //读取本地存储的数据，初始化address
    address:JSON.parse(uni.getStorageSync('address') || '{}')
  },
  mutations:{
    // 更新收货地址
    updateAddress(state, address){
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 将address数据持久化存到本地
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    }
  },
  getters:{
    // 收货地址
    addressStr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName +state.address.countyName + state.address.detailInfo
    }
  }
}