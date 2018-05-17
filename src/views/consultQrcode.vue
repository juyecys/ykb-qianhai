<template>
  <div id="consultQrcode">
    <div class="content">
      <div class="sucess">
        <img src="../../static/images/submit_to@2x.png" alt="">
      </div>
      <div class="img-wrapper">
        <img :src="kefu" alt="">
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
      .img-wrapper{
        width: 300/@size;
        height: 300/@size;
        img{
          width: 100%;
          background-size: contain;
        }
      }
    }
  }
</style>
