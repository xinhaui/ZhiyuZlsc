<template>
    <div style="background:#eeeeee">
        <!-- 导航栏 -->
        <!-- <van-nav-bar :title="homes.tiedas">
            <template #right>
                <van-icon name="search" size="25" />
            </template>
        </van-nav-bar> -->
        <!-- 搜索框 -->
        <div class="home_input" @click="search">
           <van-search
            v-model="value"
            shape="round"
            background="transparent"
            :placeholder="homes.crux"
            />
        </div>
        <van-tabs @click="onClickTabs" class="home_index">
            <!-- 热销 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/homes_R.png">
                    <div class="img_s_text">{{$t('lang.homes.cartWj')}}</div>
                </div>
            <van-list v-model="loading" :finished="finished" :finished-text="$t('lang.noNum')" @load="loadMore">
                <van-row class="home_row">
                    <van-col span="12" v-for="(item,index) in rows" :key='index'>
                    <!-- 商品内容 -->
                    <div @click="toDetails(item.id)" :style="{'marginTop':styles.goodsTop}">
                        <div class="home_goods_img" v-if="item.thumb">
                            <van-image  :src="item.thumb"></van-image>
                        </div>
                        <div class="home_goods_img" v-else>
                            <van-image lazy-load :src="array.imgays"/>
                        </div>
                        <div class="home_goods_type">
                            <div :style="{'height':styles.heights,'margin':styles.margins}">{{item.key_name}}</div>
                            <div>{{$t('lang.homes.model')}}：{{item.model}}</div>
                            <div class="home_goods_type_c home_goods_type_font">
                                <span>${{item.price}}</span>
                                <span :style="{'color':styles.red}">+IVA</span>
                            </div>
                            <div class="home_goods_type_c">
                                <span>{{$t('lang.homes.stock')}}：{{item.num}}</span>
                                <div>{{$t('lang.homes.norms')}}: {{item.spec}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 数量及购物车 -->
                    <div :style="{'marginTop':styles.marginTop}" class="home_goods_type_input">
                        <input type="text"  v-model="item.mini_num">
                        <span :style="{'fontWeight':styles.jgo}">{{item.unit.key_name}}</span>
                        <span class="home_goods_type_cart" @click="onClick(item)"><img src="../../assets/cart.png"></span>
                    </div>
                    </van-col>
                </van-row>
            </van-list>
            </van-tab>
            <!-- 新品 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img :style="({'width':styles.img_width,'height':styles.img_width})" src="../../assets/homes_X.png">
                    <div class="img_s_text">{{$t('lang.homes.cartRt')}}</div>
                </div>
                <van-list v-model="loading2" :finished="finished2" :finished-text="$t('lang.noNum')" @load="loadMore2">
                    <van-row class="home_row">
                    <div v-if="news_List2">
                        <van-col span="12" v-for="(item,index) in news_List2" :key='index'>
                        <!-- 商品内容 -->
                        <div @click="toDetails(item.id)" :style="{'marginTop':styles.goodsTop}">
                            <div class="home_goods_img" v-if="item.thumb">
                                <van-image  :src="item.thumb"></van-image>
                            </div>
                            <div class="home_goods_img" v-else>
                                <van-image lazy-load :src="array.imgays"/>
                            </div>
                            <div class="home_goods_type">
                                <div :style="{'height':styles.heights,'margin':styles.margins}">{{item.key_name}}</div>
                                <div>{{$t('lang.homes.model')}}：{{item.model}}</div>
                                <div class="home_goods_type_c home_goods_type_font">
                                    <span>${{item.price}}</span>
                                    <span :style="{'color':styles.red}">+IVA</span>
                                </div>
                                <div class="home_goods_type_c">
                                    <span>{{$t('lang.homes.stock')}}：{{item.num}}</span>
                                    <div>{{$t('lang.homes.norms')}}: {{item.spec}}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 数量及购物车 -->
                        <div :style="{'marginTop':styles.marginTop}" class="home_goods_type_input">
                            <input type="text"  v-model="item.mini_num">
                            <span :style="{'fontWeight':styles.jgo}">{{item.unit.key_name}}</span>
                            <span class="home_goods_type_cart" @click="onClick(item)"><img src="../../assets/cart.png"></span>
                        </div>
                        </van-col>
                    </div>
                    <div v-else>
                        <van-image lazy-load :src="array.imgays" :style="({'height':'315px'})"/>
                    </div>
                    </van-row>
                </van-list>
            </van-tab>
            <!-- 促销 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/homes_C.png">
                    <div class="img_s_text">{{$t('lang.homes.cartSg')}}</div>
                </div>
                <van-list v-model="loading3" :finished="finished3" :finished-text="$t('lang.noNum')" @load="loadMore3">
                    <van-row class="home_row">
                    <div v-if="news_List3">
                        <van-col span="12" v-for="(item,index) in news_List3" :key='index'>
                        <!-- 商品内容 -->
                        <div @click="toDetails(item.id)" :style="{'marginTop':styles.goodsTop}">
                            <div class="home_goods_img" v-if="item.thumb">
                                <van-image  :src="item.thumb"></van-image>
                            </div>
                            <div class="home_goods_img" v-else>
                                <van-image lazy-load :src="array.imgays"/>
                            </div>
                            <div class="home_goods_type">
                                <div :style="{'height':styles.heights,'margin':styles.margins}">{{item.key_name}}</div>
                                <div>{{$t('lang.homes.model')}}：{{item.model}}</div>
                                <div class="home_goods_type_c home_goods_type_font">
                                    <span>${{item.price}}</span>
                                    <span :style="{'color':styles.red}">+IVA</span>
                                </div>
                                <div class="home_goods_type_c">
                                    <span>{{$t('lang.homes.stock')}}：{{item.num}}</span>
                                    <div>{{$t('lang.homes.norms')}}: {{item.spec}}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 数量及购物车 -->
                        <div :style="{'marginTop':styles.marginTop}" class="home_goods_type_input">
                            <input type="text"  v-model="item.mini_num">
                            <span :style="{'fontWeight':styles.jgo}">{{item.unit.key_name}}</span>
                            <span class="home_goods_type_cart" @click="onClick(item)"><img src="../../assets/cart.png"></span>
                        </div>
                        </van-col>
                    </div>
                    <div v-else>
                        <van-image lazy-load :src="array.imgays" :style="({'height':'315px'})"/>
                    </div>
                    </van-row>
                </van-list>
            </van-tab>
        </van-tabs>
        <Navigation/>
    </div>
</template>

<script>
import Navigation from '../../components/navigation.vue'
import Swipe from '../../components/swipe.vue'
import {Action,Native,Http} from "@/lib/maui.min.js"
import Vue from 'vue';
import { Lazyload } from 'vant';
import { List } from 'vant';
import { Toast } from 'vant';

Vue.use(Toast);
Vue.use(List);
Vue.use(Lazyload);

export default {
    components:{
        Navigation,
        Swipe
    },
    data(){
        return{
            homes:{
                tiedas:this.$t('lang.homes.top'),
                crux:this.$t('lang.homes.crux'),
            },
            styles:{
                borderRight:'1px solid #666',
                red:'red',
                marginTop:'.5rem',
                jgo:'300',
                heights:'4rem',
                margins:'.5rem 0 0 0',
                goodsTop:'.5rem',
                img_width:'46px',
            },
            array:{
                imgays:require('../../assets/timg.png')
            },
            homeData:{
                mini_num:0
            },
            active: 2,
            value:'',
            loading:false,
            news_List:[],
            // thumb:[],
            finished: false,
            classification:'1',
            // 系统分页
            innerCloud: "bs_product",
            rows:[],
            table: {},
            pager: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            // 分类2
            loading2:false,
            finished2: false,
            innerCloud2: "bs_product",
            rows2:[],
            pager2: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List2:[],
            // 分类3
            loading3:false,
            finished3: false,
            innerCloud3: "bs_product",
            rows3:[],
            pager3: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List3:[],
        }
    },
    created(){
        // console.log(this.active)
        this.load();
        // this._home()
        this.load2();
        this.load3();
    },
    methods:{
        // 封装的退出登录方法
       
        toDetails(resId){
            this.$router.push({path:'/details',query:{ids:resId}});
        },
        search(){
            this.$router.push({path:'/search'});
        },
        onClickTabs(name) {
            this.classification = name+1
        },

        // 订单分页
        load(params) {
            if (params) {
                this.pager.params = params;
            } else {
                this.pager.params = {};
            }
            this.reload();
        },
        reload() { //重新加载
            this.pager.page = 1;
            this.rows = [];
            this.loadPage();
        },
        loadMore() {
            //未加载完，继续加载
            if (this.pager.total > this.pager.rows * this.pager.page) {
                this.pager.page++
                this.loadPage();
                //alert.log("loadMore");
            } else {
                
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        loadPage() { //继续加载,
            this.loading = true;
            Action.Page('bs_product[market1]', this.pager.params, this.pager.page, this.pager.rows, (result) => {
                this.loading = false;
                if (result.code == 200) {
                    this.rows = this.rows.concat(result.rows);
                    console.log(this.rows)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows = result.rows
                        if (rows[i].good_picture) {
                            for (var z = 0; z < rows[i].good_picture.length; z++) {
                                rows[i].thumb = Http.FullUrl(rows[i].good_picture[0].url)
                            }
                        }
                        rows[i].mini_numTwo = rows[i].mini_num
                    }
                    if (this.rows.length >= result.total) { //判断是否全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                    //alert(result.total);
                    this.pager.total = result.total;

                }
            });
        },// 订单分页-分类2
        load2(params2) {
            if (params2) {
                this.pager2.params = params2;
            } else {
                this.pager2.params = {};
            }
            this.reload2();
        },
        reload2() { //重新加载
            this.pager2.page = 1;
            this.rows2 = [];
            this.loadPage2();
        },
        loadMore2() {
            //未加载完，继续加载
            if (this.pager2.total > this.pager2.rows * this.pager2.page) {
                this.pager2.page++
                this.loadPage2();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage2() { //继续加载,
            this.loading2 = true;
            Action.Page('bs_product[market2]', this.pager2.params, this.pager2.page, this.pager2.rows, (result) => {
                this.loading2 = false;
                if (result.code == 200) {
                    this.rows2 = this.rows2.concat(result.rows);
                    console.log(this.rows2)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows2 = result.rows
                        if (rows2[i].good_picture) {
                            for (var z = 0; z < rows2[i].good_picture.length; z++) {
                                rows2[i].thumb = Http.FullUrl(rows2[i].good_picture[0].url)
                            }
                            rows2[i].mini_numTwo = rows2[i].mini_num
                        }
                        this.news_List2.push(rows2[i])
                    }
                    if (this.rows2.length >= result.total) { //判断是否全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                    //alert(result.total);
                    this.pager2.total = result.total;
                }
            });
        },
         // 订单分页-分类3
        load3(params3) {
            if (params3) {
                this.pager3.params = params3;
            } else {
                this.pager3.params = {};
            }
            this.reload3();
        },
        reload3() { //重新加载
            this.pager3.page = 1;
            this.rows3 = [];
            this.loadPage3();
        },
        loadMore3() {
            //未加载完，继续加载
            if (this.pager3.total > this.pager3.rows * this.pager3.page) {
                this.pager3.page++
                this.loadPage3();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage3() { //继续加载,
            this.loading3 = true;
            Action.Page('bs_product[market3]', this.pager3.params, this.pager3.page, this.pager3.rows, (result) => {
                this.loading3 = false;
                if (result.code == 200) {
                    this.rows3 = this.rows3.concat(result.rows);
                    console.log(this.rows3)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows3 = result.rows
                        if (rows3[i].good_picture) {
                            for (var z = 0; z < rows3[i].good_picture.length; z++) {
                                rows3[i].thumb = Http.FullUrl(rows3[i].good_picture[0].url)
                            }
                            rows3[i].mini_numTwo = rows3[i].mini_num
                        }
                        this.news_List3.push(rows3[i])
                    }
                    if (this.rows3.length >= result.total) { //判断是否全部加载完成
                        this.finished = true;
                    } else {
                        this.finished = false;
                    }
                    //alert(result.total);
                    this.pager3.total = result.total;
                }
            });
        },
        onClick(res){
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
            if(res.good_picture != undefined){
                var good_picture = res.good_picture[0].key_name
            }
            var url = '/app?op=Add&cloud=bs_shop';
            var temp = { product_name,buy_num,spec,model,price,num,unit,good_picture,mini_num };
            console.log(temp)
            if(res.mini_num < res.mini_numTwo){
                Toast.success(this.$t('lang.purchaseFailed'));
                res.mini_num = res.mini_numTwo
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
                        }
                    })
                }
            }
        }
    },
    computed:{
        
    }
}
</script>

<style scoped>
.van-image{height: 142px;}
.van-col--12{width: 48% !important;}
.van-image__img{border-radius: .5rem}

</style>