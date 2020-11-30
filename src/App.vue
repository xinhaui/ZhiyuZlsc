<template>
  <div id="app" :style="height">
    <router-view class="router"></router-view>
    <BasePicker ref="basePicker" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import Vant from 'vant';
  import 'vant/lib/index.css';
  import VueAMap from 'vue-amap'
  import {Action} from '@/lib/maui.min.js'
  import {BasePicker} from '@/lib/maui.min.js'


  Vue.use(Vant);
  Vue.use(VueAMap);
//放到Mapview会导致打包后引用报错
  VueAMap.initAMapApiLoader({
        key: 'f65312acbebb31863bbf2bd122efebc2',
        plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder','AMap.Geolocation'],
        v: '1.4.15'
  });
  export default {
    name: 'app',
  components: {
    BasePicker
  },
    data() {
      return {
        os:"", //ios / android / web
        server:"", // pass
        subname:"", //公司名
        copyright:"@深圳青虹 2015-2019",
        supplier:"青虹云提供应用服务",
        user:{id:"", key_name:"", password:""},
        device:{}, //设备信息
        height:{height:''}
      }
    },
    created:function()
    {
      this.server=window.args.server; //测试配置
      this.subname=window.args.subname;
      
      window.app=this; //将App对象绑定到window对象作为全局变量
      //测试配置
      //window.init("ios", "http://localhost:8080", "680", "c8c605999f3d8352d7bb792cf3fdb25b");

      var udata=sessionStorage.getItem('USER');
      if(udata==undefined)
      {
        this.$router.replace({path:'/login'});
      }
      else
      {
        this.user=JSON.parse(udata);
        this.$router.replace({path:'/main'});
      }
      this._height()
    },
    methods:{
      _height(){
        this.height.height=window.innerHeight+'px';
      },
      showAurl(aurl) {
        if(aurl.type=="TAB") {
          this.$router.push({path:'/tablist', query:aurl});
        } else if(aurl.op) {
            if(aurl.op=="List") {
              this.$router.push({path:'/list', query:{cloud:aurl.cloud}})
            } else {
              this.$router.push({path:'/form', query:{cloud:aurl.cloud, op:aurl.op}});
            }
          } else {
            this.$router.push({path:aurl.url});
          }
      },
      showPicker(field, query, callback) {
        this.$refs.basePicker.showPicker(field, query, callback);
      },
      webCall(aurl) { //处理原生调用
        if(aurl.op=="Back") { 
          if(this.$refs.basePicker.visiable==true) {
            this.$refs.basePicker.hide();
          } else {
          this.$router.go(-1);
          }
      } else {
        this.showAurl(aurl);
        }
      }

    }

  }
</script>

<!-- 全局样式 -->
<style>
  a{
    text-decoration: none;
    color: black;
  }
  * {
    padding: 0;
    margin: 0;
  }
  html{
    padding: 0;
    margin: 0;
    height: 100%;
  }
  body {
    background-color:white;
    height:100%;
    width:100%;
    margin:0px;
    padding:0px;
    /* display: table; */
  }
  #app {
    width: 100%;
    height: 100%;
    /* display: table-cell; */
    vertical-align: middle;
    /* text-align:center; */
    /* background-color: #eeeeee !important; */
  }
  #app .router {
    /* overflow-x: hidden; */
    max-height: 100%;
  }
  .van-cell-group__title {
    background-color: #F3F3F3;
  }
  .page {
    width:100%;
    margin-top:56px;
    background-color:white;
  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
