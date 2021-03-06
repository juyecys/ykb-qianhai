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

const submitInsuranceInfo = async data=>{
  return await axios.post('/ykb/wp/private/insure/',data)
    .then(res=>{
      return res.data
    })
    .catch(error=>{
      console.log(error)
    })
}

const submitInsuranceInfoForQianhai = async data=>{
  return await axios.post('/ykb/wp/private/qianhai/insure',data)
    .then(res=>{
      return res.data
    })
    .catch(error=>{
      console.log(error)
    })
}

const getMyOrderList = async data=>{
  return await axios.get('/ykb/wp/public/order/')
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




const api = {
  getHospitalDataList,
  submitInsuranceInfo,
  submitInsuranceInfoForQianhai,
  getMyOrderList,
  getuserInfo
}

export default api;
