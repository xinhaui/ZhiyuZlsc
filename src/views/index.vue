<template>
  <div>
    
  </div>
</template>

<script>
import {Action,Native,Http} from "@/lib/maui.min.js"
import Vue from 'vue'
import { Toast } from "vant"

Vue.use(Toast);
export default {
  data() {
    return {
      
    };
  },
  created(){
    this._ajax()
  },
  methods: {
    _ajax(){
      var url = '/cloud/oms/zlapp/SellApiUtil?op=findProduct';
      var temp = { };
      Action.Ajax(url, temp, result => {
        if (result.code != 200) {
            this.$toast.fail(result.remark);
            return;
        } else {
            console.log(result)
        }
      })
    }
  }
};
</script>

<style scoped>
</style>

