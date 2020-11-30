<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="submit_img">
      <div class="submit_img_s">
        <img src="../../assets/yes.png">
      </div>
      <div>{{$t('lang.submit.submitCg')}}！</div>
    </div>
    <div class="submit_button">
      <button @click="goMeOrder">{{$t('lang.submit.submitCk')}}</button>
      <button @click="goMall">{{$t('lang.submit.submitSc')}}</button>
    </div>
    <!-- 底部导航 -->
    <Navigation/>
  </div>
</template>
<script>
import Navigation from '../../components/navigation.vue'
export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.submit.submitCg')
      }
    }
  },
  components:{
    Navigation
  },
  methods:{
   onClickLeft(){
     this.$router.go(-1)
   },
   goMeOrder(){
      this.$router.push({path:'/my'})
   },
   goMall(){
     this.$router.push({path:'/home'})
   }
  }
}
</script>
<style scoped>

</style>