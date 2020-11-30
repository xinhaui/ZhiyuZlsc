<template>
  <div style="background:#eeeeee">
    <!-- 导航栏 -->
        <van-nav-bar :title="lang.tiedas">
            <template #right>
                <!-- <van-icon name="search" size="25" /> -->
            </template>
        </van-nav-bar>

        <van-checkbox-group v-model="result_name" ref="checkboxGroup">
           <van-list v-model="loading" :finished="finished" :finished-text="$t('lang.noNum')" @load="onLoad" class="type_wares_margin">
            <div class="type_wares" v-for="(item,index) in news_List" :key="index">
              <van-row>
                  <div class="type_wares_introduce">
                    <van-col span="2" :style="{'marginTop':styles.marginTop}">
                        <input type="checkbox" v-model="item.onYes" :name="item.id" @click="choice(item,index)"/>
                        <!-- <van-checkbox v-model="itme.yes" :name="itme.id" @click="one(itme.yes,itme)">复选框 {{itme.id}}</van-checkbox> -->
                    </van-col>
                    <van-col span="6" v-if="item.thumb">
                      <van-image width="94" height="94" :src="item.thumb" />
                    </van-col>
                    <van-col span="6" v-else>
                      <van-image lazy-load :src="array.imgays"/>
                    </van-col>
                    <van-col span="14" offset="2">
                      <div>{{item.key_name}}</div>
                      <div>{{$t('lang.type.typeBz')}}：{{item.spec}}</div>
                      <div>{{$t('lang.type.typeXh')}}：{{item.model}}</div>
                      <div>{{$t('lang.type.typeKc')}}：{{item.num}}</div>
                    </van-col>
                  </div>
                  <div class="type_wares_introduce_two">
                    <van-col span="2">
                      <span class="type_wares_introduce_span" @click="deletePerson(index,item.id)">-</span>
                    </van-col>
                    <van-col span="6"></van-col>
                    <van-col span="14" offset="2">
                      <span class="type_wares_introduce_jgo">${{item.price}}</span>
                      <span class="type_wares_introduce_iva">+IVA</span>
                      <span>
                        <input type="text" v-model="item.buy_num" min='0' @blur="onBlurType(item.id,item.buy_num,item.buy_numTwo,item)">
                      </span>
                      <span class="type_wares_introduce_jgo">{{item.unit.key_name}}</span>
                    </van-col>
                  </div>
              </van-row>
            </div>
          </van-list>
        </van-checkbox-group>

        <!-- 全选或者反选 -->
        <!-- <van-button type="primary" @click="checkAll">全选</van-button>
        <van-button type="info" @click="toggleAll">反选</van-button> -->
    <!-- 底部导航 -->
    <van-goods-action>
        <div class="type_action_one">{{$t('lang.type.typeZk')}}</div>
        <div class="type_action_two">${{totalPrice}}</div>
        <van-goods-action-button :disabled='disabledyesofno' type="danger" :text="$t('lang.type.typeXd')" @click="onClickButton"/>
    </van-goods-action>
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
          tiedas:this.$t('lang.type.typeTop'),
        },
        styles:{
          marginTop:'42px'
        },
        type:{
          money:0
        },
        arr:[],
        array:{
            imgay:'https://img.yzcdn.cn/vant/cat.jpeg',
            imgays:require('../../assets/timg.png')
        },
        loading: false,
        finished: false,
        news_List:[],
        result_name:[],
        typeCheckbox:false,
        list: [],
        arr:[],
        addArr:[],
        commodityId:[],
        disabledyesofno:false,
      }
  },
  components:{
    Navigation
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for (var i = 0; i < this.news_List.length; i++) {
        var item = this.news_List[i];
        var ofbuy_num = item.buy_num - 0
        var ofnum = item.num-0
        if (this.news_List[i].onYes == true || this.news_List[i].onYes == undefined) {
          total += item.price * item.buy_num;
          // console.log(item)
          if( ofbuy_num > ofnum){
            this.disabledyesofno = true
          }
        }else{
          if( ofbuy_num > ofnum){
            this.disabledyesofno = false
          }
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ",");
    }
  },
  created(){
    this._getUser()
  },
  methods: {
    onClickIcon() {
      Toast('点击图标');
    },
    // one(id){
    //   console.log(id)
    // },
    onLoad() {
      setTimeout(() => {
        var url = '/cloud/oms/bs/info/product/ProductHandler?op=findCart';
        var temp = {};
        Action.Ajax(url, temp, result => {
            // 加载状态结束
            this.loading = false;
            if (result.code != 200) {
                this.$toast.fail(this.$t('lang.Errordered'));
                return;
            } else {
                console.log(result)
                let rows = result.rows
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].good_picture) {
                        for (var z = 0; z < rows[i].good_picture.length; z++) {
                            rows[i].thumb = Http.FullUrl(rows[i].good_picture[0].url)
                        }
                    }
                    var ofbuy_num = rows[i].buy_num - 0
                    var ofnum = rows[i].num-0
                    if( ofbuy_num > ofnum){
                      Toast.fail(this.$t('lang.buzhu'));
                      this.disabledyesofno = true
                    }
                    rows[i].onYes = Boolean(rows[i].is_select)
                    rows[i].buy_numTwo = rows[i].buy_num
                }
                
                this.news_List = rows
                console.log(this.news_List)
                this.list = rows
                var listLength = this.news_List.length +1
                if (this.news_List.length <= listLength) {
                    this.finished = true;
                }


                let resultList = [];
                for(let i =0 ;i<rows.length;i++){
                    // sum = rows[i].price * rows[i].buy_num
                    let value1 = isNaN(Number(rows[i].price)) ? 0 : Number(rows[i].price);
                    let value2 = isNaN(Number(rows[i].buy_num)) ? 0 : Number(rows[i].buy_num);
                    resultList[i] = value1 * value2;
                }
                let sum = 0;
                for (let value of resultList) {
                sum += value;
                }
                this.type.money = sum
           }
          })
      });
    },
    // 全选或者反选
    // checkAll(){
    //   this.$refs.checkboxGroup.toggleAll(true);
    // },
    //  toggleAll() {
    //   this.$refs.checkboxGroup.toggleAll();
    // },
    // 选中及取消
    choice(res,index) {
      if (this.list[index].isCheck === false) {
        this.list[index].isCheck = true;
      } else { 
        this.list[index].isCheck = false;
        // this.isAllChecked = false;
      }
    },
    // 失去焦点
    onBlurType(id,num,item,res){
      var number = res.buy_num-0
      var stock = res.num - 0
      if(number > stock){
          this.disabledyesofno = true
          Toast.fail(this.$t('lang.buzhu'));
      }else{
          this.disabledyesofno = false
      }
      var numone = num-0
      var numtwo = res.mini_num-0
        var url = '/cloud/oms/bs/info/order/OrderHandler?op=ModifyShop';
         if(numone > numtwo){
            var temp = { id,num:number };
              Action.Ajax(url, temp, result => {
                  this.loading = false;
                  if (result.code != 200) {
                      // this.$toast.fail(result.remark);
                      return;
                  } else {
                      // console.log(result)
                  }
              })
        }else{
            Toast.fail(this.$t('lang.purchaseFailed'));
            res.buy_num = res.mini_num
            var number = res.buy_num-0
            var stock = res.num - 0
            if(number > stock){
                this.disabledyesofno = true
                Toast.fail(this.$t('lang.buzhu'));
            }else{
                this.disabledyesofno = false
            }
        }
    },
    // choice(judge,res,index,id){
    //   // console.log(judge,res,index)
    //   // console.log(this.news_List)
    //   // 商品求和
    //   console.log(id)
    //   console.log(this.list)
    //   if(judge == false || judge == "false"){
    //     console.log('为假')
    //     // console.log(this.list)
    //   }
    //   if(judge == true || judge == "true"){
    //     console.log(index +'---'+ id)
    //     console.log('为真')
    //     if(index == id){
    //       console.log(1)
    //     }
    //     // this.list.splice(id,1);
    //     // console.log(this.news_List)
    //     // console.log(this.list)
    //     // console.log(this.news_List)
    //     // console.log(this.list)
    //   }
    //   // if(judge == false){
    //   //   this.list.push(res)
    //   //   this.arr.push(res.price)
    //   //   this.addArr.push(res.buy_num)
    //   //   // this.arr = this.unique(this.list);
    //   //   const arrId = Array.from(new Set(this.list));
    //   //   const arrPrice = Array.from(new Set(this.arr));
    //   //   const arrBuy_num = Array.from(new Set(this.addArr));
    //   //   console.log(arrId)
    //   //   // console.log(arrId[0].id)
    //   //   // console.log(arrPrice)
    //   //   // console.log(arrBuy_num)
    //   // }
    //   // if(judge == true){
    //   //   console.log("为false")
    //   //   var xia = 
    //   //    this.list.splice(this.list,1);
    //   //   // for(let i = 0;i<this.list.length;i++){
    //   //   //     this.list.splice(this.list[i],1);
    //   //   // }
    //   //   console.log(this.list.length)
    //   //   console.log(this.list)
    //   //   // console.log(this.addArr)
    //   // }
    //   // list
      
    //   // console.log(this.typeCheckbox)
      
    //   // var one = this.list.join(',')
    //   // console.log(one)
    // },
    // 删除
    deletePerson(index,id){
        var url = '/app?op=Delete&cloud=bs_shop';
        var temp = { id };
        console.log(this.news_List)
        for(var i = 0;i<this.news_List.length;i++){
          var buy_numof = this.news_List[i].buy_num-0
          var numof = this.news_List[i].num-0
          if(buy_numof < numof){
              this.disabledyesofno = false
          }
        }
        Action.Ajax(url, temp, result => {
            // 加载状态结束
            this.loading = false;
            if (result.code != 200) {
                // this.$toast.fail(result.remark);
                return;
            } else {
                this.news_List.splice(index,1);
                // console.log(result)
                Toast.success(this.$t('lang.deleteSuccess'));
            }
        })
    },
    // 跳转
     onClickButton() {
       // 获取商品id
      for(var i = 0;i<this.news_List.length;i++){
        if (this.news_List[i].onYes == true || this.news_List[i].onYes == undefined) {
          this.commodityId.push(this.news_List[i].id)
        }
      }
      
      var bs_shop = this.commodityId.join(',')
      // console.log(this.commodityId)
      var url = '/cloud/oms/bs/info/order/OrderHandler?op=getOrderInfo';
      var temp = { bs_shop };
      if(this.news_List.length <= 0){
        Toast.fail(this.$t('lang.type.typeTx'));
      }else{
        Action.Ajax(url, temp, result => {
            if (result.code != 200) {
                // this.$toast.fail(result.remark);
                return;
            } else {
                this.$router.push({path:'/order',query:{bs_shop:bs_shop}});
                this.$store.CommodityOrder = temp 
            }
        })
      }
    },
    _getUser(){
       var url = '/cloud/oms/bs/info/order/OrderHandler?op=getUser';
       var temp = { };
       Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
              if(result.data.type.id == 1){
                  this.$store.judgeJinlai = 'noName'
              }
              if(result.data.type.id == 2){
                  this.$store.judgeJinlai = 'yesName'
                  // this.readonly = false
              }
          }
      })
    }
  },
}
</script>

<style scoped>
.type_wares_margin{margin-bottom: 90px;}
</style>