<template>
  <div id="buyInsurance">
    <div v-if="bannerList.length > 1" class="banner">
        <swiper  ref="mySwiper" id="mySwiper" :options="swiperOption">
          <swiper-slide
                        :data-link="item.link"
                        :key="index"
                        v-for="(item,index) in bannerList">
              <img :src="item.img" @click="goLink(item.link)" />
          </swiper-slide>
        </swiper>
    </div>
    <div class="content">
      <ul>
        <li v-if="bannerList.length === 1">
          <img :src="bannerList[0].img" alt="" @click="goLink(bannerList[0].link)"/>
        </li>
        <li v-for="item in imgs">
          <img :src="item" alt="">
        </li>
      </ul>
      </div>
    <div class="button-wrapper">
      <XButton
        action-type="button"
        text="联系医生助理"
        class="button"
        @click.native="togglePopup"
      >
      </XButton>
    </div>
    <popup v-model="showGroupPopup" position="bottom" class="popup" >
      <popup-header
        title="填写基本信息"
      ></popup-header>
      <span class="vux-close" @click="togglePopup">
        <img src="../../static/images/close@2x.png" />
      </span>
      <ul class="top">
        <li class="bdr-bottom">
          <span class="left">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</span>
          <div class="right">
          <input type="text" v-model="user.name" placeholder="请输入姓名">
        </div>
        </li>
        <li  class="bdr-bottom"  @click="birthdayVisibility = true">
        <span class="left" >出生日期</span>
         <div class="right right-icon" >
         <p>
           {{user.birthday}}
         </p>
         <p>
           <img  src="../../static/images/icon-date.png" alt="" class="rightIcon">
         </p>
       </div>
      </li>
        <li  class="bdr-bottom"  @click="showSex">
          <span class="left">性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别</span>
          <div class="right right-icon">
          <p>{{user.gender}}</p>
          <p>
            <img  src="../../static/images/icon-right-arrow.png" alt="" class="rightIcon smallIcon">
          </p>
        </div>
        </li>
        <li  class="bdr-bottom">
          <span class="left">手机号码</span>
          <span class="right ">
          <input type="number" v-model="user.mobile" placeholder="请输入手机号码">
        </span>
        </li>
      </ul>
      <div class="tips">
        <em>* </em> {{tips}}
      </div>
      <x-button
        action-type="submit"
        type="primary"
        class="submit-button"
        @click.native = "submitInfo"
      >提交</x-button>
    </popup>
    <popup
      v-model="showSexPopup"
      @on-hide = "sexPopupHide"
    >
      <popup-header
      left-text="取消"
      right-text="确定"
      @on-click-left="sexPopupHide"
      @on-click-right="sexPopupHide"
    ></popup-header>
      <group gutter="0" >
        <x-input
          @click.native="selectSex('男')"
          placeholder-align="center"
          placeholder="男"
          :readonly="true"
          text-align="center"
        ></x-input>
        <x-input
          @click.native="selectSex('女')"
          placeholder-align="center"
          placeholder="女"
          :readonly="true"
          text-align="center"
        ></x-input>
      </group>
    </popup>
    <Datetime
      format="YYYY-MM"
      v-model="user.birthday"
      :start-date="startDate"
      :placeholder="'请输入出生年月'"
      :end-date="endDate"
      label-width="30"
      :show.sync="birthdayVisibility"
    >
    </Datetime>
  </div>

</template>

