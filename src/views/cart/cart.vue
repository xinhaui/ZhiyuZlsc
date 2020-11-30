<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar :title="lang.tiedas" @click-right="onClickRight">
            <template #right>
                <van-icon name="search" size="25" />
            </template>
        </van-nav-bar>
        <!-- 搜索框 -->
        <van-tabs @click="onClickTabs">
            <!-- 内容-五金 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/sort_Wj.png">
                    <div class="img_s_text">{{$t('lang.cart.cartWj')}}</div>
                </div>
                <!-- 内容-五金-商品 -->
                <van-list v-model="loading1" :finished="finished1" :finished-text="$t('lang.noNum')" @load="loadMore1">
                    <van-row class="home_row">
                    <div v-if="news_List1">
                        <van-col span="12" v-for="(item,index) in news_List1" :key='index'>
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
            <!-- 内容2 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/sort_Lt.png">
                    <div class="img_s_text">{{$t('lang.cart.cartRt')}}</div>
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
            <!-- 内容3 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/sort_Sg.png">
                    <div class="img_s_text">{{$t('lang.cart.cartSg')}}</div>
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
            <!-- 内容4 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img :style="({'width':styles.img_width,'height':styles.img_width})" src="../../assets/sort_Zd.png">
                    <div class="img_s_text" :style="({'marginTop':styles.img_text})">{{$t('lang.cart.cartZd')}}</div>
                </div>
                <van-list v-model="loading4" :finished="finished4" :finished-text="$t('lang.noNum')" @load="loadMore4">
                    <van-row class="home_row">
                    <div v-if="news_List4">
                        <van-col span="12" v-for="(item,index) in news_List4" :key='index'>
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
            <!-- 内容5 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/sort_Dz.png">
                    <div class="img_s_text">{{$t('lang.cart.cartDd')}}</div>
                </div>
                <van-list v-model="loading5" :finished="finished5" :finished-text="$t('lang.noNum')" @load="loadMore5">
                    <van-row class="home_row">
                    <div v-if="news_List5">
                        <van-col span="12" v-for="(item,index) in news_List5" :key='index'>
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




            <!-- 内容6 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/sort_Jz.png">
                    <div class="img_s_text">{{$t('lang.cart.cartJy')}}</div>
                </div>
                <van-list v-model="loading6" :finished="finished6" :finished-text="$t('lang.noNum')" @load="loadMore6">
                    <van-row class="home_row">
                    <div v-if="news_List6">
                        <van-col span="12" v-for="(item,index) in news_List6" :key='index'>
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
            <!-- 内容7 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img :style="({'width':styles.img_width,'height':styles.img_width})" src="../../assets/sort_Jy.png">
                    <div class="img_s_text" :style="({'marginTop':styles.img_text})">{{$t('lang.cart.cartJz')}}</div>
                </div>
                <van-list v-model="loading7" :finished="finished7" :finished-text="$t('lang.noNum')" @load="loadMore7">
                    <van-row class="home_row">
                    <div v-if="news_List7">
                        <van-col span="12" v-for="(item,index) in news_List7" :key='index'>
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
            <!-- 内容8 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img src="../../assets/sort_Hy.png">
                    <div class="img_s_text">{{$t('lang.cart.cartHy')}}</div>
                </div>
                <van-list v-model="loading8" :finished="finished8" :finished-text="$t('lang.noNum')" @load="loadMore8">
                    <van-row class="home_row">
                    <div v-if="news_List8">
                        <van-col span="12" v-for="(item,index) in news_List8" :key='index'>
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
            <!-- 内容9 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img :style="({'width':styles.img_width,'height':styles.img_width})" src="../../assets/sort_Yq.png">
                    <div class="img_s_text" :style="({'marginTop':styles.img_text})">{{$t('lang.cart.cartYq')}}</div>
                </div>
                <van-list v-model="loading9" :finished="finished9" :finished-text="$t('lang.noNum')" @load="loadMore9">
                    <van-row class="home_row">
                    <div v-if="news_List9">
                        <van-col span="12" v-for="(item,index) in news_List9" :key='index'>
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
            <!-- 内容10 -->
            <van-tab>
                <div slot="title" class="img_s">
                    <img  src="../../assets/sort_aa.png">
                    <div class="img_s_text">{{$t('lang.cart.cartAq')}}</div>
                </div>
                <van-list v-model="loading10" :finished="finished10" :finished-text="$t('lang.noNum')" @load="loadMore10">
                    <van-row class="home_row">
                    <div v-if="news_List10">
                        <van-col span="12" v-for="(item,index) in news_List10" :key='index'>
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

