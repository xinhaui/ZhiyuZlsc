<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar"></van-nav-bar>
      <van-search v-model="value" shape="round" background="transparent" :placeholder="$t('lang.homes.crux')" @blur="blurSearch()"/>
      <div class="my_top">
        <div class="my_tops" v-if="isof.key_name == 2">
          <!-- 客户信息 -->
          <div class="my_top_title" @click="onMessage">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.myWd"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.my.myWd')}}</div>
          </div>
          <!-- 历史订单 -->
          <div class="my_top_title" @click="onHistory">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.myLs"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.my.myLs')}}</div>
          </div>
          <!-- 收货地址 -->
          <div class="my_top_title" @click="onShipping">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.mySh"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.my.mySh')}}</div>
          </div>
          <!-- 退出 -->
          <div class="my_top_title" @click="logout">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.logoUt"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.logoUt')}}</div>
          </div>
        </div>
        <div class="my_tops" v-if="isof.key_name == 1">
          <!-- 客户信息 -->
          <div class="my_top_title my_top_title_two" @click="onService">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.myKh"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.my.myKh')}}</div>
          </div>
          <!-- 历史订单 -->
          <div class="my_top_title my_top_title_two" @click="onHistory">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.myLs"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.my.myLs')}}</div>
          </div>
          <!-- 退出 -->
          <div class="my_top_title my_top_title_two" @click="logout">
            <div class="my_top_title_img">
              <van-image :style="({'width':styles.imarg,'height':styles.imarg})" :src="array.logoUt"/>
            </div>
            <div class="my_top_title_text">{{$t('lang.logoUt')}}</div>
          </div>
        </div>
      </div>
      <div class="my_order">
        {{$t('lang.my.myBy')}}
      </div>
      <div class="my_deal">
        <div>
          <div>
            <span class="my_deal_3">{{$t('lang.my.myYtj')}}：<span>{{submit}}</span></span>
            <span class="my_deal_3">{{$t('lang.my.myYfh')}}：<span>{{ship}}</span></span>
          </div>
          <div>
            <span class="my_deal_3">{{$t('lang.my.myBhz')}}：<span>{{stock}}</span></span>
            <span class="my_deal_3">{{$t('lang.type.typeZk')}}：<span>{{sum_cost}}</span></span>
          </div>
        </div>
      </div>
      <!-- 订单列表 -->
      <div class="my_list">
         <!-- 下拉商品信息 -->
          <van-list v-model="loading" :finished="finished" :finished-text="$t('lang.noNum')" @load="onLoad">
            <div class="my_list_body" v-for="(item,index) in news_List" :key="index" @click="myDetails(item.id)">
              <div class="my_list_body_order_right">{{$t('lang.my.myBh')}}：{{item.key_name}} <span>{{$t('lang.my.myZs')}}：{{item.count}}</span></div>
              <van-col span="6" v-if="item.thumb">
                <van-image  :src="item.thumb"></van-image>
              </van-col>
              <van-col span="6" v-else>
                <van-image lazy-load :src="array.imgays"/>
              </van-col>
              <van-col span="17" offset="1" class="my_list_body_right">
                <!-- <div>型号xxxx</div> -->
                <div>{{$t('lang.my.myDd')}}：{{item.text_xia}}</div>
                <div>{{$t('lang.my.myDq')}}：{{item.good_address}}</div>
                <div>{{$t('lang.my.mySp')}}：{{item.sum_num}}</div>
                <div class="my_list_body_right_4">{{$t('lang.my.myRq')}}：{{item.create_time}} <span>$ {{item.should_cost}}</span> </div>
              </van-col>
            </div>
          </van-list>
      </div>
    <!-- 底部导航 -->
    <Navigation/>
  </div>