<script>
  require('swiper/dist/css/swiper.css')
  import api from '../api/index';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Popup,XButton,Alert,Group,XInput,Calendar,Datetime,PopupHeader,PopupRadio, XTextarea } from 'vux'
  export default {
    name: "buy-insurance",
    components:{
      Popup,
      XButton,
      Group,
      XInput,
      Calendar,
      Datetime,
      PopupHeader,
      PopupRadio,
      XTextarea,
      Alert,
      swiper,
      swiperSlide
    },
    data(){
      return{
        showGroupPopup:false,
        showSexPopup:false,
        birthdayVisibility:false,
        tips:'以上信息用于：（1）医生助理为您评估是否符合试管婴儿保险的购买要求；（2）医生助理与您联系',
        today:new Date().getFullYear()+"-"+
        ((new Date().getMonth()+1)<10? '0'+(new Date().getMonth()+1): (new Date().getMonth()+1)) +"-"
              +(new Date().getDate()<10? '0'+new Date().getDate():new Date().getDate()),
        user:{
          name:'',
          birthday:'',
          gender:'',
          mobile:''
        },
        mySwiper:{},
        swiperOption: {
          loop:false,
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          on :{
            init:  () => {
              //this.mySwiper = document.querySelector('#mySwiper').swiper
            },
            click: (e)=> {
              try {
                let link = e.target.getAttribute('data-link')
                if(!this.isNullOrEmpty(link)){
                  location.href = link
                }
              }catch (e) {}
            },
          }
        },
        bannerList:[],
          imgs:[],
          kefu:''
      }
    },
    computed:{
      startDate(){
        console.log(parseInt(this.today.split('-')[0])-42 + '-' +
          this.today.split('-')[1] + '-' +
          this.today.split('-')[2])
        return parseInt(this.today.split('-')[0])-42 + '-' +
                this.today.split('-')[1] + '-' +
                this.today.split('-')[2]
      },
      endDate(){
        return parseInt(this.today.split('-')[0])-20 + '-' +
          this.today.split('-')[1] + '-' +
          this.today.split('-')[2]
      }
  },
    created(){
      api.getInsuranceImg().then(res=>{
        if (res.code === 2000) {
          this.kefu = res.result[0].kefu
          try {
            this.imgs = JSON.parse(res.result[0].imgs);
          } catch (e) {
            this.imgs = []
          }
          try {
            this.bannerList = JSON.parse(res.result[0].banners);
          } catch (e) {
            this.bannerList = [];
          }
        } else if (res.code == 4001) {
          this.goAuth();
        }
      })
      this.wxShare({
        title: '添加医生助理可获得备孕大礼包！', // 分享标题
        desc: '购买试管婴儿保险“保怀孕”，不成功我赔钱。', // 分享描述
        link: encodeURI(this.getAuthUrl()), //encodeURI(location.href), // 分享链接
        imgUrl: 'http://ykb-static-staging.oss-cn-shenzhen.aliyuncs.com/share_logo.png', // 分享图标
      })
    },
    mounted(){
      this.keyboardFuc()
    },
    methods:{
      showSex(){
        this.showSexPopup = true;
        this.showGroupPopup = false
      },
      goLink(link) {
        console.log(link)
        if (link && link.length > 0) {
          location.href = link
        }
      },
      getAuthUrl() {
        let code = this.$route.params.code;
        return window.location.hostname === 'staging.chengyisheng.com.cn'?
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx51e37306f30d52a9&redirect_uri=http%3a%2f%2fstaging.chengyisheng.com.cn%2fykb%2fwp%2fpublic%2flogin%2f%3fykb_url%3dhttp%3a%2f%2fstaging.chengyisheng.com.cn%2fykb_qianhai%2findex.htmlssssbuyInsurancessss' + code + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
          :
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bfb03bc9c23b615&redirect_uri=http%3a%2f%2fm.chengyisheng.com.cn%2fykb%2fwp%2fpublic%2flogin%2f%3fykb_url%3dhttp%3a%2f%2fm.chengyisheng.com.cn%2fykb_qianhai%2findex.htmlssssbuyInsurancessss' + code + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'

      },
      goAuth() {
        window.location.href = this.getAuthUrl();
      },
      togglePopup(){
        this.showGroupPopup=this.showGroupPopup == true ?  false : true
      },
      showSexOptions(){
        this.showSexPopup = true
        this.showGroupPopup = false
      },
      sexPopupHide(){
        this.showSexPopup = false
        this.showGroupPopup = true
      },
      selectSex(sex){
        this.user.gender= sex
        this.sexPopupHide()
      },
      async submitInfo(){
        if(this.user.name === ''){
            this.$vux.alert.show({
              content:"请输入您姓名"
            })
        }else if(this.user.birthday === ''){
          this.$vux.alert.show({
            content:"请输入您的出生年月"
          })
        }else if(this.user.gender === ''){
          this.$vux.alert.show({
            content:"请输入您的性别"
          })
        }
        else if(this.user.mobile.length != 11 || /\D/.test(this.user.mobile)){
          this.$vux.alert.show({
            content:"请输入11位手机号码"
          })
        }else{
         let  params = {
            bdChannelId: this.$route.params.code,
            gender: this.user.gender === '男' ? 1 : 2,
            birthday: this.user.birthday + '-01 00:00:00',
            name: this.user.name,
            mobile: this.user.mobile
          }

          this.$vux.loading.show({
            text: ''
          });
          const res = await  api.submitUserInfo(params)
          this.$vux.loading.hide();
            if(res.code === 2000) {
              this.goConsultQrcode();

            }
            else if (res.code === 6001) {
              this.$vux.alert.show({
                content:'10分钟内只能提交一次'
              })
            } else if (res.code === 4001) {
              this.goAuth()
            } else
                this.$vux.alert.show({
                  content:res.desc
               })
        }
      },
      getBg(item) {
        return {
          backgroundImage: 'url('+item+')'
        }
      },
      goConsultQrcode(){
        console.log("i am in")
        this.$router.push({
          name:'consultQrcode',
          query:{
            kefu:this.kefu
          }
        })
      },
      //处理安卓机键盘覆盖input
      keyboardFuc() {
        this.$nextTick(() => {
          let interval;
          //解决第三方软键盘唤起时底部input输入框被遮挡问题
          let bfscrolltop = document.body.scrollTop;
          //获取软键盘唤起前浏览器滚动部分的高度
          document.querySelector('input').focus = (() => {
            //在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
            interval = setInterval(function () {
              //设置一个计时器，时间设置与软键盘弹出所需时间相近
              document.body.scrollTop = document.body.scrollHeight;
              //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
            }, 100)
          });
          document.querySelector('input').blur(() => {
            //设定输入框失去焦点时的事件
            clearInterval(interval);//清除计时器
            document.body.scrollTop = bfscrolltop;
            //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
          });
        })
      },
    }
  }
