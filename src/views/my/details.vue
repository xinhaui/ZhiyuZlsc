<template>
  <div style="background:#eeeeee" :style="height">
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 订单详情-编号 -->
    <div class="myDetails_number">
      <div class="myDetails_number_1">
        <span>{{$t('lang.myOrder.myOrderBh')}}：{{details.key_name}}</span><br>
        <span class="myDetails_number_1_right">{{details.review_state}}</span>
      </div>
      <div class="myDetails_number_2" v-if="isof.key_name == 1">
        {{$t('lang.myOrder.myOrderYw')}}：<span>{{details.create_entity}}</span>
      </div>
    </div>
    <!-- 订单详情-联系人 -->
    <div class="myDetails_number">
        <div class="myDetails_contacts">
          <div><span>{{$t('lang.myOrder.myOrderSh')}}：</span>{{details.contract_user}}</div>
          <div><span>{{$t('lang.myOrder.myOrderLx')}}：</span>{{details.phone_num}}</div>
          <div><span>{{$t('lang.myOrder.myOrderShone')}}：</span>{{details.good_address}}</div>
        </div>
    </div>
    <!-- 订单详情-详情 -->
    <div class="myDetails_number">
       <div class="myDetails_number_one">
        <!-- 订单详情-详情下拉商品信息 -->
          <van-list v-model="loading" :finished="finished" :finished-text="$t('lang.noNum')" @load="onLoad">
            <div class="commodity_text_body" v-for="(item,index) in news_List" :key="index">
              <van-col span="18">
                <div class="commodity_text_1">{{item.product_name.key_name}}</div>
                <div class="commodity_text_2">{{$t('lang.homesearch.searchBao')}}：{{item.spec}}</div>
                <div class="commodity_text_2">
                  <van-col span="24">{{$t('lang.homesearch.searchXin')}}：{{item.model}}</van-col>
                  <van-col span="24">{{$t('lang.details.goodypp')}}：{{item.brand}}</van-col>
                </div>
                <div class="commodity_text_2">
                  <van-col span="24">{{$t('lang.details.goodydj')}}：${{item.price}}</van-col>
                  <van-col span="24">{{$t('lang.homesearch.searchShu')}}：{{item.buy_num}} <span class="commodity_text_2_span">{{item.unit.key_name}}</span> </van-col>
                </div>
                <div :style="({'color':styles.grey})">{{$t('lang.my.myRq')}}：{{item.create_time}}</div>
              </van-col>
              <van-col span="6" v-if="item.thumb">
                <van-image  :src="item.thumb"></van-image>
              </van-col>
               <van-col span="6" v-else>
                <van-image lazy-load :src="array.imgays"/>
              </van-col>
            </div>
          </van-list>
      </div>
      <!-- 订单详情-商品金额 -->
      <div class="myDetails_number_money">
          <div><span>{{$t('lang.order.orderJehj')}}</span>${{details.total_cost}}</div>
          <div><span>{{$t('lang.order.orderZkyh')}}</span>${{details.discount_cost}}</div>
          <div><span>{{$t('lang.order.orderZhje')}}</span>${{details.sub_cost}}</div>
          <div><span>IVA(+19%)</span>${{details.tax_cost}}</div>
          <div class="myDetails_number_money_5"><span>{{$t('lang.order.orderZjehj')}}</span>${{details.should_cost}}</div>
      </div>
    </div>
    <!-- 订单详情-备注 -->
      <div class="myDetails_remarks">
        <div>{{$t('lang.order.orderBz')}}：{{details.remark}}</div>
        <div><van-button type="primary" block @click="myReturn">{{$t('lang.Retuen')}}</van-button></div>
      </div>
  </div>
</template>
<script>
import {Action,Native,Http} from "@/lib/maui.min.js"
export default {
  data(){
    return{
      height:{
        height:''
      },
      lang:{
        bar:this.$t('lang.myOrder.myOrderTop')
      },
      styles:{
        grey:'#666'
      },
      array:{
          imgays:require('../../assets/timg.png')
      },
      isof:{
        key_name:""
      },
      list: [],
      news_List:[],
      loading: false,
      finished: false,
      myNumber:'',
      details:{
        key_name:'',
        review_state:'',
        create_entity:'',
        contract_user:'',
        phone_num:'',
        good_address:'',

        total_cost:'',
        discount_cost:'',
        sub_cost:'',
        tax_cost:'',
        should_cost:'',
        remark:''
      },
    }
  },
  created(){
    this.height.height=window.innerHeight+'px';
    this.myNumber = this.$route.query.ids;
    this._getuser()
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    myReturn(){
      this.$router.go(-1)
    },
   onLoad() {
      // 异步更新数据
      setTimeout(() => {
          var id = this.myNumber
          var url = '/cloud/oms/bs/info/order/OrderHandler?op=orderDetail';
          var temp = {id}
          Action.Ajax(url, temp, result => {
              // 加载状态结束
              this.loading = false;
              if (result.code != 200) {
                  // this.$toast.fail(result.remark);
                  return;
              } else {
                  console.log(result)
                  this.details.key_name = result.data.key_name
                  if(result.data.review_state.id == 2){
                      this.details.review_state = 'Pedido realizado'
                  }
                  if(result.data.review_state.id == 3){
                      this.details.review_state = 'En preparación'
                  }
                  if(result.data.review_state.id == 4){
                      this.details.review_state = 'Enviado'
                  }
                  this.details.create_entity = result.data.create_entity.key_name
                  this.details.contract_user = result.data.contract_user
                  this.details.phone_num = result.data.phone_num
                  this.details.good_address = result.data.good_address
                  this.details.remark = result.data.remark
                  // 商品金额
                  this.details.total_cost = result.data.total_cost
                  this.details.discount_cost = result.data.discount_cost
                  this.details.sub_cost = result.data.sub_cost
                  this.details.tax_cost = result.data.tax_cost
                  this.details.should_cost = result.data.should_cost
                  
                  // 商品列表
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
        });
    },
    _getuser(){
      var url = '/cloud/oms/bs/info/order/OrderHandler?op=getUser';
      var temp = { };
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            // this.$toast.fail(result.remark);
            return;
        } else {
            this.isof.key_name = result.data.type.id
        }
    })
    }
  }
}
</script>
<style scoped>
.myDetails_number_1_right{font-size: .8em;margin-top:.3em;}
</style>