Vue.use(List);
Vue.use(Lazyload);

export default {
    components:{
        Navigation,
        Swipe
    },
    data(){
        return{
            lang:{
                tiedas:this.$t('lang.cart.top'),
                crux:this.$t('lang.homes.crux'),
            },
            styles:{
                borderRight:'1px solid #666',
                red:'red',
                marginTop:'.5rem',
                jgo:'300',
                heights:'4rem',
                margins:'.5rem 0 0 0',
                img_width:'33px',
                img_text:'5px',
            },
            array:{
                imgays:require('../../assets/timg.png')
            },
            active: 2,
            value:'',
            news_List:[],
            classification:'1',
            // 分类1
            loading1:false,
            finished1: false,
            innerCloud1: "bs_product",
            rows1:[],
            pager1: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List1:[],
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
            // 分类4
            loading4:false,
            finished4: false,
            innerCloud4: "bs_product",
            rows4:[],
            pager4: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List4:[],
            // 分类5
            loading5:false,
            finished5: false,
            innerCloud5: "bs_product",
            rows5:[],
            pager5: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List5:[],
            // 分类6
            loading6:false,
            finished6: false,
            innerCloud6: "bs_product",
            rows6:[],
            pager6: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List6:[],
            // 分类7
            loading7:false,
            finished7: false,
            innerCloud7: "bs_product",
            rows7:[],
            pager7: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List7:[],
            // 分类8
            loading8:false,
            finished8: false,
            innerCloud8: "bs_product",
            rows8:[],
            pager8: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List8:[],
            // 分类9
            loading9:false,
            finished9: false,
            innerCloud9: "bs_product",
            rows9:[],
            pager9: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List9:[],
            // 分类10
            loading10:false,
            finished10: false,
            innerCloud10: "bs_product",
            rows10:[],
            pager10: {
                total: 0, //总数
                page: 1, //页号
                rows: 10, //行数
                params: {} //查询条件
            },
            news_List10:[],
        }
    },
    created(){
        // console.log(this.active)
        this.load1();
        this.load2();
        this.load3();
        this.load4();
        this.load5();
        this.load6();
        this.load7();
        this.load8();
        this.load9();
        this.load10();
    },
    methods:{
        // 封装的退出登录方法
        logout(){
          Action.Logout(result=>{
                
          });
          this.$router.push({path:'/login', query:{reload:true}});
        },
        onClickRight(){
            this.$router.push('/search')
        },
        onClickTabs(name) {
            this.classification = name+1
            console.log(this.classification)
        },
        // 跳转到搜索页
         toDetails(resId){
            this.$router.push({path:'/details',query:{ids:resId}});
        },
        // 订单分页-分类1
        load1(params1) {
            if (params1) {
                this.pager1.params = params1;
            } else {
                this.pager1.params = {};
            }
            this.reload1();
        },
        reload1() { //重新加载
            this.pager1.page = 1;
            this.rows1 = [];
            this.loadPage1();
        },
        loadMore1() {
            //未加载完，继续加载
            if (this.pager1.total > this.pager1.rows * this.pager1.page) {
                this.pager1.page++
                this.loadPage1();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage1() { //继续加载,
            this.loading1 = true;
            Action.Page('bs_product[type1]', this.pager1.params, this.pager1.page, this.pager1.rows, (result) => {
                this.loading1 = false;
                if (result.code == 200) {
                    this.rows1 = this.rows1.concat(result.rows);
                    console.log(this.rows1)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows1 = result.rows
                        if (rows1[i].good_picture) {
                            for (var z = 0; z < rows1[i].good_picture.length; z++) {
                                rows1[i].thumb = Http.FullUrl(rows1[i].good_picture[0].url)
                            }
                            rows1[i].mini_numTwo = rows1[i].mini_num
                        }
                        this.news_List1.push(rows1[i])
                    }
                    if (this.rows1.length >= result.total) { //判断是否全部加载完成
                        this.finished1 = true;
                    } else {
                        this.finished1 = false;
                    }
                    //alert(result.total);
                    this.pager1.total = result.total;
                }
            });
        },
        // 订单分页-分类2
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
            Action.Page('bs_product[type2]', this.pager2.params, this.pager2.page, this.pager2.rows, (result) => {
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
                        this.finished2 = true;
                    } else {
                        this.finished2 = false;
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
            Action.Page('bs_product[type3]', this.pager3.params, this.pager3.page, this.pager3.rows, (result) => {
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
                        this.finished3 = true;
                    } else {
                        this.finished3 = false;
                    }
                    //alert(result.total);
                    this.pager3.total = result.total;
                }
            });
        },
        // 订单分页-分类4
        load4(params4) {
            if (params4) {
                this.pager4.params = params4;
            } else {
                this.pager4.params = {};
            }
            this.reload4();
        },
        reload4() { //重新加载
            this.pager4.page = 1;
            this.rows4 = [];
            this.loadPage4();
        },
        loadMore4() {
            //未加载完，继续加载
            if (this.pager4.total > this.pager4.rows * this.pager4.page) {
                this.pager4.page++
                this.loadPage4();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage4() { //继续加载,
            this.loading4 = true;
            Action.Page('bs_product[type4]', this.pager4.params, this.pager4.page, this.pager4.rows, (result) => {
                this.loading4 = false;
                if (result.code == 200) {
                    this.rows4 = this.rows4.concat(result.rows);
                    console.log(this.rows4)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows4 = result.rows
                        if (rows4[i].good_picture) {
                            for (var z = 0; z < rows4[i].good_picture.length; z++) {
                                rows4[i].thumb = Http.FullUrl(rows4[i].good_picture[0].url)
                            }
                            rows4[i].mini_numTwo = rows4[i].mini_num
                        }
                        this.news_List4.push(rows4[i])
                    }
                    if (this.rows4.length >= result.total) { //判断是否全部加载完成
                        this.finished4 = true;
                    } else {
                        this.finished4 = false;
                    }
                    //alert(result.total);
                    this.pager4.total = result.total;
                }
            });
        },
        // 订单分页-分类5
        load5(params5) {
            if (params5) {
                this.pager5.params = params5;
            } else {
                this.pager5.params = {};
            }
            this.reload5();
        },
        reload5() { //重新加载
            this.pager5.page = 1;
            this.rows5 = [];
            this.loadPage5();
        },
        loadMore5() {
            //未加载完，继续加载
            if (this.pager5.total > this.pager5.rows * this.pager5.page) {
                this.pager5.page++
                this.loadPage5();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage5() { //继续加载,
            this.loading5 = true;
            Action.Page('bs_product[type5]', this.pager5.params, this.pager5.page, this.pager5.rows, (result) => {
                this.loading5 = false;
                if (result.code == 200) {
                    this.rows5 = this.rows5.concat(result.rows);
                    console.log(this.rows5)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows5 = result.rows
                        if (rows5[i].good_picture) {
                            for (var z = 0; z < rows5[i].good_picture.length; z++) {
                                rows5[i].thumb = Http.FullUrl(rows5[i].good_picture[0].url)
                            }
                            rows5[i].mini_numTwo = rows5[i].mini_num
                        }
                        this.news_List5.push(rows5[i])
                    }
                    if (this.rows5.length >= result.total) { //判断是否全部加载完成
                        this.finished5 = true;
                    } else {
                        this.finished5 = false;
                    }
                    //alert(result.total);
                    this.pager5.total = result.total;
                }
            });
        },
        // 订单分页-分类6
        load6(params6) {
            if (params6) {
                this.pager6.params = params6;
            } else {
                this.pager6.params = {};
            }
            this.reload6();
        },
        reload6() { //重新加载
            this.pager6.page = 1;
            this.rows6 = [];
            this.loadPage6();
        },
        loadMore6() {
            //未加载完，继续加载
            if (this.pager6.total > this.pager6.rows * this.pager6.page) {
                this.pager6.page++
                this.loadPage6();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage6() { //继续加载,
            this.loading6 = true;
            Action.Page('bs_product[type6]', this.pager6.params, this.pager6.page, this.pager6.rows, (result) => {
                this.loading6 = false;
                if (result.code == 200) {
                    this.rows6 = this.rows6.concat(result.rows);
                    console.log(this.rows6)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows6 = result.rows
                        if (rows6[i].good_picture) {
                            for (var z = 0; z < rows6[i].good_picture.length; z++) {
                                rows6[i].thumb = Http.FullUrl(rows6[i].good_picture[0].url)
                            }
                            rows6[i].mini_numTwo = rows6[i].mini_num
                        }
                        this.news_List6.push(rows6[i])
                    }
                    if (this.rows6.length >= result.total) { //判断是否全部加载完成
                        this.finished6 = true;
                    } else {
                        this.finished6 = false;
                    }
                    //alert(result.total);
                    this.pager6.total = result.total;
                }
            });
        },
        // 订单分页-分类7
        load7(params7) {
            if (params7) {
                this.pager7.params = params7;
            } else {
                this.pager7.params = {};
            }
            this.reload7();
        },
        reload7() { //重新加载
            this.pager7.page = 1;
            this.rows7 = [];
            this.loadPage7();
        },
        loadMore7() {
            //未加载完，继续加载
            if (this.pager7.total > this.pager7.rows * this.pager7.page) {
                this.pager7.page++
                this.loadPage7();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage7() { //继续加载,
            this.loading7 = true;
            Action.Page('bs_product[type7]', this.pager7.params, this.pager7.page, this.pager7.rows, (result) => {
                this.loading7 = false;
                if (result.code == 200) {
                    this.rows7 = this.rows7.concat(result.rows);
                    console.log(this.rows7)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows7 = result.rows
                        if (rows7[i].good_picture) {
                            for (var z = 0; z < rows7[i].good_picture.length; z++) {
                                rows7[i].thumb = Http.FullUrl(rows7[i].good_picture[0].url)
                            }
                            rows7[i].mini_numTwo = rows7[i].mini_num
                        }
                        this.news_List7.push(rows7[i])
                    }
                    if (this.rows7.length >= result.total) { //判断是否全部加载完成
                        this.finished7 = true;
                    } else {
                        this.finished7 = false;
                    }
                    //alert(result.total);
                    this.pager7.total = result.total;
                }
            });
        },
        // 订单分页-分类8
        load8(params8) {
            if (params8) {
                this.pager8.params = params8;
            } else {
                this.pager8.params = {};
            }
            this.reload8();
        },
        reload8() { //重新加载
            this.pager8.page = 1;
            this.rows8 = [];
            this.loadPage8();
        },
        loadMore8() {
            //未加载完，继续加载
            if (this.pager8.total > this.pager8.rows * this.pager8.page) {
                this.pager8.page++
                this.loadPage8();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage8() { //继续加载,
            this.loading8 = true;
            Action.Page('bs_product[type8]', this.pager8.params, this.pager8.page, this.pager8.rows, (result) => {
                this.loading8 = false;
                if (result.code == 200) {
                    this.rows8 = this.rows8.concat(result.rows);
                    console.log(this.rows8)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows8 = result.rows
                        if (rows8[i].good_picture) {
                            for (var z = 0; z < rows8[i].good_picture.length; z++) {
                                rows8[i].thumb = Http.FullUrl(rows8[i].good_picture[0].url)
                            }
                            rows8[i].mini_numTwo = rows8[i].mini_num
                        }
                        this.news_List8.push(rows8[i])
                    }
                    if (this.rows8.length >= result.total) { //判断是否全部加载完成
                        this.finished8 = true;
                    } else {
                        this.finished8 = false;
                    }
                    //alert(result.total);
                    this.pager8.total = result.total;
                }
            });
        },
        // 订单分页-分类9
        load9(params9) {
            if (params9) {
                this.pager9.params = params9;
            } else {
                this.pager9.params = {};
            }
            this.reload9();
        },
        reload9() { //重新加载
            this.pager9.page = 1;
            this.rows9 = [];
            this.loadPage9();
        },
        loadMore9() {
            //未加载完，继续加载
            if (this.pager9.total > this.pager9.rows * this.pager9.page) {
                this.pager9.page++
                this.loadPage9();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage9() { //继续加载,
            this.loading9 = true;
            Action.Page('bs_product[type9]', this.pager9.params, this.pager9.page, this.pager9.rows, (result) => {
                this.loading9 = false;
                if (result.code == 200) {
                    this.rows9 = this.rows9.concat(result.rows);
                    console.log(this.rows9)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows9 = result.rows
                        if (rows9[i].good_picture) {
                            for (var z = 0; z < rows9[i].good_picture.length; z++) {
                                rows9[i].thumb = Http.FullUrl(rows9[i].good_picture[0].url)
                            }
                            rows9[i].mini_numTwo = rows9[i].mini_num
                        }
                        this.news_List9.push(rows9[i])
                    }
                    if (this.rows9.length >= result.total) { //判断是否全部加载完成
                        this.finished9 = true;
                    } else {
                        this.finished9 = false;
                    }
                    //alert(result.total);
                    this.pager9.total = result.total;
                }
            });
        },
        // 订单分页-分类10
        load10(params10) {
            if (params10) {
                this.pager10.params = params10;
            } else {
                this.pager10.params = {};
            }
            this.reload10();
        },
        reload10() { //重新加载
            this.pager10.page = 1;
            this.rows10 = [];
            this.loadPage10();
        },
        loadMore10() {
            //未加载完，继续加载
            if (this.pager10.total > this.pager10.rows * this.pager10.page) {
                this.pager10.page++
                this.loadPage10();
            } else {
                //alert("总数 "+this.pager.total, "已加载 "+this.pager.rows*this.pager.page);
            }
        },
        
        loadPage10() { //继续加载,
            this.loading10 = true;
            Action.Page('bs_product[type10]', this.pager10.params, this.pager10.page, this.pager10.rows, (result) => {
                this.loading10 = false;
                if (result.code == 200) {
                    this.rows10 = this.rows10.concat(result.rows);
                    console.log(this.rows10)
                    for (var i = 0; i < result.rows.length; i++) {
                        let rows10 = result.rows
                        if (rows10[i].good_picture) {
                            for (var z = 0; z < rows10[i].good_picture.length; z++) {
                                rows10[i].thumb = Http.FullUrl(rows10[i].good_picture[0].url)
                            }
                            rows10[i].mini_numTwo = rows10[i].mini_num
                        }
                        this.news_List10.push(rows10[i])
                    }
                    if (this.rows10.length >= result.total) { //判断是否全部加载完成
                        this.finished10 = true;
                    } else {
                        this.finished10 = false;
                    }
                    //alert(result.total);
                    this.pager10.total = result.total;
                }
            });
        },
        // // 数据渲染及操作
        //  onLoad() {
        //     // 异步更新数据
        //     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        //     setTimeout(() => {
        //         var url = '/cloud/oms/zlapp/SellApiUtil?op=ProductList';
        //         var temp = {};
        //         Action.Ajax(url, temp, result => {
        //             // 加载状态结束
        //             this.loading = false;
        //             if (result.code != 200) {
        //                 this.$toast.fail(result.remark);
        //                 return;
        //             } else {
        //                 let rows = result.rows
        //                 for (var i = 0; i < rows.length; i++) {
        //                     if (rows[i].good_picture) {
        //                         for (var z = 0; z < rows[i].good_picture.length; z++) {
        //                             rows[i].thumb = Http.FullUrl(rows[i].good_picture[0].url)
        //                         }
        //                     }
        //                 }
        //                 this.news_List = rows
        //                 for(let i = 0;i<rows.length;i++){
        //                     if(rows[i].type != undefined){
        //                         if(rows[i].type.id == '1'){
        //                             this.news_List1.push(rows[i])
        //                         }
        //                         if(rows[i].type.id == '2'){
        //                             this.news_List4.push(rows[i])
        //                         }
        //                         if(rows[i].type.id == '3'){
        //                             this.news_List2.push(rows[i])
        //                         }
        //                         if(rows[i].type.id == '4'){
        //                             this.news_List3.push(rows[i])
        //                         }
        //                         if(rows[i].type.id == '5'){
        //                             this.news_List5.push(rows[i])
        //                         }
        //                     }
                            
        //                 }
        //                 var listLength = this.news_List.length +1
        //                 if (this.news_List.length <= listLength) {
        //                     this.finished = true;
        //                 }
        //             }
        //         })
        //         // 数据全部加载完成
        //     });
        // },
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
            if(res.mini_num < res.mini_numTwo){
                Toast.success(this.$t('lang.purchaseFailed'));
                res.mini_num = res.mini_numTwo
            }else{
                if(ifBuy_num > ifNum || ifNum == 0){
                    Toast.fail(this.$t('lang.buzhu'));
                }else{
                    Action.Ajax(url, temp, result => {
                        if (result.code != 200) {
                            this.$toast.fail(this.$t('lang.Errordered'));
                            return;
                        } else {
                            Toast.success(this.$t('lang.goumai'));
                        }
                    })
                }
            }
        }
    }
}
</script>

<style scoped>
.van-image{height: 142px;}
.van-col--12{width: 48% !important;}
.van-image__img{border-radius: .5rem}
/* .img_Zd img{width: 40px;height: 40px;} */
</style>