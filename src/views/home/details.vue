<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="lang.tiedas" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="cart-o" size="25" />
        </template>
    </van-nav-bar>
    <!-- 内容-商品图片 -->
    <div class="details_content">
      <div class="details_goods_picture" v-if="arrays != 0">
        <van-swipe @change="onChange">
          <van-swipe-item v-for="(item,index) in array" :key="index">
            <van-image lazy-load :src="item" @click="getImg(array,index)">
                <template v-slot:loading>
                    <van-loading class="home_loading" type="spinner" size="20"/>
                </template>
            </van-image>
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{arrays}}
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="details_goods_picture" v-else>
          <van-image lazy-load :src="arrayNo.imgays"/>
      </div>
      <!-- 内容-商品详情 -->
      <div class="details_goods">
        <div class="details_goods_name">{{content.key_name}}</div>
        <div class="details_goods_describe">
          <span>{{$t('lang.details.goodyxh')}}：{{content.model}}</span><br>
          <span>{{$t('lang.details.goodypp')}}：{{content.brand}}</span>
          <!-- <span>{{$t('lang.details.goodyzk')}}：{{content.discount_rate}}%</span> -->
        </div>
        <div class="details_goods_price">
          <!-- <divclass="details_iva">+IVA</div> -->
          <div :style="{'color':styles.d}">{{$t('lang.details.goodydj')}}：$ {{content.price}} <i :style="{'color':styles.iva}" >+IVA</i></div>
          <div>{{$t('lang.details.goodysy')}}：{{content.num}} {{content.unit.key_name}}</div>
        </div>
        <div class="details_goods_describe">{{$t('lang.details.goodyqd')}}：{{content.mini_num}}</div>
        <div class="details_goods_describe">{{$t('lang.details.goodybz')}}：{{content.spec}}</div>
        <div class="details_goods_details">
            <div>{{content.spec_describe}}</div>
        </div>
        <div class="details_goods_details_button">
          <van-button :style="({'background':'rgba(255,102,0,1)'})" type="primary" size="mini" @click="showPopup">{{$t('lang.details.goodyjr')}}</van-button>
          <van-button type="primary" size="mini" @click="onClickLeft">{{$t('lang.details.goodyfh')}}</van-button>
        </div>
      </div>  
    </div>
    <!-- 加入购物车弹出层 -->
    <van-popup v-model="show" closeable close-icon="close" position="bottom" :style="{ height: '60%' }">
      <div class="details_popup">
        <div class="details_popup_top" v-if="popup.imgay">
            <van-image lazy-load :src="popup.imgay"/>
        </div>
        <div class="details_popup_top" v-else>
            <van-image lazy-load :src="arrayNo.imgays"/>
        </div>
        <div class="details_popup_tops"></div>
        <div class="details_popup_input">
          <div><span>{{$t('lang.details.goodygm')}}</span><input type="text" v-model="popup.mini_num"></div>
          <div><span>{{$t('lang.details.goodysykc')}}</span><input type="text" v-model="popup.num" readonly disabled></div>
        </div>
        <div class="details_popup_button">
          <van-button type="primary" block @click="onPopup">{{$t('lang.details.goodyjr')}}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {Action,Native,Http} from "@/lib/maui.min.js"
import Vue from 'vue'
import { ImagePreview,Toast } from "vant"

