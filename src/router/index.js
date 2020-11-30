import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import {DevMenu, DevPay, DevServer} from '@/lib/maui.min.js'
import {Agreement, MainPage, HomePage, ListPage, TabListPage, MenuPage, FormPage, TodoPage, UserPage, Password,ShortCut,Punch, Setting, Upgrade, Test, NavTitle} from '@/lib/maui.min.js'
import Home from '@/views/home/home'
import Login  from '@/page/Login'
import Details from '@/views/home/details'
import Search from '@/views/home/search'
import Cart from '@/views/cart/cart'
import Type from '@/views/type/type'
import Order from '@/views/type/order'
import Submit from '@/views/type/submit'
import Contact from '@/views/contact/contact'
import ContactIndex from '@/views/contact/index'
import My from '@/views/my/my'
import myDetails from '@/views/my/details'
import Message from '@/views/my/message'
import Address from '@/views/my/address'
import NewAddress from '@/views/my/newAddress'
import Shipping from '@/views/my/shipping'
import History from '@/views/my/history'
import Modify from '@/views/my/modify'
import ServuceSearch from '@/views/my/service/search'
import ServuceNew from '@/views/my/service/new'
import ServuceMore from '@/views/my/service/more'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:App
    },
    {
      path: '/login',
      component: Login
    },{
      path:'/agreement',
      component:Agreement
    },{
      path: '/main',
      component: Home,
      children:[
        {
          path: '/home',
          component: Home
        },
        {
          path: '/menu',
          component: MenuPage
        },
        {
          path: '/todo',
          component: TodoPage
        },
      ]
    }, { path: '/shortcut', component: ShortCut },
    {
      path: '/list',
      component: ListPage
    }, {
      path:'/tablist',
      component:TabListPage   
    },
    {
      path: '/form',
      component: FormPage
    },
    { path: '/user', component: UserPage },
    { path: '/password', component: Password },
    { path: '/setting', component: Setting },
    { path: '/upgrade', component: Upgrade },
    { path: '/punch', component: Punch },
    { path: '/test', component: Test },
    { path: '/shortcut', component: ShortCut },
    { path: '/NavTitle', component: NavTitle },
    { path: '/dev/menu', component: DevMenu },
    { path: '/dev/pay', component: DevPay },
    { path: '/dev/server', component: DevServer },
    { path: '/details', component: Details },
    { path: '/cart', component: Cart },
    { path: '/type', component: Type },
    { path: '/search', component: Search },
    { path: '/order', component: Order },
    { path: '/submit', component: Submit },
    { path: '/contact', component: Contact },
    { path: '/index', component: ContactIndex },
    { path: '/my', component: My },
    { path: '/myDetails', component: myDetails },
    { path: '/message', component: Message },
    { path: '/address', component: Address },
    { path: '/newAddress', component: NewAddress },
    { path: '/shipping', component: Shipping },
    { path: '/history', component: History },
    { path: '/modify', component: Modify },
    { path: '/mySearch', component: ServuceSearch },
    { path: '/myNew', component: ServuceNew },
    { path: '/myMore', component: ServuceMore },
  ]
})
