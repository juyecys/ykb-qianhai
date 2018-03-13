<template>
  <div id="surgicalInsurance">
    <div class="section">
      <img v-for="item in 5" :src="'../../static/images/surgicalInsurance-'+item+'.jpg'" alt="" class="bgSurgicalInsurance">
    </div>
    <div class="btn" @click="toBuyInsurance">立即投保</div>
    <div class="mask" v-show="showTips"></div>
    <div class="tips" v-show="showTips">
      <div class="tipsHeader">请移步至保险办理处投保</div>
      <div class="tipsBody">
        <div class="tipsItem">
          <span class="itemName">投保地点:</span>
          <span class="itemValue">外科楼一楼(医保办旁)</span>
        </div>
        <div class="tipsItem">
          <span class="itemName">咨询热线:</span>
          <span class="itemValue"><a href="tel:185-0666-0181">185-0666-0181</a></span>
        </div>
        <div class="tipsItem">
          <span class="itemName">服务时间:</span>
          <span class="itemValue">周一至周六</span>
        </div>
        <div class="tipsItem">
          <span class="itemName"></span>
          <span class="itemValue">上午8:00-12:00</span>
        </div>
        <div class="tipsItem">
          <span class="itemName"></span>
          <span class="itemValue">下午2:30-6:00</span>
        </div>
        <div class="tipsClose">
          <img src="../../static/images/icon-close-white.png" alt="" @click="closeTips">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'surgicalInsurance',
    data(){
      return {
        showTips:false
      }
    },
    mounted(){
      document.title = '人保寿手术意外保险'
    },
    methods:{
      closeTips(){
        this.showTips = false
      },
      toBuyInsurance(){
        this.showTips = true
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/font.less';
  #surgicalInsurance{
    .mask{
      background: rgba(0,0,0,.8);
      position: fixed;
      left:0;
      right:0;
      top:0;
      bottom:0;
      z-index:99;
    }
    .tips{
      position: fixed;
      z-index:100;
      background: #fff;
      width:540/@size;
      height:440/@size;
      left:50%;
      top:210/@size;
      transform:translate(-50%,0);
      border-radius:5/@size;
      padding:0 50/@size;
      box-sizing: border-box;
      .tipsHeader{
        margin-top:38/@size;
        margin-bottom:38/@size;
        text-align: center;
        .font34();
        color:#333;
      }
      .tipsBody{
        .font28();
        .tipsItem{
          display:flex;
          margin-top:20/@size;
        }
        .itemName{
          color:#999;
          width:140/@size;
        }
        .itemValue{

        }
      }
      .tipsClose{
        position: absolute;
        margin-top:180/@size;
        left:50%;
        transform:translate(-50%,0);
        img{
          width:50/@size;
        }
      }
    }
    .bgSurgicalInsurance{
      width:100%;
      margin:0;
      padding:0;
      margin-top:-8/@size;
    }
    .bgSurgicalInsurance:last-child{
      margin-bottom:92/@size;
    }
    .btn{
      width:100%;
      text-align: center;
      height:100/@size;
      line-height:100/@size;
      color:#fff;
      background: url("../../static/images/bg-btn.png") no-repeat;
      background-size: cover;
      position: fixed;
      bottom:0px;
      .font30();
    }
  }
</style>