</template>
<script>
import Navigation from '../../components/navigation.vue'
import {Action,Native,Http} from "@/lib/maui.min.js"
import Vue from 'vue';
import { Lazyload } from 'vant';
import { List } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(List);
Vue.use(Lazyload);
export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.my.myTop')
      },
      array:{
          imgays:require('../../assets/timg.png'),
          myWd:require('../../assets/my_Wd.png'),
          myKh:require('../../assets/my_Yh.png'),
          myLs:require('../../assets/my_Ls.png'),
          mySh:require('../../assets/my_Sh.png'),
          logoUt:require('../../assets/my_Tc.png'),
      },
      isof:{
        key_name:""
      },
      styles:{
        imarg:'40px'
      },
      value:'',
      list: [],
      loading: false,
      finished: false,
      news_List:[],
      submit:'',
      stock:'',
      ship:'',
      sum_cost:''
    }
  },
  components:{
    Navigation
  },
  created(){
    this._getUser()
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    onMessage(){
      this.$router.push({path:'/message'})
    },
    onShipping(){
      this.$router.push({path:'/shipping'})
    },
    onHistory(){
      this.$router.push({path:'/history'})
    },
    onService(){
      this.$router.push({path:'/mySearch'})
      this.$store.judgeUser = 2
    },
    logout(){
       Action.Logout(result=>{
                
       });
      this.$router.push({path:'/login', query:{reload:true}});
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
          var url = '/cloud/oms/bs/info/order/OrderHandler?op=orderList';
          var temp = { type:1 };
          Action.Ajax(url, temp, result => {
            console.log(result)
              // 加载状态结束
              this.loading = true;
              if (result.code != 200) {
                  // this.$toast.fail(result.remark);
                  return;
              } else {
                  this.submit = result.data.submit
                  this.ship = result.data.ship
                  this.stock = result.data.stock
                  this.sum_cost = result.data.sum_cost
     
                  let rows = result.rows
                  for (var i = 0; i < rows.length; i++) {
                      if (rows[i].good_picture) {
                          for (var z = 0; z < rows[i].good_picture.length; z++) {
                              rows[i].thumb = Http.FullUrl(rows[i].good_picture[0].url)
                          }
                      }
                      if(rows[i].review_state.id == 2){
                           rows[i].text_xia = 'Pedido realizado'
                      }
                      if(rows[i].review_state.id == 3){
                           rows[i].text_xia = 'En preparación'
                      }
                      if(rows[i].review_state.id == 4){
                           rows[i].text_xia = 'Enviado'
                      }
                  }

                  this.news_List = rows
                  var listLength = this.news_List.length +1
                  if (this.news_List.length <= listLength) {
                      this.finished = true;
                  }
              }
          })
          // 数据全部加载完成
      });
    },
    myDetails(id){
      this.$router.push({path:'/myDetails',query:{ids:id}})
    },
    // 判断业务员of用户
    _getUser(){
       var url = '/cloud/oms/bs/info/order/OrderHandler?op=getUser';
       var temp = { };
       Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
              console.log(result)
              this.isof.key_name = result.data.type.id
          }
      })
    },
    blurSearch(){
       var url = '/cloud/oms/bs/info/order/OrderHandler?op=SearchOrder';
       var info = this.value
       var type = 1
       var temp = { info,type };
       Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
              console.log(result)
               this.submit = result.data.submit
                  this.ship = result.data.ship
                  this.stock = result.data.stock
                  this.sum_cost = result.data.sum_cost
     
                  let rows = result.rows
                  for (var i = 0; i < rows.length; i++) {
                      if (rows[i].good_picture) {
                          for (var z = 0; z < rows[i].good_picture.length; z++) {
                              rows[i].thumb = Http.FullUrl(rows[i].good_picture[0].url)
                          }
                      }
                  }
                  this.news_List = rows
                  var listLength = this.news_List.length +1
                  if (this.news_List.length <= listLength) {
                      this.finished = true;
                  }
          }
      })
    }
  }
}
</script>
<style scoped> 
.my_top{width:100%;height:auto;border-top:1px solid #000}
.my_tops{width:94%;margin:.6rem auto;display:flex;}
.my_tops .my_top_title{width: 25%;text-align: center;}
.my_tops .my_top_title .my_top_title_img{width: 2.5rem;height: 2.5rem;margin: 0 auto;}
.my_top_title_imgs{width: 2rem;height: 2rem;margin: 0 auto;padding-top: .5rem;}
.my_top_title_text{margin: .4rem 0 0 0;}
.my_top_title_two{width: 33% !important;}
</style>
