<template>
  <div id="consultQrcode">
    <div class="content">
      <div class="sucess">
        <img src="../../static/images/submit_to@2x.png" alt="">
      </div>
      <div class="title">
        <h5>提交成功</h5>
        <p>您的信息已提交，医生助理将会在一个工作日内联系您，请耐心等候!</p>
      </div>
      <div class="img-wrapper">
        <img :src="kefu" alt="">
      </div>
      <div class="tip">
        扫描二维码，马上与医生助理联系!
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "consult-qrcode",
    data(){
      return{
        kefu:''
      }
    },
    mounted(){
      document.title = "提交成功"
      this.kefu = this.$route.query.kefu
    }
  }
</script>

<style scoped lang="less">
  @import '../assets/font.less';
  #consultQrcode{
    .content{
      .title{
        text-align: center;
        width: 80%;
        margin: 0 auto;
        h5{
          font-family: 'PingFangSC-Light';
          font-size: 36/@size;
          margin-top: 0;
          margin-bottom: 46/@size;
          color: #333333;
        }
        p{
          font-family: 'PingFangSC-Light';
          font-size: 30/@size;
          margin-bottom: 34/@size;
          color: #666666;
        }
      }
      .tip{
        font-family: 'PingFangSC-Light';
        font-size: 30/@size;
        margin-top: 34/@size;
        text-align: center;
        color: #666666;
      }
      .sucess{
        img{
          width: 180/@size;
          display:block;
          margin: 64/@size auto 0/@size auto;
        }
      }
      .img-wrapper{
        width: 374/@size;
        height: 374/@size;
        margin:0 auto;
        img{
          width: 100%;
        }
      }
    }
  }
</style>
