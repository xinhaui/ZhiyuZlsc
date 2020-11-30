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
        <van-field v-model="group.value6" :label="$t('lang.addRess.addRessCs')" :placeholder="$t('lang.addRess.addRessCss')" />
        <van-field v-model="group.value7" :label="$t('lang.addRess.addRessSf')" :placeholder="$t('lang.addRess.addRessSfs')" />
        <van-field v-model="group.value8" :label="$t('lang.addRess.addRessDq')" :placeholder="$t('lang.addRess.addRessDqs')" />
        <van-field v-model="group.value9" :label="$t('lang.addRess.addRessYx')" :placeholder="$t('lang.addRess.addRessYxs')" />
      </van-cell-group>
    </div>
    <!-- 底部按钮 -->
    <div class="message_bottom_button"> 
        <van-button type="primary" block @click="address">{{$t('lang.Submit')}}</van-button>
        <van-button type="primary" block @click="onClickLeft">{{$t('lang.Retuen')}}</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.addRess.addRessTop')
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
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    address(){
      var url = '/app?op=Add&cloud=bs_address';
       var key_name = this.value
       var temp = { key_name };
       
       Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              this.$toast.fail(this.$t("lang.noInputBox"));
              return;
          } else {
              console.log(result)
              if(result.data.key_name != ''){
                this.rows = true
                this.search.login_name = result.data.key_name
                this.search.category = result.data.scope
                this.search.sycost = result.data.scope
                this.search.detail_address = result.data.detail_address
                this.search.id = result.data.id
              }else{
                this.rows = false
              }
              
          }
      })
    }
  }
}
</script>
<style scoped>

</style>