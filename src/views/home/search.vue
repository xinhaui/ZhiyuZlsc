<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="$t('lang.homesearch.top')" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-search v-model="searchTop"  show-action label=" " :placeholder="$t('lang.homesearch.searchGuan')" @search="onSearch" >
      <template #action>
        <div @click="onSearch">{{$t('lang.homesearch.searchSou')}}</div>
      </template>
    </van-search>
    <!-- 搜索下拉框 -->
    <div v-show="searchNo">
      <ul>
        <li v-for="(time,index) of search" :key="index" @click="searchContent(time)">
          <van-cell :title="time.key_name" is-link />
        </li>
      </ul>
    </div>
    <!-- 搜索内容 -->
       <div class="my_list" v-if="searchNoTwo">
         <!-- 下拉商品信息 -->
          <van-list v-model="loading" :finished="finished" :finished-text="$t('lang.noNum')">
            <div class="my_list_body" v-for="(item,index) in news_List" :key="index">
              <div @click="onDetails(item.id)">
                <van-col class="search_img" span="6" v-if="item.thumb">
                  <van-image :src="item.thumb"/>
                </van-col>
                <van-col class="search_img" span="6" v-else>
                  <van-image lazy-load :src="array.imgays"/>
                </van-col>
                <van-col span="17" offset="1" class="my_list_body_right">
                  <div>{{item.key_name}}</div>
                  <div>{{$t('lang.homesearch.searchBao')}}：{{item.spec}}</div>
                  <div class="my_list_body_right_4">{{$t('lang.homesearch.searchXin')}}：{{item.sku}}</div>
                  <div class="my_list_body_right_4">{{$t('lang.homesearch.searchShen')}}：{{item.num}} <i>{{item.unit.key_name}}</i>  </div>
                  <div class="my_list_body_right_4" :style="({'color':styles.colorRde})">${{item.price}}<span>+IVA</span> </div>
                </van-col>
              </div>
              <van-col span="24" class="search_button">
                <van-col span="5">
                  {{$t('lang.homesearch.searchShu')}}
                </van-col>
                <van-col span="10" class="search_input">
                  <input type="text" v-model="item.mini_num">
                </van-col>
                <van-col span="4" offset="1">
                  {{item.unit.key_name}}
                </van-col>
                <van-col span="4">
                  <span class="search_input_cart" @click="onClick(item)"><img src="../../assets/cart.png"></span>
                </van-col>
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
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data(){
    return{
      lang:{
        bar:this.$t('lang.homesearch.top')
      },
      styles:{
        colorRde:'red'
      },
      array:{
          imgays:require('../../assets/timg.png')
      },
      searchNo:false,
      searchNoTwo:false,
      search:[],
      searchTop:'',
      rows: [],
      news_List:[],
      loading: false,
      finished: false,
    }
  },
  components:{
    Navigation
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    onSearch(){
      var info = this.searchTop
      var url = '/cloud/oms/zlapp/SellApiUtil?op=findProduct';
      var temp = {
          info
      };
      Action.Ajax(url, temp, result => {
        console.log(result)
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            this.searchNoTwo = true
            let rows = result.rows
            for (var i = 0; i < rows.length; i++) {
                // 下拉框
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
    },
    onClick(res){
      console.log(res)
      var product_name = res.id
      var buy_num = res.mini_num
      var mini_num = res.mini_numTwo
      var spec = res.spec
      var model = res.model
      var price = res.price
      var num = res.num
      var unit = res.unit.id
      var ifBuy_num = res.mini_num-0
      var ifNum = res.num-0
      if(res.good_picture.length != 0){
          var good_picture = res.good_picture[0].key_name
      }
      var url = '/app?op=Add&cloud=bs_shop';
      var temp = {
          product_name,
          buy_num,
          spec,
          model,
          price,
          num,
          unit,
          good_picture,
          mini_num,
      };
      if(buy_num > num || num == 0){
          Toast.fail(this.$t('lang.buzhu'));
      }else{
        if(ifBuy_num > ifNum || ifNum == 0){
            Toast.fail(this.$t('lang.buzhu'));
        }else{
            Action.Ajax(url, temp, result => {
                if (result.code != 200) {
                    // this.$toast.fail(result.remark);
                    return;
                } else {
                    Toast.success(this.$t('lang.goumai'));
                }
            })
        }
      }
    },
    onDetails(resId){
        this.$router.push({path:'/details',query:{ids:resId}});
    }
  }
}
</script>
<style scoped> 
.search_img{height: 90px;}
.van-image{height: 100%;}
.search_input input{text-align: center;padding: 0.123rem 0;}
.van-col--4{text-align: center;}
</style>