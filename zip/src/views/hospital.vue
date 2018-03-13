<template>
  <div id="hospital">
    <div class="searchHeader">
      <div class="leftPart" @click="toChooseProvince">
        <span>{{provinceName}}</span>
        <img src="../../static/images/icon-bottom-arrow.png" alt="">
      </div>
      <div class="rightPart">
        <div class="searchBox">
          <img src="../../static/images/search.png" alt="">
          <input type="text" v-model="hospitalName" @keyup="searchHospital" placeholder="搜索"/>
        </div>
      </div>
    </div>
    <div class="searchBody">
      <div class="provinceDatas" v-show="isToChooseProvince">
        <ul>
          <li v-for="item in provinceList" :id="item.id" @click="chooseProvince(item.id,item.name)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="provinceDatas" v-show="!isToChooseProvince">
        <ul>
          <li v-for="item in hospitalList" :id="item.id" :provinceId="item.provinceId" @click="chooseHospital(item.id,item.name)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../api/index'
  export default {
    name:'hospital',
    data(){
      return {
        hospitalName:'',
        provinceName:'请选择',
        provinceList:[],
        hospitalList:[],
        isToChooseProvince:true,
        showChooseProvince:true
      }
    },
    mounted(){
      if(window.sessionStorage.getItem('provinceList') !== null){
        if(window.sessionStorage.getItem('provinceId') !==null){
          this.chooseProvince(window.sessionStorage.getItem('provinceId'),window.sessionStorage.getItem('provinceName'))
        }
        this.provinceList = JSON.parse(window.sessionStorage.getItem('provinceList'))
      }else{
        api.getHospitalDataList().then(res=>{
          let datas = res.result,province='['
          for(let i=datas.length-1;i>=0;i--){
            if(province.indexOf(datas[i].provinceId)>-1){
              continue;
            }else{
              province +='{"id":"'+datas[i].provinceId +'","name":"'+datas[i].provinceName+'"},'
            }
          }
          province = province.substring(0,province.length-1)
          province += ']'
          //const pro = new Set(province)
          console.log(JSON.parse(province))
          this.provinceList = JSON.parse(province).reverse()
          window.sessionStorage.setItem('provinceList',province)
          window.sessionStorage.setItem('hospitalList',JSON.stringify(datas))
          console.log(this.provinceList)
        })
      }
    },
    methods:{
      chooseHospital(id,name){
        console.log(name)
        window.sessionStorage.setItem('insuranceOfHospital',name)
        window.sessionStorage.setItem('insuranceOfHospitalCode',id)
        //window.sessionStorage.removeItem('cityId')
        //window.sessionStorage.removeItem('cityName')
        this.$router.push({
          name:'insuranceGoods'
        })
      },
      toChooseProvince(){
        if(this.provinceName !== '请选择'){
          this.isToChooseProvince = !this.isToChooseProvince
        }else{
          this.isToChooseProvince = true
        }

      },
      chooseProvince(id,name){
        console.log(id,name)
        if(window.sessionStorage.getItem(id) !== null){
            this.isToChooseProvince = false
            this.hospitalList = JSON.parse(window.sessionStorage.getItem(id))
            console.log(this.hospitalList)
        }else{
          let hospitalList = JSON.parse(window.sessionStorage.getItem('hospitalList')),
              hospitals = []
          for(let i=hospitalList.length-1;i>=0;i--){
            if(id === hospitalList[i].provinceId){
              hospitals.push({
                provinceId:id,
                id:hospitalList[i].id,
                name:hospitalList[i].name
              })
            }
          }
          setTimeout(()=>{
            this.isToChooseProvince = false
            this.hospitalList = hospitals.reverse()
            window.scrollTo(0,0)
          },100)
          console.log(hospitals)
          window.sessionStorage.setItem(id,JSON.stringify(hospitals))
        }
        this.provinceName = name
        window.sessionStorage.setItem('provinceId',id)
        window.sessionStorage.setItem('provinceName',name)
      },
      searchHospital(){
        console.log(this.hospitalName,this.hospitalList)
        let hospitalList = [],thisHospitalList = this.hospitalList
        if(this.hospitalName !== ''){
          thisHospitalList.map(item=>{
            if(item.name.indexOf(this.hospitalName) >-1){
              hospitalList.push(item)
            }
          })
          this.hospitalList = hospitalList
        }else{
          //console.log(window.sessionStorage.getItem(window.sessionStorage.getItem('cityId')))
          this.hospitalList = JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('provinceId')))
        }

        console.log(this.hospitalName)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../assets/font.less';
  #hospital{
    .searchHeader{
      height:88/@size;
      display: flex;
      align-items:center;
      .font28();
      .leftPart{
        width:150/@size;
        display: flex;
        align-items:center;
        justify-content:space-around;
        padding:0 16/@size;
        box-sizing:border-box;
        img{
         width:25/@size;
        }
        span{
          overflow:hidden;
          text-overflow:ellipsis ;
          white-space: nowrap;
        }
      }
      .rightPart{
        background: #fff;
        width:576/@size;
        display:flex;
        align-items:center;
        height:64/@size;
        input{
          border:none;
          outline:none;
          margin-left:64/@size;

        }
        img{
          height:30/@size;
          position: absolute;
          margin-left:22/@size;
          margin-top:0/@size;
        }
      }
    }
    .searchBody{
      width:100%;
      background-color:#fff;
      //margin-top:10/@size;
      .provinceDatas{
        padding:0 0 0 24/@size ;
      }
      ul{
        li{
          height:88/@size;
          line-height:88/@size;
          border-bottom:1px solid #ececec;
          .font30();
        }
        li:last-child{
          border:none;
        }
      }
    }
  }
</style>
