// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wx from 'weixin-js-sdk';
import axios from 'axios'
Vue.config.productionTip = false

Vue.prototype.wxShare = (obj)=>{
  axios.get('/ykb/wp/public/config/?url='+window.location.href)
    .then(res=>{
      if(res.data.code === 2000){
        let data = res.data.result
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        })
      }else{
        console.log('获取微信分享参数失败')
      }
    })
    .catch(error=>{
      console.log(error)
    });
  wx.ready(()=>{
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: obj.title, // 分享标题
      desc: obj.desc, // 分享描述
      link: obj.link, // 分享链接
      imgUrl: obj.imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        console.log('已分享给朋友');
        if(obj.hasOwnProperty('success') && typeof obj.success === 'function'){
          obj.success()
        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('用户取消分享')
        if(obj.hasOwnProperty('cancel') && typeof obj.cancel === 'function'){
          obj.cancel()
        }
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
        if(obj.hasOwnProperty('fail') && typeof obj.fail === 'function'){
          obj.fail()
        }
      }
    });

    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: obj.title, // 分享标题
      link: obj.link,
      imgUrl: obj.imgUrl, // 分享图标
      success: function () {
        console.log('已分享朋友朋友圈');
        if(obj.hasOwnProperty('success') && typeof obj.success === 'function'){
          obj.success()
        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('用户取消分享朋友圈')
        if(obj.hasOwnProperty('cancel') && typeof obj.cancel === 'function'){
          obj.cancel()
        }
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
        if(obj.hasOwnProperty('fail') && typeof obj.fail === 'function'){
          obj.fail()
        }
      }
    });
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
