<template>
  <div id="buyInsurance">
    <div class="banner">
        <swiper  ref="mySwiper" id="mySwiper" :options="swiperOption">
          <swiper-slide
                        :style="getBg(item.img)"
                        :key="index"
                        v-for="(item,index) in bannerList">
          </swiper-slide>

          <!--小点点-->
          <div class="swiper-pagination" slot="pagination"></div>
          <!--箭头-->
          <div class="swiper-button-prev " slot="button-prev">
            <span class="icon iconfont icon-arrow-l"></span>
          </div>
          <div class="swiper-button-next" slot="button-next">
            <span class="icon iconfont icon-arrow-r"></span>
          </div>
        </swiper>
    </div>
    <div class="content">
      <ul>
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
        title="请填写基本信息"
      ></popup-header>
      <span class="vux-close" @click="togglePopup">
        <img src="../../static/images/close@2x.png" />
      </span>
      <Group
        gutter="0"

      >
        <x-input
          text-align="right"
          type="text"
          title="姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名"
          :show-clear="true"
          v-model="user.name"
          placeholder="请输入您的姓名"
        ></x-input>
          <Datetime
            title="出生年月"
            format="YYYY-MM"
            v-model="user.birthday"
            :start-date="startDate"
            :placeholder="'请输入出生年月'"
            :end-date="endDate"
            label-width="30"
          >
          </Datetime>
        <x-input
          title="性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别"
          text-align="right"
          v-model="user.gender"
          :readonly="true"
          @on-focus="showSexOptions"
          placeholder="请选择您的性别"
        >
          <i slot="right-full-height">
            <x-icon type="ios-arrow-forward" size="20"></x-icon>
          </i>
        </x-input>
        <x-input
          ref="input"
          v-model="user.mobile"
          text-align="right"
          title="手机号码"
          is-type="china-mobile"
          :show-clear="true"
          placeholder="请输入11位手机号"
        ></x-input>
        <x-textarea
          :autosize="true"
          :readonly="true"
          v-model="tips"
          class="textarea"
        ></x-textarea>
        <x-button
          action-type="submit"
          type="primary"
          class="submit-button"
          @click.native = "submitInfo"
        >提交</x-button>


      </Group>
    </popup>
    <popup
      v-model="showSexPopup"
      @on-hide = "sexPopupHide"
      position="bottom"
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
        tips:'* 以上信息用于：（1）医生助理为您评估是否符合试管婴儿保险的购买要求；（2）医生助理与您联系',
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
      })
    },
    methods:{
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
          const res = await  api.submitUserInfo(params)
            if(res.code === 2000)
                this.goConsultQrcode();
            else
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
      }
    }
  }
</script>

<style lang="less" >
  @import '../assets/font.less';
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
          height: 300/@size;

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
        margin-bottom: 20/@size;
        border-radius: 0 !important;
        color: #fffefe;
        background: url(../../static/images/bg-btn.png) no-repeat;
      }
    }

  }

</style>
