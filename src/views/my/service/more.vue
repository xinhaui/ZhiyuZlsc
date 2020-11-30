<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 内容 -->
    <div class="more_body">
      <div><span>{{$t('lang.more.moreMc')}}</span> <span>{{more.key_name}}</span></div>
      <div><span>{{$t('lang.addRess.addRessLx')}}</span> <span>{{more.phone_num}}</span></div>
      <div><span>{{$t('lang.more.moreSh')}}</span> <span>{{more.tax_num}}</span></div>
      <div><span>{{$t('lang.addRess.addRessYy')}}</span> <span>{{more.scope}}</span></div> 
      <div><span>{{$t('lang.addRess.addRessXx')}}</span> <span>{{more.detail_address}}</span></div>
      <div><span>{{$t('lang.addRess.addRessDq')}}</span> <span>{{more.area}}</span></div>
      <div><span>{{$t('lang.addRess.addRessCs')}}</span> <span>{{more.city}}</span></div>
      <!-- <div><span>{{$t('lang.addRess.addRessSf')}}</span> <span>1</span></div> -->
      <div><span>{{$t('lang.addRess.addRessYx')}}</span> <span>{{more.email_address}}</span></div> 
      <div><span>{{$t('lang.more.moreZk')}}</span> <span>{{more.discount_rate}}</span></div>
      <div><span>{{$t('lang.more.moreMy')}}</span> <span>{{more.month_cost}}</span></div>
      <div><span>{{$t('lang.more.moreBy')}}</span> <span>{{more.sycost}}</span></div>
    </div>
    <!-- 按钮 -->
    <div class="more_button">
        <van-button type="primary" :disabled='buttonYerOfno' @click="onShou" >{{$t('lang.more.moreXw')}}</van-button>
        <van-button type="primary" @click="onClickLeft">{{$t('lang.Retuen')}}</van-button>
    </div>
  </div>
</template>
<script>
import {Action,Native,Http} from "@/lib/maui.min.js"
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.more.moreTop')
      },
      more:{
        id:'',
        key_name:'',
        phone_num:'',
        tax_num:'',
        scope:'',
        detail_address:'',
        email_address:'',
        discount_rate:'',
        month_cost:'',
        sycost:'',
        city:'',
        area:'',
        buttonYerOfno:true
      },
    }
  },
  created(){
    this.more.id = this.$route.query.searchId;
    this._Aiosx()
    this._getRessd()
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
   _Aiosx(){
    //  判断业务员怎么进入此页面
    var yesOfno = this.$store.judgeUser
    if(yesOfno == 2){
      this.buttonYerOfno = true
    }
    if(yesOfno == 1){
      this.buttonYerOfno = false
    }
    //  页面数据
    var url = '/cloud/oms/bs/info/sys/CompanyHandler?op=CustomerInfo';
    var temp = { id:this.more.id };
    Action.Ajax(url, temp, result => {
      if (result.code != 200) {
          // this.$toast.fail(result.remark);
          return;
      } else {
          console.log(result)
            this.more.key_name = result.data.key_name
            this.more.phone_num = result.data.phone_num
            this.more.tax_num = result.data.tax_num
            if(result.data.tax_num.length != 0){
                this.more.tax_num = result.data.tax_num
            }else{
                this.more.tax_num = '  '
            }
            this.more.scope = result.data.scope
            this.more.detail_address = result.data.detail_address
            this.more.email_address = result.data.email_address
            this.more.discount_rate = result.data.discount_rate
            this.more.month_cost = result.data.month_cost
            this.more.sycost = result.data.sycost
            this.more.city = result.data.city
            this.more.area = result.data.area
      }
    })
   },
    onShou(){
      this.$store.CommodityUserId = this.more.id
      this.$store.receive_user = this.more.key_name
      this.$store.phone_num = this.more.phone_num
      this.$store.detail_address = this.more.detail_address
      this.$store.moreQuota = this.more.sycost
      this.$store.judgeJinlai = 'yesName'
      this.$router.push({path:'/order'})
    },
    _getRessd(){
      var customer_entity = this.more.id;
      var url = '/cloud/oms/bs/info/sys/CompanyHandler?op=CustomerAddress';
      var temp = { customer_entity };
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            this.$toast.fail(this.$t('lang.Errordered'));
            return;
        } else {
            console.log(result)
            this.$store.CommodityUserAddress = result.data.id
        }
      })
    }
  }
}
</script>
<style scoped>
.more_body{width: 96%;margin: 1rem auto;font-size: .7rem;}
.more_body div{height: 2.5rem;line-height: 2.5rem;}
.more_body div span:nth-child(1){display: inline-block;width: 32%;text-align: left;}
.more_body div span:nth-child(2){margin-left: 2%;}
.more_button{width: 96%;margin: 0 auto;}
.more_button button:nth-child(1){background: red;border: red 1px solid;}
.more_button button{width: 48%;font-size: 1.1rem;border-radius: .5rem;height: 2.3rem;}
</style>