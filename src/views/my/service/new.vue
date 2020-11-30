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
        <van-field v-model="group.value7" :label="$t('lang.addRess.addRessComuna')" :placeholder="$t('lang.addRess.addRessComunas')" />
        <van-field v-model="group.value6" :label="$t('lang.addRess.addRessCs')" :placeholder="$t('lang.addRess.addRessCss')" />
        <van-field v-model="group.value8" :label="$t('lang.addRess.addRessGj')" :placeholder="$t('lang.addRess.addRessGjs')" />
        <van-field v-model="group.value9" :label="$t('lang.addRess.addRessYx')" :placeholder="$t('lang.addRess.addRessYxs')" />
      </van-cell-group>
    </div>
    <!-- 底部按钮 -->
    <div class="message_bottom_button"> 
        <van-button type="danger" block @click="onSubmit">{{$t('lang.Agregar')}}</van-button>
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
        bar:this.$t('lang.more.newTop')
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
        value9:''
      }
    }
  },
  created(){
    // this._Aiosx()
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
   onSubmit(){
      var url = '/app?op=Add&cloud=bs_customer';
      var temp = { 
        key_name:this.group.value1,phone_num:this.group.value2,tax_num:this.group.value3,
        scope:this.group.value4,detail_address:this.group.value5,city:this.group.value6,
        area:this.group.value7,country:this.group.value8,email_address:this.group.value9,
       };
       
       if(this.group.value1 == ''||this.group.value2 == ''||this.group.value3 == ''||this.group.value4 == ''||this.group.value5 == ''||this.group.value5 == ''||this.group.value6 == ''||this.group.value7 == ''||this.group.value8 == ''||this.group.value9  == ''||this.group.value9.split(' ').join('').length == 0){
         Toast.fail(this.$t('lang.completa'));
       }else{
        Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              this.$toast.fail('lang.placeNew');
              return;
          } else {
              // Toast.success(this.$t('lang.placeNew'));
              this.$router.go(-1)
          }
        })
       }
      
   },
  }
}
</script>
<style scoped>

</style>