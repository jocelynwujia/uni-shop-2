<template>
	<view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货的地址+</button>
    </view>
    
    <!-- 收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view> 
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view> 
           <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addressStr}}
        </view>
      </view>
    </view>
    <!-- /收货信息的盒子 -->
    
		<!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class = "address-border"></image>
		<!-- /底部边框线-->
	</view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		data() {
			return {
        // 用户的收货地址 用store中是数据
				// address:{}
        isSure: false
			};
		},
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addressStr']),
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      //1.调用小程序提供的chooseAddress()方法，即可使用选择收货地址的功能 
      // 返回值是一个数组：第一项为错误对象，第二项为成功之后的收货地址对象
      async chooseAddress(){
        if (this.isSure) return uni.openSetting()
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        // 用户成功选择了收货地址
        if(err === null && succ.errMsg === "chooseAddress:ok") {
          // this.address = succ
          // console.log(this.address)
          // 将数据存储到store当中
          return this.updateAddress(succ)
        }
        // console.log(err,233)
        if(err && err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response') {
          // 调用这个方法，让用户重新授权
          // this.reAuth()
          this.isSure = true
        }
      },
      // 让用户重新授权
      async reAuth(){
        // wx.getSetting({
        //    success: res => {
        //      let authSetting = res.authSetting
        //      if (!authSetting['scope.writePhotosAlbum']) {
        //         wx.showModal({
        //            title: '提示',
        //            content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
        //            success(res) {
        //              if (res.confirm) {
        //                uni.openSetting()
        //              }
        //            }
        //         })
        //       }
        //     }
        // })
        // 提示用户进行授权
        const [err2, confirmResult] = await uni.showModal({
          title: '检测到您没有打开地址权限，是否去设置打开？',
          confirmText: '确认',
          cancelText:'取消',
        })
        // console.log(confirmResult)
        if(err2) return 
        // console.log(confirmResult, 233)
        if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        if(confirmResult.confirm)  {
        uni.openSetting({
          fail: (settingResult) => {
            console.log(111)
            if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！')
            if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了授权')
              
            }
        })
      }
      }
    }
	}
</script>

<style lang="scss">
  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
