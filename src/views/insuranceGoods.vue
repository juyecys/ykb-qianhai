<template>
  <div id="insuranceGood">
    <div class="banner">
      <img src="../../static/images/good-banner.png" alt="">
    </div>
    <div class="titleList" ref="titleList">
      <div :class="['titleItem',action===0?'action':'']" @click="changeCon(0)">商品详情</div>
      <div :class="['titleItem',action===1?'action':'']" @click="changeCon(1)">保障计划</div>
      <div :class="['titleItem',action===2?'action':'']" @click="changeCon(2)">下单须知</div>
    </div>
    <div class="insuranceGoodContainer">

      <div class="goodsContainer">
        <div class="goodsDetail" ref="goodsDetail" v-show="true||action==='detail'">
          <img src="../../static/images/goods.png" alt="">
        </div>
        <div class="goodsPlan" ref="goodsPlan" v-show="true||action==='plan'">
          <div class="goodsPanel">
            <div class="goodsHeader">
              易康保·试管婴儿保险
            </div>
            <div class="goodsBody">
              <div class="goodsItem">
                <span class="goodsTitle">保障金额</span>
                <span class="goodsCon">48000元</span>
              </div>
              <div class="goodsItem">
                <span class="goodsTitle">保障期限</span>
                <span class="goodsCon">2年</span>
              </div>
              <div class="goodsItem">
                <span class="goodsTitle">保障移植次数</span>
                <span class="goodsCon">3次</span>
              </div>
              <div class="goodsItem">
                <span class="goodsTitle">适用人群</span>
                <span class="goodsCon">在合法医院做试管婴儿治疗女性，取卵/移植前购买。<em>20~42</em>周岁</span>
              </div>
            </div>
            <div class="goodsFooter">
              <span><em>￥</em>3780</span>元起
            </div>
          </div>
          <div class="goodsTips">
            <em>*</em>
            现在下单，{{dateOfOrderTips}}。
          </div>
        </div>
        <div class="goodsOrder" ref="goodsOrder" v-show="true||action==='order'">
          <div class="knowledgeForOrder">
            <div class="tips">
              下单须知
            </div>
            <div class="knowledgeList">
              <div class="knowledgeItem" v-for="item in goodsQuestion">
                <div class="question">
                  <img src="../../static/images/question.png" alt="">
                  {{item.Q}}
                </div>
                <div class="answer">
                  {{item.A}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buyInsuranceGoods">
        <div class="leftPart" @click="contactKefu">
          <img src="../../static/images/kefu.png" alt="">
          联系客服
        </div>
        <div class="rightPart" @click="showPopUp">
          立即投保
        </div>
      </div>
    </div>
    <div class="popupContainer">
      <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')" height="60%" :hide-on-blur="false" :is-transparent="true">
        <div class="orderInfo">
          <div class="infoHeader">
            试管婴儿保险
            <img src="../../static/images/icon-close.png" alt="" class="closeIcon" @click="hidePopup">
          </div>
          <div class="infoBody">
            <div class="infoItem">
              <div class="leftPart">
                <span class="infoName">保障金额</span>
              </div>
              <div class="rightPart">
                <div :class="['infoForCount',insuranceOfCount===18000?'action':''] " @click="toChooseInsuranceCount(18000)">
                  18000元
                </div>
                <div :class="['infoForCount',insuranceOfCount===28000?'action':'']" @click="toChooseInsuranceCount(28000)">
                  28000元
                </div>
                <div :class="['infoForCount',insuranceOfCount===38000?'action':'']" @click="toChooseInsuranceCount(38000)">
                  38000元
                </div>
                <div :class="['infoForCount',insuranceOfCount===48000?'action':'']" @click="toChooseInsuranceCount(48000)">
                  48000元
                </div>
              </div>
            </div>
            <div class="infoItem">
              <div class="leftPart">
                <span class="infoName">出生日期</span>
              </div>
              <div :class="['rightPart',insuranceOfDateOfBirth===''?'minHeight':'']" @click="toShowDate">
                <datetime
                  :value.sync="insuranceOfDateOfBirth"
                  :min-year="1975"
                  :max-year="1998"
                  :show="showDate"
                  @on-cancel="log('cancel')"
                  @on-change="calculateAge"
                  @on-hide="toHideDate"></datetime>
                <img src="../../static/images/icon-date.png" alt="" class="rightIcon">
              </div>
            </div>
            <div class="infoItem">
              <div class="leftPart">
                <span class="infoName">临床医院</span>
              </div>
              <div :class="['rightPart', insuranceOfHospital==='' ?'minHeight':'']" @click="toChooseHospital">
                {{insuranceOfHospital}}
                <img src="../../static/images/icon-right-arrow.png" alt="" class="rightIcon smallIcon">
              </div>
            </div>
          </div>
          <div class="infoFooter">
            <div class="leftPart">
              价格: <span><em v-show="insuranceOfCountForPay>0">￥</em>{{insuranceOfCountForPay>0?insuranceOfCountForPay:'暂未计算'}}</span>
            </div>
            <div class="rightPart" @click="toSubmitResults($event)">
              立即投保
            </div>
          </div>
        </div>
      </popup>
    </div>
    <alert v-model="showAlert" @on-show="log" @on-hide="log">{{alertText}}</alert>
    <div id="qrCode" v-show="hadNoAuth">
      <img src="../../static/images/qrcode.png" alt="">
      <p>请关注"易康保"公众号后在菜单栏进入页面投保</p>
      <img src="../../static/images/icon-close-white.png" alt="" class="close" @click="closeQrCode(0)">
    </div>
    <div id="qrCode" v-show="contactWithKefu">
      <img src="../../static/images/kefuWX.jpg" alt="">
      <p>扫描二维码，与客服沟通</p>
      <img src="../../static/images/icon-close-white.png" alt="" class="close" @click="closeQrCode(1)">
    </div>
    <div class="mask" v-show="hadNoAuth || contactWithKefu"></div>
  </div>
</template>
<script>
  import {Popup,Datetime,Alert   } from 'vux';
  import goodsQuestion from '../assets/goodsQuestion.json';
  import api from '../api/index';
  import crypto from 'crypto';
  import dateFormat from '../assets/dateFormat';
  export default {
    name:'insuranceGood',
    components:{
      Popup,Datetime,Alert
    },
    data(){
      return {
        contactWithKefu:false,
        hadNoAuth:false,
        action:0,
        dateOfOrderTips:'',
        goodsQuestion:goodsQuestion,
        show:false,
        showDate:false,
        insuranceOfCount:0,
        insuranceOfCountForPay:0,
        insuranceOfDateOfBirth:'',
        insuranceOfHospital:'',
        insuranceOfHospitalCode:'',
        hospitalOfProvince:'',
        realAge:0,
        showAlert:false,
        alertText:'',
        canBuyInsurance:true,
        userId:'',
        navHeight:0,
        tableItemHeight:[]
      }
    },
    mounted(){
      console.log(dateFormat(new Date(),'yyyymmdd','HHmmdd',''),'-----------',window.location.hostname)
      let self = this
      if(window.sessionStorage.getItem('insuranceOfCount') !== null){
        self.userId = window.sessionStorage.getItem('userId')!==null?window.sessionStorage.getItem('userId'):''
        self.hospitalOfProvince = window.sessionStorage.getItem('provinceName')!==null?window.sessionStorage.getItem('provinceName'):''
        self.insuranceOfCount = window.sessionStorage.getItem('insuranceOfCount')-0
        self.insuranceOfDateOfBirth = window.sessionStorage.getItem('insuranceOfDateOfBirth')
        self.insuranceOfCountForPay = window.sessionStorage.getItem('insuranceOfCountForPay')
        self.insuranceOfHospital = window.sessionStorage.getItem('insuranceOfHospital')!==null?window.sessionStorage.getItem('insuranceOfHospital'):''
        self.insuranceOfHospitalCode = window.sessionStorage.getItem('insuranceOfHospitalCode')!==null?window.sessionStorage.getItem('insuranceOfHospitalCode'):''
        window.sessionStorage.removeItem('userId')
        window.sessionStorage.removeItem('insuranceOfCount')
        window.sessionStorage.removeItem('insuranceOfDateOfBirth')
        window.sessionStorage.removeItem('insuranceOfCountForPay')
        window.sessionStorage.removeItem('insuranceOfHospital')
        window.sessionStorage.removeItem('insuranceOfHospitalCode')
        self.show = true
        console.log(self.insuranceOfDateOfBirth)
      }
      if(self.userId === ''){
        api.getuserInfo().then(res=>{
          console.log(res)
          if(res.code === 2000){
            self.userId = res.result.id
          }
        })
      }
      let D = new Date(),H = D.getHours(),M=D.getMinutes(),
        tomorrow = new Date(D.getTime()+1000*60*60*24),
        afterDay = new Date(D.getTime()+1000*60*60*24*2);
      console.log(H,M,tomorrow)
      if(H >=0 && H<21 || (H===21&&M===0)){
        self.dateOfOrderTips = '保单生效时间为'+(tomorrow.getMonth()+1)+'月'+tomorrow.getDate()+'号'
      }else if(H=== 21 && (M<=45)){
        self.dateOfOrderTips = '(预计)保单生效时间为'+(tomorrow.getMonth()+1)+'月'+tomorrow.getDate()+'号'
      }else if(H=== 21 && (M>45&&M<=55)){
        self.dateOfOrderTips = '(预计)保单生效时间为'+(afterDay.getMonth()+1)+'月'+afterDay.getDate()+'号'
      }else if(H>21 || (H===21&&M>55)){
        self.dateOfOrderTips = '保单生效时间为'+(afterDay.getMonth()+1)+'月'+afterDay.getDate()+'号'
      }
      setTimeout(()=>{
        window.scrollTo(0,1)
        let h1=0,
          h2=0,
          h3=0,
          timer=null,
          refs = self.$refs,
          ele = null
        timer = setInterval(()=>{
          h2 = refs.goodsPlan.offsetTop
          if(h2 > 1000){
            h1 = refs.goodsDetail.offsetTop
            h3 = refs.goodsOrder.offsetTop
            ele = document.querySelector('.titleList')
            self.tableItemHeight.push(h1,h2,h3)
            console.log(h1,h2,h3,ele.offsetHeight,self.navHeight)
            self.keepTop(ele,h1,h2,h3,ele.offsetHeight)
            self.navHeight = ele.offsetHeight
            clearInterval(timer)
          }
        },100)
      },300)
    },
    methods:{
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
      closeQrCode(code){
        if(code === 0){
          this.hadNoAuth = false
        }else{
          this.contactWithKefu = false
        }
      },
      keepTop(ele,h1,h2,h3,navHeight){
        console.log(ele)
        let self = this,
          bodyEle = ''
        self.navHeight = navHeight
        if (document.body.scrollTop > 0) {
          bodyEle = document.body
        } else {
          bodyEle = document.documentElement
        }
        let offsetH = ele.offsetTop, bodyEleTop = 0, isIos = false
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          isIos = true
        }
        window.addEventListener('scroll',()=>{
          bodyEleTop = bodyEle.scrollTop
          if (bodyEleTop >= offsetH && !isIos) {
            ele.style.position = 'fixed'
            ele.style.top = 0
          } else if (!isIos) {
            ele.style.position = 'relative'
          }
          if (isIos) {
            if (bodyEle.scrollTop >= h3- navHeight) {
              if (self.action === 2)  return false
              self.action = 2
            } else if (bodyEle.scrollTop >= h2- navHeight) {
              if (self.action === 1)  return false
              self.action = 1
            } else if (self.action !== 0) {
              self.action = 0
            }
          } else{
            if (bodyEle.scrollTop >= h3 - navHeight - 40) {
              if (self.action === 2)  return false
              self.action = 2
            } else if (bodyEle.scrollTop >= h2 - navHeight- 40) {
              if (self.action === 1)  return false
              self.action = 1
            } else if (self.action !== 0) {
              self.action = 0
            }
          }
        })
      },
      toSubmitResults(event){
        if(this.userId === ''){
          this.hadNoAuth = true
          return
        }
        if(this.valueIsNoEmpty(this.insuranceOfCount,'请选择保障金额')){
          console.log(this.insuranceOfCount)
        }else{
          return
        }
        if(this.valueIsNoEmpty(this.insuranceOfDateOfBirth,'请选择您的出生日期')){
          console.log(this.insuranceOfCount)
        }else{
          return
        }
        if(this.valueIsNoEmpty(this.insuranceOfHospital,'请选择医院')){
          console.log(this.insuranceOfCount)
        }else{
          return
        }
        let obj = {
              "userId": this.userId,
              "insuranceAmount": this.insuranceOfCount,
              "dateOfBirth": this.insuranceOfDateOfBirth.replace(/-/g,''),
              "hospitalCode": this.insuranceOfHospitalCode,
              "hospitalName": this.insuranceOfHospital,
              "provinceName":this.hospitalOfProvince,
              "trialPremium": this.insuranceOfCountForPay,
              "reqTime":dateFormat(new Date(),'yyyymmdd','HHmmdd','')
            },
          key = window.location.hostname === 'staging.chengyisheng.com.cn'?'29F802572E8D4D9E90E9EBBEA51CEB58':'63F0C27BE5D54DBE8DD40F88035F8C64'

        obj.sign = this.md5(obj,key)
        obj.actionType = "entry"
        console.log(obj)
        let myObj = {
          "insuranceAmount":obj.insuranceAmount,
          "birthday":this.insuranceOfDateOfBirth,
          "hospitalName":obj.hospitalName,
          "hospitalId":obj.hospitalCode,
          "orderAmount":obj.trialPremium,
          "userId":obj.userId
        }
        console.log(myObj)
        let actionUrl = window.location.hostname === 'staging.chengyisheng.com.cn'?'http://wxsaleuat.qhins.com/wcthl/third/entry/ykb/tubebaby/entry/':'https://wxsale.qhins.com/wcthl/third/entry/ykb/tubebaby/entry/'
        console.log(window.location.hostname,window.location.hostname === 'staging.chengyisheng.com.cn',actionUrl)

        api.submitInsuranceInfo(myObj)
          .then(res=>{
          if(this.hadNoAuth || res.code === '4001'){
            this.show = false
            this.hadNoAuth = true
            return
          }
          this.jsForm(event,obj,actionUrl)
        })
          .catch(error=>{
          console.log(error)
          this.jsForm(event,obj,actionUrl)
        })
      },
      valueIsNoEmpty(value,msg){
        if((typeof value==='number' && value !==0) || (typeof value==='string' && value !=='')){
          return true
        }else{
          this.showAlert = true
          this.alertText = msg
          return false
        }
      },
      hidePopup(){
        this.show = false
      },
      calculatePayCount(){
        let count =0,realAge=this.realAge,ageLevel=0,countLevel=this.insuranceOfCount / 1000 - 8
        console.log(countLevel)
        if(realAge>=20&&realAge<=34){
          ageLevel = 1
          this.canBuyInsurance = true
        }else if(realAge>=35&&realAge<=37){
          ageLevel = 2
          this.canBuyInsurance = true
        }else if(realAge>=38&&realAge<=42){
          ageLevel = 3
          this.canBuyInsurance = true
        }else{
          this.alertText = ' 您的年龄不符合要求，请检查！'
          //this.insuranceOfDateOfBirth = ''
          this.showAlert = true
          this.canBuyInsurance = false
        }
        switch(ageLevel+countLevel){
          case 11:count=3780;break;
          case 12:count=4150;break;
          case 13:count=5670;break;
          case 21:count=5880;break;
          case 22:count=6456;break;
          case 23:count=8820;break;
          case 31:count=7980;break;
          case 32:count=8761;break;
          case 33:count=11970;break;
          case 41:count=10080;break;
          case 42:count=11067;break;
          case 43:count=15120;break;
        }
        this.insuranceOfCountForPay = count;
      },
      iosDate(val){
        if(Number(val) !== NaN){
          return Number(val)
        }else{
          return
        }

      },
      calculateAge(){
        setTimeout(()=>{
          console.log(document.querySelector('.vux-cell-value').innerHTML)
          this.insuranceOfDateOfBirth = document.querySelector('.vux-cell-value').innerHTML
          let D = new Date(),
            Y=D.getFullYear(),
            b = (this.insuranceOfDateOfBirth + ' 00:00:00').split(' ')[0].split('-'),
            bDate = b[0]+'/'+ b[1]+'/'+b[2],
            B = new Date(bDate).getTime(),
            further =Y+'/'+ b[1]+'/'+b[2],
            n=new Date(further).getTime(),
            realAge=( n - B )/(1000*60*60*24*365)|0;
          if(D.getTime() - B < n-B  ){//现在的时间戳-生日时间戳<今年生日的时间戳-生日时间戳,证明今年生日未过，周岁-1
            realAge -=1
          }
          if(!(realAge>=20 && realAge<=42)){
            this.alertText = ' 您的年龄不符合要求，请检查！'
            //this.insuranceOfDateOfBirth = ''
            this.showAlert = true
            this.canBuyInsurance = false
            this.$nextTick(()=>{
              this.insuranceOfDateOfBirth = ''
            })
          }
          this.realAge = realAge
          if(this.insuranceOfCount !==0){
            this.calculatePayCount()
          }
          console.log(realAge,'周岁',this.insuranceOfDateOfBirth)
        },100)
      },
      toChooseInsuranceCount(count){
        this.insuranceOfCount = count
        if(this.insuranceOfDateOfBirth !==''){
          this.calculatePayCount()
        }
      },
      toChooseHospital(){
        if(this.userId !== ''){
          window.sessionStorage.setItem('userId',this.userId)
        }
        window.sessionStorage.setItem('insuranceOfCount',this.insuranceOfCount)
        window.sessionStorage.setItem('insuranceOfCountForPay',this.insuranceOfCountForPay)
        window.sessionStorage.setItem('insuranceOfDateOfBirth',this.insuranceOfDateOfBirth)
        this.$router.push({
          name:'hospital'
        })
      },
      toHideDate(){
        this.showDate = false
      },
      toShowDate(){
        if(!this.showDate) this.showDate = true
      },
      showPopUp(){
        if(this.userId === ''){
          this.hadNoAuth = true
          return
        }
        this.show  =true
      },
      log(msg){
        console.log(msg)
      },
      changeCon(con){
        let refs = this.$refs,
          topArr= this.tableItemHeight,
          isIos =false
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          isIos = true
        }
        if(isIos){
          window.scrollTo(0,topArr[con]-this.navHeight);
        }else{
          window.scrollTo(0,topArr[con]-this.navHeight-40);
        }

        this.action = con
      },
      contactKefu(){
        this.contactWithKefu = true
        //window.location.href='tel:400-061-8989'
      }
    }

  }
