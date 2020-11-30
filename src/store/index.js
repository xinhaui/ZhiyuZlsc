import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        name:'helloVueX',
        goodk:0,
        receive_user:'',//用户名称
        phone_num:'',//电话号码
        detail_address:'',//详细地址
        CommodityOrder:'',
        CommodityUserId:'',//客户ID
        CommodityUserAddress:'',//客户地址ID
        judgeUser:'', //判断业务员如何进入客户信息
        judgeJinlai:'',
        moreQuota:'',//每月剩余额度
    },
    mutations: {
      // 使用 在使用的方法内自定义方法 第一个是vuex中的方法名第二个是要传的值
      // one(){
      //   this.$store.commit('add',1) 
      // },
      add(state,num){
        state.goodk+=num;
      },
      sub(state){
        state.goodk--
      }
    }
})

export default store