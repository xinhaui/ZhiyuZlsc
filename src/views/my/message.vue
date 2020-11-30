<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 内容 -->
    <div class="message_body">
      <van-cell-group>
        <van-field v-model="group.value1" :label="$t('lang.addRess.addRessWd')" :placeholder="$t('lang.addRess.addRessWds')" />
        <van-field v-model="group.value2" :label="$t('lang.addRess.addRessLx')" :placeholder="$t('lang.addRess.addRessLxs')" />
        <van-field v-model="group.value3" :label="$t('lang.addRess.addRessSh')" :placeholder="$t('lang.addRess.addRessShs')" />
        <van-field v-model="group.value4" :label="$t('lang.addRess.addRessYy')" :placeholder="$t('lang.addRess.addRessYys')" />
        <van-field v-model="group.value5" :label="$t('lang.addRess.addRessXx')" :placeholder="$t('lang.addRess.addRessXxs')" />
        <van-field v-model="group.value8" :label="$t('lang.addRess.addRessDq')" :placeholder="$t('lang.addRess.addRessDqs')" />
        <van-field v-model="group.value6" :label="$t('lang.addRess.addRessCs')" :placeholder="$t('lang.addRess.addRessCss')" />
        <van-field v-model="group.value7" :label="$t('lang.addRess.addRessGj')" :placeholder="$t('lang.addRess.addRessGjs')" />
      
        <van-field v-model="group.value9" :label="$t('lang.addRess.addRessYx')" :placeholder="$t('lang.addRess.addRessYxs')" />
      </van-cell-group>
    </div>
    <!-- 底部按钮 -->
    <div class="message_bottom_button"> 
        <van-button type="danger" block @click="changeNews">{{$t('lang.Confirmar')}}</van-button>
        <van-button type="primary" block @click="onClickLeft">{{$t('lang.Retuen')}}</van-button>
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
        bar:this.$t('lang.addRess.addRessWdxx')
      },
      group:{
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        id:'',
      }
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
      var url = '/cloud/oms/bs/info/sys/CompanyHandler?op=findMe';
      var temp = { };
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            console.log(result)
            this.group.value1 = result.data.key_name
            this.group.value2 = result.data.phone_num
            this.group.value3 = result.data.tax_num
            this.group.value4 = result.data.scope
            this.group.value5 = result.data.detail_address
            this.group.value6 = result.data.city
            this.group.value7 = result.data.country
            this.group.value8 = result.data.area
            this.group.value9 = result.data.email_address
            this.group.id = result.data.id
        }
      })
   },
    changeNews(){
      var url = '/app?op=Modify&cloud=bs_customer';
      var temp = { 
        id:this.group.id,
        key_name:this.group.value1,
        phone_num:this.group.value2,
        tax_num:this.group.value3,
        scope:this.group.value4,
        detail_address:this.group.value5,
        area:this.group.value8,
        city:this.group.value6,
        country :this.group.value7,
        email_address:this.group.value9,
       };
       console.log(temp)
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
</script>
<style scoped>

</style>