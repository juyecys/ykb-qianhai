/**
 * Created by FuxiaoKe on 2018/2/7.
 */
import axios from 'axios';

const getHospitalDataList = async ()=>{
   return await axios.get('/ykb/wp/public/hospital/')
     .then(res=>{
       if(res.data.code === 2000){
         return res.data
       }
     })
     .catch(error=>{
       console.log(error)
     })
}

const submitInsuranceInfo = async (data,source)=>{
  let odata = Object.assign({},data)
  odata.source = source
  return await axios.post('/ykb/wp/private/insure/',odata)
    .then(res=>{
      return res.data
    })
    .catch(error=>{
      console.log(error)
    })
}

const getMyOrderList = async data=>{
  return await axios.get('/ykb/wp/private/order/')
    .then(res=>{
      return res.data
    })
    .catch(error=>{
      console.log(error)
    })
}
const getuserInfo = async ()=>{
  return await axios.get('/ykb/wp/private/user/one')
    .then(res=>{
      return res.data
    })
    .catch(error=>{
      console.log(error)
    })
}
//获取buyInsurance页面的imgs列表
const getInsuranceImg = async()=>{
  let url = '';
  let isWeixin = /micromessenger/.test(navigator.userAgent.toLowerCase())
  if (document.domain.indexOf("192.168") === -1 && isWeixin) {
    url = '/ykb/wp/private/activity/query?name=bdChannel';
  } else {
    url = '/ykb/wp/public/activity/query?name=bdChannel';
  }

  return await  axios.get(url)
    .then(res=>{
        return res.data
    })
    .catch(error => {
      console.log(error)
    })
}

//提交用户基本信息表单
const submitUserInfo = async(params)=>{
  let url = '';
  let isWeixin = /micromessenger/.test(navigator.userAgent.toLowerCase())
  if (document.domain.indexOf("192.168") === -1 && isWeixin) {
    url = '/ykb/wp/private/bduser/';
  } else {
    url = '/ykb/wp/public/bduser/';
  }

  return await  axios.post(url ,params)
    .then(res=>{
      return res.data
    })
    .catch(error => {
      console.log(error)
    })
}
const api = {
  getHospitalDataList,
  submitInsuranceInfo,
  getMyOrderList,
  getuserInfo,
  getInsuranceImg,
  submitUserInfo

}

export default api;
