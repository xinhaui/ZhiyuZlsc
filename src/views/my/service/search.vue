<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-search v-model="value" shape="round" background="transparent" :placeholder="$t('lang.inputCustomer')" @blur="blurSearch"/>
    <!-- 客户资料 -->
    <div class="search_body" @click="onclickMore" v-show="rows">
        <div class="search_text">
          <div class="search_name"><span>{{search.login_name}}</span><span>{{$t('lang.search.searchMore')}}</span></div>
          <div class="search_range"><span>{{$t('lang.addRess.addRessYy')}}：{{search.category}}</span><span>{{$t('lang.more.moreBy')}}：{{search.sycost}}</span></div>
          <div class="search_address">{{$t('lang.search.searchGs')}}：{{search.detail_address}}</div>
        </div>
    </div>
    <div class="search_new" @click="onclickNew">
      + {{$t('lang.search.searchXj')}}
    </div>
  </div>
</template>
<script>
import {Action,Native,Http} from "@/lib/maui.min.js"

export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.search.searchTop')
      },
      value:'',
      search:{
        login_name:'',
        category:'',
        sycost:'',
        detail_address:'',
        id:''
      },
      rows:false,
    }
  },
  components:{
   
  },
  created(){
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    onclickNew(){
      this.$router.push({path:'/myNew'})
    },
    onclickMore(){
      this.$router.push({path:'/myMore',query:{searchId:this.search.id}})
    },
    blurSearch(){
       var url = '/cloud/oms/bs/info/sys/CompanyHandler?op=findCustomer';
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
.search_body{width: 100%;border-top: 1px solid #999;border-bottom: 1px solid #999;padding: .8rem 0;}
.search_text{width: 94%;margin: 0 auto;}
.search_name span:nth-child(1){font-size: 1.3rem;font-weight: 600;}
.search_name span:nth-child(2){float: right;color: #999;}
.search_range{font-size: .9rem;color: #666;margin: .35rem 0;}
.search_range span{display: inline-block;margin-right: 2em;}
.search_address{font-size: 1rem;color: #666;}
.search_new{width: 86%;margin: 40% auto;text-align: center;border: 1px solid #999;height: 4rem;line-height: 4rem;background: #eee;border-radius: .3rem;}
</style>