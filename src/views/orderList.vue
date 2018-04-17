<template>
  <div id="orderList">
    <div class="orderType" ref="orderType">
      <div :class="['type',actionType===1?'actionType':'']" @click="showOrderList(1)">有效订单</div>
      <div :class="['type',actionType===0?'actionType':'']" @click="showOrderList(0)">待支付</div>
      <div :class="['type',actionType===2?'actionType':'']" @click="showOrderList(2)">全部订单</div>
    </div>
    <div class="orderList">
      <ul v-if="hasOrder">
        <li v-for="item in orderLists">
          <div class="orderItems" v-show="item.statusType === actionType || actionType === 2" @click="toOrderDetail($event,item.userId,item.partnerOrderId)">
            <div class="orderItem">
              <span class="itemName">订单号:</span>
              <span class="itemValue">{{item.orderNumber}}</span>
              <span :class="['itemStatus',item.statusClass ]">{{item.statusText}}</span>
            </div>
            <div class="orderItem">
              <span class="itemName">保险名称:</span>
              <span class="itemValue">{{item.name}}</span>
            </div>
            <div class="orderItem">
              <span class="itemName">被保人:</span>
              <span class="itemValue">{{item.insuredName}}</span>
            </div>
            <div class="orderItem">
              <span class="itemName">保障期限:</span>
              <span class="itemValue longValue">{{item.insuranceStartDate}} 至 {{item.insuranceEndDate}}</span>
            </div>
            <div class="orderItem">
              <span class="itemName">下单时间:</span>
              <span class="itemValue">{{item.orderDate}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="hasNoOrder" v-if="!hasOrder || (actionType===2 && !hadAllOrder)|| (actionType===0 && !hadNoPaiedOrder) || (actionType===1 && !hadValidOrder)">
        <img src="../../static/images/hasNoOrder.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../api/index';
  import crypto from 'crypto';
  import dateFormat from '../assets/dateFormat';
  export default {
    name:'orderList',
    data(){
      return {
        hasOrder:true,
        actionType:1,
        orderLists:[],
        hadAllOrder:false,
        hadNoPaiedOrder:false,
        hadValidOrder:false
      }
    },
    created(){
      if(window.location.href.indexOf('from=singlemessage')>-1 || window.location.href.indexOf('myShare=true')>-1){
        let link = window.location.hostname === 'staging.chengyisheng.com.cn'?
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx51e37306f30d52a9&redirect_uri=http%3a%2f%2fstaging.chengyisheng.com.cn%2fykb%2fwp%2fpublic%2flogin%2f%3fykb_url%3dhttp%3a%2f%2fstaging.chengyisheng.com.cn%2fykb_qianhai%2findex.html%23%2forderList&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
          :'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bfb03bc9c23b615&redirect_uri=http%3a%2f%2fm.chengyisheng.com.cn%2fykb%2fwp%2fpublic%2flogin%2f%3fykb_url%3dhttp%3a%2f%2fm.chengyisheng.com.cn%2fykb_qianhai%2findex.html%23%2forderList&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
        window.location.href = link
      }
    },
    mounted(){
      /*
       * statusType表示
       * 0----待支付
       * 1----有效订单
       * 2----全部订单
       * */
      let shareObj = {
        title:'易康保',
        desc:'易康保-试管婴儿订单列表',
        imgUrl:/^(http|https)+(:\/\/+[a-zA-Z0-9.]+)/g.exec(window.location.href)[0]+'/ykb_qianhai/static/images/logo.jpg',
        link:window.location.href + '?myShare=true',
      }
      console.log(shareObj)
      this.wxShare(shareObj)
      api.getMyOrderList().then(res=>{
          console.log(res)
          let data = res.hasOwnProperty('result')?res.result:[],
            a=0//a用来计数有那种订单，有优先级，actionType等于那个数字
          data.length>0&&data.map(item=>{
            switch(item.status){
              case 'WAIT_CONFIRM':
                item.statusType = 0
                item.statusText = '待支付'
                item.statusClass= 'waitPay'
                this.hadAllOrder = true
                this.hadNoPaiedOrder = true
                a=100;
                break;

              case 'WAIT_PAIED':
                item.statusType = 0
                item.statusText = '待支付'
                item.statusClass= 'waitPay'
                this.hadAllOrder = true
                this.hadNoPaiedOrder = true
                a=100;
                break;

              case 'UNDERWRITE':
                item.statusType = 1
                item.statusText = '已承保'
                item.statusClass= 'hadEffective'
                this.hadAllOrder = true
                this.hadValidOrder = true
                if(a<=10) a=10;
                break;

              case 'PAIED':
                item.statusType = 1
                item.statusText = '已支付'
                item.statusClass= 'hadPaid'
                this.hadAllOrder = true
                this.hadValidOrder = true
                if(a<=10) a=10;
                break;

              case 'AUDIT_NOT_THROUGH':
                item.statusType = 2
                item.statusText = '审核不通过'
                item.statusClass= 'noPass'
                this.hadAllOrder = true
                if(a<=1) a=1;
                break;

              case 'OVERTIME_PAIED':
                item.statusType = 2
                item.statusText = '超时未付'
                item.statusClass= 'noPaid'
                this.hadAllOrder = true
                if(a<=1) a=1;
                break;

              case 'END':
                item.statusType = 2
                item.statusText = '已结束'
                item.statusClass= 'end'
                this.hadAllOrder = true
                if(a<=1) a=1;
                break;
            }
          })
        if(a===100){
            this.actionType = 0
        }else if(a===10){
          this.actionType = 1
        }else{
          this.actionType = 2
        }
        //this.orderLists = []
          this.orderLists = data
        })
      let isIos = false,bodyEle=null,orderType = this.$refs.orderType
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        isIos = true
      }
      if (document.body.scrollTop > 0) {
        bodyEle = document.body
      } else {
        bodyEle = document.documentElement
      }
      window.scrollTo(0,1)
      window.addEventListener('scroll',()=>{
        if(!isIos){
          if(bodyEle.scrollTop > 1){
            orderType.style.position = 'fixed'
          }else {
            orderType.style.position = 'relative'
          }
        }

      })
    },
    methods:{
      toOrderDetail(event,userId,id){
        let obj = {
          userId:userId,
          orderId:id,
          reqTime:dateFormat(new Date(),'yyyymmdd','HHmmdd','')
        },
          key = window.location.hostname === 'staging.chengyisheng.com.cn'?'29F802572E8D4D9E90E9EBBEA51CEB58':'63F0C27BE5D54DBE8DD40F88035F8C64'

        obj.sign = this.md5(obj,key)
        obj.actionType = 'orderDetail'
        let actionUrl = ((window.location.hostname === 'staging.chengyisheng.com.cn')?'http://wxsaleuat.qhins.com/wcthl/third/entry/ykb/tubebaby/orderDetail':'https://wxsale.qhins.com/wcthl/third/entry/ykb/tubebaby/orderDetail')
        console.log(window.location.hostname,window.location.hostname === 'staging.chengyisheng.com.cn',actionUrl)
        this.jsForm(event,obj,actionUrl)
        console.log(obj)
      },
      jsForm(event,obj,url){
        let temp = document.createElement("form");
        temp.id = 'authForm';
        temp.action = url;
        temp.method = "get";
        temp.style.display = "none";
        for (let x in obj) {
          let opt = document.createElement("input");
          opt.name = x;
          opt.value = obj[x];
          console.log(opt.name,opt.value)
          temp.appendChild(opt);
        }
        let bodyEle = document.body || document.documentElement
        bodyEle.appendChild(temp);
        console.log(event)
        event.preventDefault()
        temp.submit();
        bodyEle.removeChild(temp);
        //return temp;
      },
      md5(obj,key){
        let keyArr = [],str='',result
        for (let key in obj) {
          keyArr.push(key)
        }
        keyArr.sort()
        for (let i = 0, len = keyArr.length; i < len; i++) {
          str += keyArr[i] + obj[keyArr[i]]
        }
        str+=key
        console.log(str)
        let ohash = crypto.createHash('md5');
        ohash.update(str)
        result = ohash.digest('hex')
        console.log(result)
        return result
      },
      showOrderList(status){
        /*
        * status表示
        * 0----待支付
        * 1----有效订单
        * 2----全部订单
        * */
        this.actionType = status

      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/font.less';
  #orderList{
    .orderType{
      width:100%;
      height:88/@size;
      background: #fff;
      display: flex;
      align-items:center;
      border-bottom:1px solid #ececec;
      position:-webkit-sticky;
      top:0;
      z-index:99;
      .type{
        width:33.33%;
        text-align:center;
        color:#999;
        .font30();
      }
      .actionType{
        color:#fd9627;
        position: relative;
      }
      .actionType:after{
        content:'';
        position: absolute;
        width:80/@size;
        height:4/@size;
        background: #fd9627;
        bottom:-22/@size;
        left:50%;
        transform:translate(-50%,0);
      }
    }
    .orderList{
      li{
        margin-top:27/@size;
        background: #fff;
        box-sizing: border-box;
        //border-top:1px solid #ececec;
        //border-bottom:1px solid #ececec;
      }
      li:last-child{
        margin-bottom:27/@size;
      }
      .orderItems{
        //padding:30/@size 0;
        .orderItem{
          padding:30/@size 30/@size 0 30/@size ;
          display:flex;
          span{
            .font28();
            color:#333;
          }
          .itemValue{
            display: block;
            width:350/@size;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .longValue{
            width:480/@size;
          }
          .itemName{
            color:#666;
            width:140/@size;
            margin-right:50/@size;
            text-align:right;
          }
          .itemStatus{
            position: absolute;
            right:30/@size;
          }
          .hadPaid{
            color:#7aa9ff;
          }
          .hadEffective{
            color:#fd9627;
          }
          .waitPay,.noPass,.noPaid,.end{
            color:#f9736d;
          }
        }
        .orderItem:last-child{
          margin-top:30/@size;
          border-top:1px solid #ececec;
          height:58/@size;
          span{
            color:#777;
          }
          span:first-child{
            margin: -2px 45/@size 0 0;
          }

        }
      }
    }
    .hasNoOrder{
      margin:285/@size auto;
      text-align:center;
      img{
        width:225/@size;
      }
    }
  }
</style>