</script>

<style lang="less" >
  @import '../assets/font.less';
  /* 去除iPhone中默认的input样式 */

  #buyInsurance {
    .vux-x-input-right-full{
      align-items: center;
      height: 100% !important;
    }
    .banner{
      .canClick{
        cursor: pointer;
      }
      height: 30%;
      .swiper-container{

        .swiper-slide{
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50% 50%;
          height: 375/@size;
         img{
           width: 100%;
           height: 100%;
           display: block;
         }

          span {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .swiper-button-next,.swiper-button-prev{
          background-size: 50/@size 50/@size !important;
        }
      }
      .icon{
        font-size: 30/@size;
        width: 30/@size;
        height: 30/@size;
      }
    }

    .content{
      margin-bottom: 100/@size;
      img{
        width: 100%;
        background-size:contain;
        display: block;
      }
    }
    .button-wrapper{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      .button{
        font-size: 32/@size !important;
        background: url(../../static/images/bg-btn.png) no-repeat;
        height: 100/@size;
        border-radius: 0;
        color: #fffefe;
      }
    }
    .tips{
      font-size: 24/@size;
      color: #999999;
      padding: 24/@size 30/@size 40/@size 30/@size;
      background: #fff;
    }
    .top{
      padding:0 0 0 30/@size;
      background: #fff;
      /*下边框*/
      .bdr-bottom:after {
        content: " ";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        color: #dfdfdf;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        border-bottom: 1px solid #D9D9D9;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
      }

      li{
        font-size: 30/@size;
        color: #666666;
        display: flex;
        align-items: center;
        position: relative;
        height: 90/@size;
        input{
          width: 100%;
          -webkit-appearance:none;
          resize: none;
          border-radius: 0;
          color: inherit;
          text-shadow: none;
          outline:none;
          border: 0;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        input::-webkit-input-placeholder {
          font-size: 30/@size;
          color: #666666 !important;
        }
        .left{
          width: 33%;
        }
        .right-icon{
          justify-content: space-between;
        }
        .right{
          width: 63%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          img{
            width: 40/@size;
          }
        }
        .defaultColor{
          color: #000;
        }
      }
    }
    em{
      color: red;
    }

    .popup{
      border-radius: 14/@size 14/@size 0 0;

      .vux-close{
        display: inline-block;
        position: absolute;
        margin: auto;
        right:15px;
        top:15px;
        z-index:998;
        align-items: center;
        width: 30/@size;
        height: 30/@size;
        img{
          width:100%;
          height: 100%;
          display: block;
        }
      }
      .vux-popup-header{
        background: white;
        color: #333333;
        font-size: 30/@size;
      }
      label,p{
        font-size: 30/@size;
        color:#666666;
      }
      input{
        font-size: 30/@size;

        color: #333333 !important;

      }
      .weui-cell__bd{
        padding-right: 13px !important;
      }
      .textarea{
        font-size: 24/@size;
        color: #999999 !important;
      }
      .submit-button{
        height: 70/@size;
        font-size: 32/@size !important;
        height: 100/@size;
        //margin-bottom: 20/@size;
        border-radius: 0 !important;
        color: #fffefe;
        background: url(../../static/images/bg-btn.png) no-repeat;
      }
    }
    .vux-cell-primary{
      display: none;
    }
    .weui-cell:before {
      height: 0;
      border:0;
    }
    .vux-cell-box:not(:first-child):before{
      height: 0;
      border:0;
    }
  }

</style>