Vue.use(ImagePreview,Toast);
export default {
  data(){
    return{
      lang:{
          tiedas:this.$t('lang.details.top')
      },
      styles:{
          d:'rgba(255, 102, 0, 1)',
          iva:'red'
      },
      content:{
          key_name:'',
          model:'',
          brand:'',
          price:'',
          num:'',
          unit:{
            key_name:'',
            id:''
          },
          mini_num:'',
          spec:'',
          spec_describe:'',
          discount_rate:'',
          img:{
            key_name:''
          }
      },
      array:[],
      arrayNo:{
          imgay:'https://img.yzcdn.cn/vant/cat.jpeg',
          imgays:require('../../assets/timg.png')
      },
      arraytwo:[],
      arrays:0,
      current: 0,
      myNumber:'',
      show: false,
      popup:{
        imgay:'',
        mini_num:'',
        mini_numTwo:'',
        num:''
      }
    }
  },
  created(){
    this.myNumber = this.$route.query.ids;
    this._ajax()
  },
  methods:{
      onClickLeft(){
        this.$router.go(-1);
      },
      onClickRight(){
        this.$router.push('/type')
      },
      // 渲染
      _ajax(){
        var url = '/cloud/oms/bs/info/product/ProductHandler?op=findProductDetail';
        var id = this.myNumber
        var temp = { id };
        Action.Ajax(url, temp, result => {
          if (result.code != 200) {
              // this.$toast.fail(result.remark);
              return;
          } else {
            console.log(result)
              if(result.rows[0].good_picture.length >= 1){
                for(var i = 0;i<result.rows[0].good_picture.length;i++){
                    for (var z = 0; z < result.rows[0].good_picture.length; z++) {
                        this.array[z] = result.rows[0].good_picture[z].url
                    }
                }
                // 弹窗数据
                this.popup.imgay = result.rows[0].good_picture[0].url
                this.content.img.key_name = result.rows[0].good_picture[0].key_name
              }
             
              this.arrays = result.rows[0].good_picture.length
              this.content.key_name = result.rows[0].key_name
              this.content.model = result.rows[0].model
              this.content.brand = result.rows[0].brand
              this.content.price = result.rows[0].price
              this.content.num = result.rows[0].num
              this.content.unit.key_name = result.rows[0].unit.key_name
              this.content.unit.id = result.rows[0].unit.id
              this.content.mini_num = result.rows[0].mini_num
              this.content.spec = result.rows[0].spec
              this.content.spec_describe = result.rows[0].spec_describe
              this.content.discount_rate = result.rows[0].discount_rate
              this.popup.mini_num = result.rows[0].mini_num
              this.popup.mini_numTwo = result.rows[0].mini_num
              this.popup.num = result.rows[0].num
          }
        })
      },
      onChange(index) {
        this.current = index;
      },
      getImg(images,index){
        ImagePreview({
            images:images,
            showIndex:true,
            loop:true, //是否循环播放
            startPosition:index
        })
      },
      showPopup() {
        this.show = true;
      },
      onPopup(){
        var product_name = this.myNumber
        var buy_num = this.popup.mini_num
        var spec = this.content.spec
        var model = this.content.model
        var price = this.content.price
        var num = this.popup.num
        var unit = this.content.unit.id
        var ifBuy_num = this.popup.mini_num-0
        var ifNum = this.popup.num-0
        if(this.arrays != 0){
            var good_picture = this.content.img.key_name
        }
        var url = '/app?op=Add&cloud=bs_shop';
          var temp = { product_name,buy_num,spec,model,price,num,unit,good_picture };
          if(this.popup.mini_numTwo > this.popup.mini_num){
              Toast.success(this.$t('lang.purchaseFailed'));
              this.popup.mini_num = this.popup.mini_numTwo
          }else{
              if(ifBuy_num > ifNum || ifNum == 0){
                  Toast.fail(this.$t('lang.buzhu'));
              }else{
                Action.Ajax(url, temp, result => {
                    if (result.code != 200) {
                        // this.$toast.fail(this.$t('lang.Errordered'));
                        return;
                    } else {
                        Toast.success(this.$t('lang.goumai'));
                        this.show = false;
                    }
                })
              }
          }
      }
  },
}
</script>
<style scoped>
.van-swipe{height: 100%;}
.details_goods_price{font-size:1.1rem;font-weight:600;height:auto}
/* .details_iva{float: right;} */
.details_goods_price span:nth-child(2){margin:.2rem 0 0 .5rem}
.details_popup_button .van-button--block{border-radius: .8em;}
.details_goods_details{min-height: 60px;}
</style>