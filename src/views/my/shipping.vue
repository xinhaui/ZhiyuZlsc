<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 内容 -->
    <div class="shipping_body" v-for="(itme,index) of list" :key="index">
        <div class="shipping_body_s">
          <div @click="one(itme)">
            <span>{{$t('lang.order.orderSh')}}：</span>{{itme.receive_user}}
            <span class="shipping_body_m" v-if="itme.is_def == 1">{{$t('lang.shipping.shippingMr')}}</span>
          </div>
          <div @click="one(itme)"><span>{{$t('lang.order.orderLx')}}：</span>{{itme.phone_num}}</div>
          <div><span>{{$t('lang.order.orderDz')}}：</span>{{itme.detail_address}}</div>
          <div class="shipping_body_Y">
             <button @click="ofButton(itme.id)">{{$t('lang.Ress')}}</button>
          </div>
        </div>
    </div>
    <!-- 底部按钮 -->
    <div class="message_bottom_button"> 
        <van-button type="danger" block @click="onNewAddress">{{$t('lang.shipping.shippingXz')}}</van-button>
        <van-button type="info" block @click="onClickLeft">{{$t('lang.Retuen')}}</van-button>
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
        bar:this.$t('lang.shipping.shippingTop')
      },
      list:[]
    }
  },
  created(){
    this._Aiosx()
    this.modifyId = this.$route.query.modifyId;
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
   onNewAddress(){
     // 判断业务员of用户
       var url = '/cloud/oms/bs/info/order/OrderHandler?op=getUser';
       var temp = { };
       Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
              console.log(result)
              if(result.data.type.id == 1){
                this.$router.push({path:'/myNew'})
              }
              if(result.data.type.id == 2){
                this.$router.push({path:'/newAddress'})
              }
          }
      })
   },
   ofButton(id){
     this.$router.push({path:'/modify',query:{modify:id}})
   },
   one(res){
     this.$router.push({path:'/order',query:{bs_shop:this.modifyId}})
    console.log(res)
     this.$store.judgeJinlai = 'yesName'
     this.$store.receive_user = res.receive_user
     this.$store.phone_num = res.phone_num
     this.$store.detail_address = res.detail_address
     this.$store.CommodityUserAddress = res.id
   },
   _Aiosx(){
      var url = '/cloud/oms/bs/info/order/OrderHandler?op=findAddress';
      var temp = { };
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            console.log(result)
            this.list = result.rows
        }
      })
   }
  }
}
</script>
<style scoped>
.shipping_body_Y{text-align: right;}
</style>