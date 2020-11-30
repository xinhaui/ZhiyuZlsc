<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar"></van-nav-bar>
      <div class="contact_img">
        <div class="contact_img_s" v-if="imgayytr">
          <img :src="array.imgayLogo" @click="showDev">
          <!-- <van-image round width="40" height="40" :src="userinfo.avatar"/> -->
        </div>
        <div class="contact_img_s" v-else>
          <img :src="array.imgays">
        </div>
        <div class="contact_text">
          <div>{{keyname}}</div>
          <div>{{$t('lang.contact.contactYin')}}</div>
          <div>{{address}}</div>
          <div>{{$t('lang.contact.contactLian')}} </div>
          <div><a :href="'tel:' + (phonenum)">{{phonenum}}</a></div>
        </div>
      </div>
    <!-- 底部导航 -->
    <Navigation/>
  </div>
</template>
<script>
import Navigation from '../../components/navigation.vue'
import TestOne from '../../components/test.vue'
import {Action,Native,Http} from "@/lib/maui.min.js"
export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.contact.top'),
      },
      array:{
          imgay:'https://img.yzcdn.cn/vant/cat.jpeg',
          imgays:require('../../assets/timg.png'),
          // imgayLogo:require('../../assets/zlsc_logo.png')
      },
      keyname:'',
      address:'',
      phonenum:'',
      userinfo: {},
      imgayytr:{},
    }
  },
  components:{
    Navigation,
    TestOne
  },
  created(){
    this._contact()
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
    showDev() {
        this.$router.push({path:"/index"});
    },
    _contact(){
      var url = '/cloud/oms/bs/info/sys/CompanyHandler?op=about';
      var temp = { };
      Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              this.$toast.fail(this.$t('lang.Errordered'));
              return;
          } else {
            console.log(result)
              // Toast.success(this.$t('lang.goumai'));
              this.keyname = result.rows[0].key_name
              this.address = result.rows[0].address
              this.phonenum = result.rows[0].phone_num
              this.array.imgayLogo = Http.FullUrl(result.rows[0].logo[0].url)
          }
      })
      // this.$refs.testTwo._oneB()
    },
  }
}
</script>
<style scoped>
.contact_img{width: 100%;height: auto;text-align: center;}
.contact_img_s{width: 90%;height: 90px;margin: 1rem auto;}
.contact_text div{margin: 1.5rem 0;}
.contact_text div:nth-child(1){font-size: 1.4rem;font-weight: 600;color: #666;}
.contact_text div:nth-child(3){font-size: .9rem;}
.contact_text div:nth-child(5){font-size: 1.9rem;}
</style>