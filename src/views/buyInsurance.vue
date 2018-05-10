<template>
  <div id="buyInsurance">
    <div class="banner">
      <img src="../../static/images/good-banner.png" alt="">
    </div>
    <div class="content">
      <div class="p-one">
        <h1>做试管婴儿最难熬的三道"坎</h1>
        <div class="img">
          <img src="../../static/images/good-banner.png" alt="">
        </div>
        <div>
          试管婴儿是现代助孕技术不属于疾病范畴，所以试管婴儿费用目前不能通过医保和新农村合作医疗报销。想做试管婴儿只能全额自费。
          试管婴儿是现代助孕技术不属于疾病范畴，所以试管婴儿费用目前不能通过医保和新农村合作医疗报销。想做试管婴儿只能全额自费。
        </div>

      </div>
    </div>
    <div class="button-wrapper">
      <XButton
        action-type="button"
        text="联系医生助理"
        class="button"
        @click.native="popup"
      >
      </XButton>
    </div>

    <Popup v-model="showGroupPopup" position="bottom" >
      <popup-header
        title="请填写基本信息"
      ></popup-header>
      <Group
        gutter="0"
      >
        <x-input
          text-align="right"
          type="text"
          title="姓名"
          :show-clear="true"
          v-model="user.name"
        ></x-input>
        <Datetime
          :placeholder="endDate.slice(0,7)"
          title="出生年月"
          format="YYYY-MM"
          v-model="user.date"
          :start-date="startDate"
          :end-date="endDate"
          default-selected-value="today"
        ></Datetime>
        <x-input
          title="性别"
          text-align="right"
          v-model="user.sex"
          @on-focus="showSexOptions"
        ></x-input>
        <x-input
          v-model="user.tel"
          text-align="right"
          title="手机"
          is-type="china-mobile"
          :show-clear="true"
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
    </Popup>
    <popup
      v-model="showSexPopup"
      @on-hide = "sexPopupHide"
      position="bottom"
    >
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
      Alert
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
          date:'',
          sex:'男',
          tel:''
        }

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
    methods:{
      popup(){
        this.showGroupPopup = true
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
        this.user.sex= sex
        this.sexPopupHide()
      },
      submitInfo(){
        if(this.user.name === ''){
            this.$vux.alert.show({
              content:"请输入姓名"
            })
        }else if(this.user.tel.length != 11 || /\D/.test(this.user.tel)){
          this.$vux.alert.show({
            content:"请输入11位手机号码"
          })
        }
      }
    }
  }
</script>

<style lang="less" >
  @import '../assets/font.less';
  #buyInsurance {
    .banner {
      width: 100%;
      height: 320/@size;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content{
      margin-top:50/@size;
      .p-one{
        h1{

          text-align: center;
          .font28
        }
        div{
          float: left;
          width: 80%;
        }
        .img{
          float: right;
          width: 20%;
          height: 100/@size;
          img{
            float: left;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .button-wrapper{
      position: fixed;
      left: 0;
      bottom: 10/@size;
      width: 100%;

      .button{
        font-size: 28/@size !important;
        width: 80%;
        height: 70/@size;
        background: url(../../static/images/bg-btn.png) no-repeat;
        border-radius: 30/@size;
      }
    }
    input{
      color: #999999 !important;

    }
    .weui-cell__bd{
      padding-right: 13px !important;
    }
    .textarea{
      .font28;
      color: #999999 !important;
    }
    .submit-button{
      width: 80%;
      height: 70/@size;
      border-radius: 30/@size;
      font-size: 30/@size !important;
      margin-bottom: 20/@size;
    }
  }

</style>
