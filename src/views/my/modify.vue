<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 内容 -->
    <div class="message_body">
      <van-cell-group>
        <van-field v-model="group.value1" :label="$t('lang.order.orderSh')" :placeholder="$t('lang.addRess.addRessWds')" />
        <van-field v-model="group.value2" :label="$t('lang.addRess.addRessLx')" :placeholder="$t('lang.addRess.addRessLxs')" />
        <van-field v-model="group.value3" :label="$t('lang.addRess.addRessXx')" :placeholder="$t('lang.addRess.addRessXxs')" /> 
        <!-- <van-field v-model="group.value5" label="省份" placeholder="请输入省份" /> -->
        <van-field v-model="group.value6" :label="$t('lang.addRess.addRessDq')" :placeholder="$t('lang.addRess.addRessDqs')" />
        <van-field v-model="group.value4" :label="$t('lang.addRess.addRessCs')" :placeholder="$t('lang.addRess.addRessCss')" />
        <van-field v-model="group.value7" :label="$t('lang.addRess.addRessGj')" :placeholder="$t('lang.addRess.addRessGjs')" />
        <!-- <van-field v-model="group.value8" :label="$t('lang.addRess.addRessYx')" :placeholder="$t('lang.addRess.addRessYxs')" /> -->
        <van-cell center :title="$t('lang.defaultAddress')">
          <template #right-icon>
            <van-switch v-model="checked" size="24" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 底部按钮 -->
    <div class="message_bottom_button"> 
        <van-button type="danger" block @click="newRess">{{$t('lang.preservation')}}</van-button>
        <van-button type="default" color="#999" block @click="onClickdelete">{{$t('lang.delete')}}</van-button>
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
        bar:this.$t('lang.addRess.addRessXgshdz')
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
      },
      checked:false,
      
    }
  },
  created(){
      this.idName = this.$route.query.modify;
      this._Aiosx()
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
   _Aiosx(){
    var idName = this.idName
    var url = '/cloud/oms/bs/info/order/OrderHandler?op=ModifyAddress';
    var temp = { id:idName };
    Action.Ajax(url, temp, result => {
      if (result.code != 200) {
          // this.$toast.fail(result.remark);
          return;
      } else {
          console.log(result)
          this.group.value1 = result.data.receive_user
          this.group.value2 = result.data.phone_num
          this.group.value3 = result.data.detail_address
          this.group.value4 = result.data.city.key_name
          // this.group.value5 = result.data.city
          this.group.value6 = result.data.area.key_name
          this.group.value7 = result.data.country.key_name
          if(result.data.is_def.id == 0){
              this.checked = false
          }else{
              this.checked = true
          }
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
      // var email_address = this.group.value7
      if(this.checked == true){
        var is_def = 1
      }else{
        var is_def = 0
      }
      var id = this.idName
      var url = '/app?op=Modify&cloud=bs_address';
      var temp = { receive_user,phone_num,detail_address,city,area,country,is_def,id };
      // console.log(temp)
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            Toast.success(this.$t('lang.myRess'));
            setTimeout(() => {
              this.$router.go(-1)
            }, 2000)
        }
      })
   },
   onClickdelete(){
     var idName = this.idName
     var url = '/app?op=Delete&cloud=bs_address';
      var temp = {id:idName };
      // console.log(temp)
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            Toast.success(this.$t('lang.deleteSuccess'));
        }
      })
   }
  }
}
</script>
<style scoped>

</style>