</script>
<style lang="less" scoped>
  @import '../assets/font.less';
  #qrCode{
    position: fixed;
    top:20%;
    z-index:100;
    left:50%;
    transform:translate(-50%,0);
    background: #fff;
    width:560/@size;
    padding:30/@size;
    box-sizing:border-box;
    border-radius:6/@size;
    text-align:center;
    p{
      .font30();
      padding:10/@size;
    }
    img{
      width:400/@size;
      height:400/@size;
    }
    .close{
      width:50/@size;
      height:50/@size;
      position: absolute;
      margin-top:40px;
      margin-left:-30/@size;
    }
  }
  .mask{
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color: rgba(0,0,0,.5);
    z-index:99;
  }
  .rightPart .weui-cell_access .weui-cell__ft:after{
    content:'';
    border-color:#fff;
  }
  .orderInfo{
    height:100%;
    width:100%;
    background: #fff;
    .infoHeader{
      height:90/@size;
      line-height:90/@size;
      text-align: center;
      color:#333;
      .font30();
      font-weight:bold;
      border-bottom:1px solid #ececec;
      .closeIcon{
        position: absolute;
        right:30/@size;
        width:25/@size;
        height:25/@size;
        margin-top:30/@size;
      }
    }
    .infoBody{
      .infoItem{
        display: flex;
        min-height:90/@size;
        align-items:center;
        justify-content: space-between;
        border-bottom:1px solid #ececec;
        .font30();
        .leftPart{
          width:150/@size;
          padding:0 30/@size;
          color:#666;
        }
        .rightPart{
          display: flex;
          width:600/@size;
          position:relative;
          color:#333;
          .weui-cell{
            padding:0;
          }
          .vux-cell-value{
            color:#333;
          }
          .action{
            color:#fff;
            background: #fd9627;
            border-color:#fd9627;
          }
          .rightIcon{
            position: absolute;
            right:30/@size;
            top:50%;
            transform:translate(0,-50%);
            width:42/@size;
          }
          .smallIcon{
            width:24/@size;
          }
        }
        .minHeight{
          min-height:80/@size;
        }
        .infoForCount{
          height:74/@size;
          line-height:74/@size;
          text-align:center;
          width:160/@size;
          border-radius:8/@size;
          border:1px solid #ececec;
          margin:24/@size 16/@size 0 0;
          .font30();
          color:#333;
        }
        .infoForCount:last-child{
          margin-bottom:32/@size;
        }
      }
      .infoItem:first-child .rightPart{
        flex-wrap: wrap;
      }
    }
    .infoFooter{
      position: absolute;
      bottom:0;
      display: flex;
      justify-content:space-between;
      align-items: center;
      height:100/@size;
      .leftPart{
        width:434/@size;
        height:100/@size;
        line-height:100/@size;
        padding:0 30/@size;
        box-sizing: border-box;
        border-top:1px solid #ececec;
        font-size:30/@size;
        span{
          color:#fd9627;
          font-size:40/@size;
          margin-left:10/@size;
        }
        em{
          font-style: normal;
          font-size:24/@size;
        }
      }
      .rightPart{
        width:316/@size;
        text-align: center;
        background: url(../../static/images/bg-btn.png) no-repeat;
        background-size: cover;
        height:100/@size;
        line-height:100/@size;
        color:#fff;
        .font30();
      }
    }
  }
  #insuranceGood{
    .banner{
      width:100%;
      height:320/@size;
      background-color:#fff;
      img{
        width:100%;
        height:100%;
      }
    }
  .titleList{
     background-color: #fff;
     height:88/@size;
     width:100%;
     display:flex;
     justify-content:space-around;
     align-items:center;
     border-bottom:1px solid #ececec;
     position:-webkit-sticky;
     top:0;
     z-index:99;
   .font30();
    .titleItem{
      color:#666;
    }
    .action{
      color:#fd9627;
      position: relative;
    }
    .action:after{
      content:'';
      position: absolute;
      width:64/@size;
      height:4/@size;
      background: #fd9627;
      bottom:-22/@size;
      left:50%;
      transform:translate(-50%,0);
      -webkit-border-radius:;
      -moz-border-radius:;
      border-radius:4/@size;
    }
  }
    .insuranceGoodContainer{
      .goodsContainer{
        margin-top:24/@size;
        margin-bottom:124/@size;
        .goodsDetail{
          width:100%;
          img{
            width:100%;
          }
        }
        .goodsPlan{
          width:100%;
          height:100%;
          background-color:#fff;
          overflow:hidden;
          .goodsPanel{
            width:700/@size;
            margin:25/@size auto;
            border-radius:5/@size;
            box-shadow:0 5px 15px #ddd;
            float:left;
            margin-left:50%;
            transform:translate(-50%,0);
          }
          .goodsHeader{
            height:80/@size;
            line-height:80/@size;
            background-color: #fd9627;
            text-align: center;
            color:#fff;
            border-radius:5/@size;
            .font32();
          }
          .goodsBody{
            padding:0 24/@size;
            .font30();
            .goodsItem{
              margin-top:44/@size;
              display: flex;
              justify-content:space-between;
              .goodsTitle{
                color:#999;
              }
              .goodsCon{
                max-width: 480/@size;
                color:#333;
                em{
                  font-style: normal;
                  color:#7aa9ff;
                }
              }
            }
          }
          .goodsFooter{
            margin:24/@size 24/@size 0 24/@size;
            height:88/@size;
            line-height:88/@size;
            text-align:right;
            border-top:1px solid #ececec;
            font-size: 30/@size;
            span{
              color:#fd9627;
              font-size: 40/@size;
              margin-right:20/@size;
              font-weight: bold;
              em{
                font-style: normal;
                font-size:20/@size;
              }
            }
          }
          .goodsTips{
            padding:16/@size 24/@size 48/@size 24/@size;
            float:left;
            em{
              color:#7aa9ff;
            }
            .font28();
            color:#999;
          }
        }
        .goodsOrder{
          width:100%;
          height:100%;
          background: #fff;
          .tips{
            height:80/@size;
            line-height:80/@size;
            text-align:center;
            background: #fff2e5;
            .font30();
            color:#666;
          }
          .knowledgeList{
            padding:32/@size 24/@size;
            .knowledgeItem{
              color:#666;
              margin-bottom:72/@size;
              .font30();
              .question{
                display: flex;
                //align-items: center;
                font-weight: bold;
                margin-bottom:24/@size;
                img{
                  width:36/@size;
                  height:36/@size;
                  //margin-top:5/@size;
                  margin-right:16/@size;
                }
              }
              .answer{
                margin-left:55/@size;
              }
            }
          }
        }
      }
    }
    .footer{
      position:fixed;
      bottom:0;
      height:100/@size;
      width:100%;
      background-color:#fff;
      border-top:1px solid #ececec;
      .buyInsuranceGoods{
        display: flex;
        justify-content:space-between;
        align-items:center;
        text-align:center;
        color:#333;
        height:100%;
        .font32();
        .leftPart{
          width:250/@size;
          img{
            width:28/@size;
            height:30/@size;
          }
        }
        .rightPart{
          width:500/@size;
          height:100%;
          line-height:105/@size;
          background: url(../../static/images/bg-btn.png) no-repeat;
          background-size: cover;
          color:#fff;
        }
      }
    }
  }
</style>
