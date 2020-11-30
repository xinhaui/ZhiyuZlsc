<template>
  <div class="login">
    <div>
      <div class="logo_img">
        <img class="logo" :src="array.imgays" @click="showDev" width="60" height="60">
        <a class="register" v-if="showSubname"  @click="toRegister">注册用户</a>
      </div>
      <!-- {{title}} -->
      <h2 class="title">{{$t('lang.logins.welcome')}}</h2>
      <form :model="form" :rules="rules" ref="form">
        <van-field v-if="showSubname" left-icon="wap-home" placeholder="公司帐户" v-model="form.subname" clearable size="large" @change="onChangeSubname"/>
        <van-field left-icon="contact" :placeholder="lang.username" v-model="form.username" clearable size="large"/>
        <van-field left-icon="warn-o" :placeholder="lang.password" type="password" v-model="form.password" auto-complete="off" @keyup.enter.native="onLogin" clearable size="large"/>
      </form>
      <van-cell>
          <van-button :disabled='yesDisabled' class="submit" type="info" @click="onLogin" >{{$t('lang.logins.determine')}}</van-button>
        </van-cell>
      <van-cell class="footer">
        <!-- <p class="copyright">{{copyright}}</p> -->
      </van-cell>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Action,Native} from '@/lib/maui.min.js';
  import { Toast, Dialog ,ValidatorUtils,Cookie,Http} from 'vant';
  import {  Checkbox } from 'vant';
  import md5 from 'js-md5';
  Vue.use(Toast, Dialog);
  Vue.use(Checkbox);

  //Vue.use(Toast, Dialog);

  export default {
    name: "Login",
    components: {},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validateUser = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入账号'));
        } else if(!ValidatorUtils.AccountValidator(value,3,16)){
          callback(new Error('账号格式为3-16位数字或字母'));
        }else{
          callback();
        }
      };
      var validateSubname = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入账户'));
        } else if(!ValidatorUtils.AccountValidator(value,3,16)){
          callback(new Error('账户格式为3-16位数字或字母'));
        }else{
          callback();
        }
      };
      return {
        visiable: false,
        remember: true,
        repwd: false,
        title:"青虹云",
        type:"APAAS",
        cookiepwd: '',
        devcount:0,//点击3次进入开发模式
        loading: false,
        showSubname: true,
        copyright:"",
        form: {
          subname: '',
          username: '',
          password: ''
        },
        lang:{
          username:this.$t('lang.logins.username'),
          password:this.$t('lang.logins.password')
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          username: [
            {validator: validateUser, trigger: 'blur'}
          ],
          subname: [
            {validator: validateSubname, trigger: 'blur'}
          ]
        },
        array:{
          // imgays:require('../../static/images/app_logo.png'),
          imgays:require('../../static/images/logo_c.png'),
        },
        yesDisabled:false
      };
    },
    mounted() {
      this.title=window.args.title; 
      this.copyright=window.args.copyright;
      if(window.args.subname) {
        this.showSubname=false;
        this.form.subname=window.args.subname;
      }
      Native.Load("USER", result=>{
        if (result.data && result.data.username) {
          this.loadAccountInfo(result.data);
        } else {
        }
      });
      Native.Load("CLIENT", (result)=> {
       window.app.device=result.data;
      });
      
    },
    created(){
      
    },
    methods: {
      onChangeSubname() {
        Action.Ajax("/sys?op=Domain", {subname:this.form.subname}, result=>{
          if(result.code==200 && result.data.type) {
            this.type=result.data.type;
            console.log(result)
          }
        });
      },
      loadAccountInfo(userdata) {
        //alert(JSON.stringify(userdata));
          //如果cookie里有账号信息
        console.log('cookie中检测到账号信息！现在开始预填写！');
          this.form.subname = userdata.subname;
          this.form.username = userdata.username;
          this.form.password = userdata.password;
          this.remember = true;
          if(this.$route.query.reload!=true) {
            //this.onLogin();
          }
      },
      show() {
        this.visiable = true;
      },
      hide() {
        this.visiable = false;
      },
      onLogin() {
        this.login(this.form.subname, this.form.username, this.form.password, window.app.device);
        this.yesDisabled = true
      },
      login: function (subname, username, password, params) { 
        console.log("login", subname, username, password);
        var _this = this;
        var accountInfo = "";
        if(window.args.subname) {
          subname=window.args.subname;
        }
        if(password.length!=32){
          password = md5(password);
        }
        Action.Login(subname, username, password, params,  (json)=> { 
          if (json.code == "200") {
            window.app.user=json.data;
            //console.log("user", window.app.user);
            sessionStorage.setItem('USER', JSON.stringify(json.data));
            accountInfo = subname+ "&" + username + "&" + password;
            console.log(accountInfo);
            if (this.remember){
              let data= {username:username, subname:subname, password:password, remember:true};
              data["token"]=json.data.token;
              data["server"]=window.args.server;
              //保存token
              Native.Save("USER", data);
            }
            else{
              //console.log("没有勾选记住密码，现在开始删除账号cookie");
              //Cookie.delCookie('accountInfo');
              Native.Save("USER", {});
            }
            if(window.app.user.version) { debugger
              Dialog.confirm({
                title: '升级提醒',
                message: '检测到新版本'+window.app.user.version.key_name+"，是否马上升级？"
              }).then(() => {
                Native.Install("升级"+window.app.user.version.key_name, window.app.user.version.url);
              }).catch(() => {
                // on cancel
              });
            }
            if(this.type=="SAAS") { //打开老版本页面
              Native.Open("main");
            } else {
              this.$router.replace("/main");
            }
          }
          else {
            Toast.fail(json.remark);
          }
        });
      },
      toRegister() {
        this.$router.push("/register");
      },
      onBack() {
        window.close();
      },
      onTest() {
        this.$router.push("/test");
      },
      showDev() {
         this.devcount++;
         if(this.devcount==1) {
           this.devtitle="切换";
         }
         if(this.devcount<3) {
           
         }
          let locale = this.$i18n.locale
          locale === 'zh' ? this.$i18n.locale = 'xb' : this.$i18n.locale = 'zh'
        //  if(this.devcount==6) {
        //    this.devtitle="开发模式";
        //  }
        //  if(this.devcount>999999) {
        //    window.args["develop"]=true;
        //    this.$message.success("已经启动开发模式");
        //    this.$router.push("/dev/menu");
        //  }
       },
      
    }
  }
</script>
<style>
  .login {
    margin:40px;
  }
  .login .logo {
    border-radius: 50%;
  }
  .login .register {
    line-height: 60px;
    float:right;
  }
  .login h2 {
    margin-top:40px;
    margin-bottom: 20px;
    text-align: center;
  }
  .login .submit {
    margin-top: 20px;
    width:100%;
  }
  .login .footer{
    text-align: center;
    color: #888;
    margin-top: 60px;
  }
  .login .van-cell {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 10px 0; 
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #323233;
    font-size: 14px;
    overflow: hidden;
  }
  .logo_img{
    width: 9rem;
    height: 9rem;
    margin: 0 auto;
  }
</style>
