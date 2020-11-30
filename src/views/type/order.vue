<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.bar" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <!-- 顾客信息内容 -->
    <div class="order_obdy">
      <div class="order_obdy_s" @click="onConsignee">
        <div v-if="isof.key_name == 1">
          <div v-if="from.noName != 'noName'">
            <div>{{$t('lang.order.orderSh')}}：{{from.receive_user}}</div>
            <div>{{$t('lang.order.orderLx')}}：{{from.phone_num}}</div>
            <div>{{$t('lang.order.orderDz')}}：{{from.detail_address}}</div>
          </div>
          <div class="isOforder_2" v-else>
              {{$t('lang.UserInformation')}}
          </div>
        </div>
        <div v-if="isof.key_name == 2">
          <div>{{$t('lang.order.orderSh')}}：{{from.receive_user}}</div>
          <div>{{$t('lang.order.orderLx')}}：{{from.phone_num}}</div>
          <div>{{$t('lang.order.orderDz')}}：{{from.detail_address}}</div>
        </div>
      </div>
    </div>
    <div style="height:10px"></div>
    <!-- 商品信息详情 -->
    <div class="order_commodity">
      <div class="order_commodity_one">
        <!-- 下拉商品信息 -->
          <van-list v-model="loading" :finished="finished" :finished-text="$t('lang.noNum')" @load="onLoad">
            <div class="commodity_text_body" v-for="(item,index) in news_List" :key="index">
              <van-col span="18">
                <div class="commodity_text_1">{{item.product_name.key_name}}</div>
                <!-- <div class="commodity_text_2">包装规格：{{item.spec}}</div> -->
                <div class="commodity_text_2">
                  <van-col span="10">{{$t('lang.order.orderXh')}}：{{item.model}}</van-col>
                  <van-col span="13" offset="1">{{$t('lang.order.orderGg')}}：{{item.spec}}</van-col>
                </div>
                <div class="commodity_text_2">
                  <van-col span="10">{{$t('lang.order.orderDj')}}：${{item.price}}</van-col>
                  <van-col span="13" offset="1">{{$t('lang.order.orderSl')}}：{{item.buy_num}} <span class="commodity_text_2_span">{{item.unit.key_name}}</span> </van-col>
                </div>
              </van-col>
              <van-col span="6" v-if="item.thumb" class="order_imgs">
                <van-image :src="item.thumb"></van-image>
              </van-col>
              <van-col span="6" v-else>
                <van-image lazy-load :src="array.imgays"/>
              </van-col>
            </div>
          </van-list>
      </div>
      <!-- 备注 -->
      <div class="order_commodity_remarks">
        <label>{{$t('lang.order.orderBz')}}：</label>
        <textarea v-model="order.label_test" @focus="textareaFocus" @blur="textareaBlur"></textarea>
      </div>
    </div>
    <!-- 提交信息内容 -->
    <div class="order_commodity_footer" v-show="textareaShow">
      <div>
        <van-col span="10">
          <div class="order_commodity_footer_one">
            <span>{{$t('lang.order.orderZkyh')}} %:</span><br>
            <input type="text" :readonly='readonly' @input="onInputMoney" v-model="order.inputMoney">
          </div>
        </van-col>
        <van-col span="14" class="order_commodity_footer_two">
          <div>
            <van-col span="11">{{$t('lang.order.orderJehj')}}</van-col>
            <van-col span="13">$ {{totalMoney}}</van-col>
          </div>
          <div>
            <van-col span="11">{{$t('lang.order.orderZkyh')}} </van-col>
            <van-col span="13">$ {{inputMoneys}}</van-col>
          </div>
          <div>
            <van-col span="11">{{$t('lang.order.orderZhje')}}</van-col>
            <van-col span="13">$ {{snapAfterMoney}}</van-col>
            </div>
          <div>
            <van-col span="11">IVA（+19%）</van-col>
            <van-col span="13">$ {{ivaMoney}}</van-col>
          </div>
          <div :style="{color:'red'}">
            <van-col span="11">{{$t('lang.order.orderZjehj')}}</van-col>
            <van-col span="13">$ {{numMoney}}</van-col>
          </div>
        </van-col>
      </div>
      <div class="order_commodity_footer_three">
        <van-button type="danger" size="mini" @click="submit" :disabled="isDisable">{{$t('lang.Submit')}}</van-button>
        <van-button type="primary" size="mini" @click="onClickLeft">{{$t('lang.Cancel')}}</van-button>
      </div>
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
        bar:this.$t('lang.order.orderTop')
      },
      array:{
          imgays:require('../../assets/timg.png')
      },
      order:{
        // 联系方式
          receive_user:'',
          phone_num:'',
          key_names:'',
        // 金额
          inputMoney:'',
          inputMoneyTwo:'',
          snapMoney:'',
          customer_entity:'',
          good_address:'',
          label_test:'',
          remain:''
      },
      isof:{
        key_name:'',
      },
      list: [],
      news_List:[],
      bs_shop:'',
      loading: false,
      finished: false,
      //用户信息
      from:{//vuex状态管理
        noName:'',
        receive_user:'',
        phone_num:'',
        detail_address:'',
      },
      textareaShow:true,
      readonly:false,
      isDisable:false
    }
  },
  created(){
    this.bs_shop = this.$route.query.bs_shop;
    // this._count()
    this._getUser()
    // this.onSubmit()
  },
  computed:{
    // 计算合计金额
    totalMoney() {
      var total =0;
      for(var i = 0;i<this.news_List.length;i++){
        var item = this.news_List[i];
        total +=item.price*item.buy_num;
      }
      return Math.round(total).toString().replace(/\B(?=(\d{3})+$)/g, ",");
    },
    inputMoneys(){
      var total =0;
      for(var i = 0;i<this.news_List.length;i++){
        var item = this.news_List[i];
        total +=(item.price*item.buy_num) * (this.order.inputMoney /100);
      }
      return Math.round(total).toString().replace(/\B(?=(\d{3})+$)/g, ",");
    },
    snapAfterMoney(){
      var total =0;
      for(var i = 0;i<this.news_List.length;i++){
        var item = this.news_List[i];
        total += (item.price*item.buy_num)-((item.price*item.buy_num) * (this.order.inputMoney /100));
      }
      return Math.round(total).toString().replace(/\B(?=(\d{3})+$)/g, ",");
    },
    ivaMoney(){
      var total =0;
      for(var i = 0;i<this.news_List.length;i++){
        var item = this.news_List[i];
        var numMoney = (item.price*item.buy_num)-((item.price*item.buy_num) * (this.order.inputMoney /100))
        var iva = ((item.price*item.buy_num)-((item.price*item.buy_num) * (this.order.inputMoney /100)))*0.19
        total += iva;
      }
      return Math.round(total).toString().replace(/\B(?=(\d{3})+$)/g, ",");
    },
    numMoney(){
      var total =0;
      for(var i = 0;i<this.news_List.length;i++){
        var item = this.news_List[i];
        var numMoney = (item.price*item.buy_num)-((item.price*item.buy_num)*(this.order.inputMoney /100))
        var iva = ((item.price*item.buy_num)-((item.price*item.buy_num)*(this.order.inputMoney /100)))*0.19
        total += numMoney + iva;
      }
      return Math.round(total).toString().replace(/\B(?=(\d{3})+$)/g, ",");
    }
  },
  beforeRouteEnter (to, from, next) {
    //在next中写处理函数
    next(vm => vm.setData(from)); // err 与 12134 是随便传的值， 可忽略
  },
  methods:{
    onClickLeft(){
      this.$router.push({path:'/type'})
    },
    // 限制点击事件N秒后才能再次点击
    // onSubmit(){
    //    this.isDisable=true
    //    setTimeout(()=>{
    //        this.isDisable=false   //点击一次时隔两秒后才能再次点击
    //    },3000)
    // },
    // 判断业务员of用户
    _getUser(){
       this.from.noName = this.$store.judgeJinlai
       var url = '/cloud/oms/bs/info/order/OrderHandler?op=getUser';
       var temp = { };
       Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
              this.isof.key_name = result.data.type.id
              if(result.data.type.id == 1){
                  this.readonly = false
              }
              if(result.data.type.id == 2){
                  this.readonly = true
                  // this.readonly = false
              }
          }
      })
    },
    // input事件
    onInputMoney(){
      var ofInputMoney = this.order.inputMoney-0
      var ofInputMoneyTwo = this.order.inputMoneyTwo-0
      if(ofInputMoney > ofInputMoneyTwo){
        this.order.inputMoney = this.order.inputMoneyTwo
      }
    },
    submit(){
      var customer_entity = this.$store.CommodityUserId //用户id
      var discount_rate = this.order.inputMoney //  折扣率
      var should_cost = this.numMoney.replace(/,/g,'');  //总金额总计
      var discount_cost = this.inputMoneys.replace(/,/g,''); //折扣优惠
      var sub_cost = this.snapAfterMoney.replace(/,/g,'');  //折后金额
      var tax_rate = '19' //税率
      var tax_cost = this.ivaMoney.replace(/,/g,'');  //税费
      var total_cost = this.totalMoney.replace(/,/g,'');  //合计金额
      var bs_shop = this.$store.CommodityOrder.bs_shop //购物车id
      var good_address =  this.from.detail_address//客户地址Id  this.$store.CommodityUserAddress
      var remark = this.order.label_test //备注
      var phone_num = this.from.phone_num //电话
      var receive_user = this.from.receive_user //收货人
      var url = '/cloud/oms/bs/info/order/OrderHandler?op=DetailAdd';
      var temp = { customer_entity,discount_rate,should_cost,discount_cost,sub_cost,tax_rate,tax_cost,total_cost,bs_shop,good_address,remark,phone_num,receive_user };
      console.log(temp)
      if(this.$store.judgeJinlai == 'noName'){
        Toast.fail(this.$t('lang.UserInformation'));
      }else{
        // var remain = this.order.remain-0 
        // var morequota = this.$store.moreQuota-0;
        if(should_cost > this.order.remain-0 || should_cost > this.$store.moreQuota-0){
            Toast.fail(this.$t('lang.oficina'));
        }else{
            this.isDisable=true
            Action.Ajax(url, temp, result => {
                if (result.code != 200) {
                    // this.$toast.fail(result.remark);
                    return;
                } else {
                    this.isDisable=false 
                    Toast.success(this.$t('lang.placeOrder'));
                    setTimeout(() => {
                      this.$router.push({path:'/submit'})
                    }, 2000)
                }
            })
          }
      }
    },
    onConsignee(){
      if(this.isof.key_name == 1){
        this.$router.push({path:'/mySearch'})
        this.$store.judgeUser = 1
      }
      if(this.isof.key_name == 2){
        this.$router.push({path:'/shipping'})
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
          var bs_shop = this.$store.CommodityOrder.bs_shop
          var url = '/cloud/oms/bs/info/order/OrderHandler?op=getOrderInfo';
          var temp = {bs_shop};
          Action.Ajax(url, temp, result => {
              // 加载状态结束
              this.loading = false;
              if (result.code != 200) {
                  // this.$toast.fail(result.remark);
                  return;
              } else {
                  console.log(result)
                  // 联系方式
                  this.order.inputMoney = result.data.discount_rate * 100
                  this.order.inputMoneyTwo = result.data.discount_rate * 100
                  this.order.customer_entity = result.data.user_entity.id
                  this.order.good_address = result.data.id
                  this.order.remain = result.data.remain
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
    setData(from) {
      console.log(from)
      if(from.path == "/shipping"){
        this.from.receive_user = this.$store.receive_user
        this.from.phone_num = this.$store.phone_num
        this.from.detail_address = this.$store.detail_address
      }
      if(from.path == "/myMore"){
        this.from.receive_user = this.$store.receive_user
        this.from.phone_num = this.$store.phone_num
        this.from.detail_address = this.$store.detail_address
      }
      if(from.path == "/type"){
        var bs_shop = this.$store.CommodityOrder.bs_shop
        var url = '/cloud/oms/bs/info/order/OrderHandler?op=getOrderInfo';
        var temp = { bs_shop };
        Action.Ajax(url, temp, result => {
            if (result.code != 200) {
                // this.$toast.fail(result.remark);
                return;
            } else {
                console.log(result)
                this.from.receive_user = result.data.receive_user
                this.from.phone_num = result.data.phone_num
                this.from.detail_address = result.data.key_name
                this.$store.CommodityUserAddress = result.data.id
                this.$store.CommodityUserId = result.data.user_entity.id
            }
        })
      }
    },
    textareaFocus(){
      this.textareaShow = false
    },
    textareaBlur(){
      this.textareaShow = true
    }
  }
}
</script>
<style scoped>
.order_imgs{text-align: center;}
.order_commodity_footer_one{padding-top: 3rem;}
.commodity_text_2{overflow: hidden;}
.commodity_text_2 .van-col{overflow:hidden;white-space:nowrap;}
.isOforder_2{color: #999;text-align: center;padding: 1.3rem 0;}
</style>