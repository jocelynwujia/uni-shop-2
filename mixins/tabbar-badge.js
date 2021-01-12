  // 按需导入mapGetters
import {mapGetters} from 'vuex'
export default {
  computed:{
    // 将 m_cart 模块中的 total 映射为当前页面的计算属性
    ...mapGetters('m_cart',['total'])
  },
  // 监听total的变化
  watch:{
    total(){
      // 重新为tabBar徽标赋值
      this.setBadge()
    }
  },   
  onShow(){
     // 在页面刚加载出来后,立即为tabBar设置数字徽标
    this.setBadge()
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text: this.total + ''
      })
  }
}
}