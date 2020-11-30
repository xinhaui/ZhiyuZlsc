<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 内容 -->
    <div class="message_body">
      <van-cell-group>
        <van-field v-model="group.value1" :label="$t('lang.addRess.addRessWd')" :placeholder="$t('lang.addRess.addRessWds')" />
        <van-field v-model="group.value2" :label="$t('lang.addRess.addRessLx')" :placeholder="$t('lang.addRess.addRessLxs')" />
        <van-field v-model="group.value3" :label="$t('lang.addRess.addRessXx')" :placeholder="$t('lang.addRess.addRessXxs')" /> 
        <van-field v-model="group.value6" :label="$t('lang.addRess.addRessDq')" :placeholder="$t('lang.addRess.addRessDqs')" />
        <van-field v-model="group.value4" :label="$t('lang.addRess.addRessCs')" :placeholder="$t('lang.addRess.addRessCss')" />
        <!-- <van-field v-model="group.value5" label="省份" placeholder="请输入省份" /> -->
        <van-field v-model="group.value7" :label="$t('lang.addRess.addRessGj')" :placeholder="$t('lang.addRess.addRessGjs')" />
        <van-cell center :title="$t('lang.defaultAddress')">
          <template #right-icon>
            <van-switch v-model="checked" size="24" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 底部按钮 -->
    <div class="message_bottom_button"> 
        <van-button type="danger" block @click="newRess">{{$t('lang.Agregar')}}</van-button>
        <van-button type="default" color="#999" block @click="onClickLeft">{{$t('lang.Cancel')}}</van-button>
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
        bar:this.$t('lang.shipping.shippingXz')
      },
      group:{
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
      },
      checked:false,
      getUser:'',
    }
  },
  created(){
    this._Aiosx()
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
   _Aiosx(){
     var url = '/cloud/oms/bs/info/order/OrderHandler?op=getUser';
      var temp = { };
      // console.log(temp)
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            this.getUser = result.data.id
        }
      })
   },
   newRess(){
      var receive_user = this.group.value1
      var phone_num = this.group.value2
      var detail_address = this.group.value3
      var city = this.group.value4
      var area = this.group.value6
      var country = this.group.value7
      if(this.checked == true){
        var is_def = 1
      }else{
        var is_def = 0
      }
      var user_entity = this.getUser
      var url = '/app?op=Add&cloud=bs_address';
      var temp = { receive_user,phone_num,detail_address,city,area,country,is_def,user_entity };
      // console.log(temp)
      if(receive_user.split(' ').join('').length == 0||phone_num.split(' ').join('').length == 0||detail_address.split(' ').join('').length == 0){
        Toast.fail(this.$t('lang.completa'));
      }else{
        Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
              Toast.success(this.$t('lang.myRess'));
          }
        })
      }
      
   }
  }
}
</script>
<style scoped>

</style>