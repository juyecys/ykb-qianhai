import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OrderList from '@/views/orderList'
import InsuranceGoods from '@/views/insuranceGoods'
import Hospital from '@/views/hospital'
import SurgicalInsurance from '@/views/surgicalInsurance'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'insuranceGoods',
      component: InsuranceGoods
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/insuranceGoods',
      name: 'insuranceGoods',
      component: InsuranceGoods
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: Hospital
    },
    {
      path: '/surgicalInsurance',
      name: 'surgicalInsurance',
      component: SurgicalInsurance
    },
  ]
})
