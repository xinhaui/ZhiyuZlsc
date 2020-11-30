<template>
  <div style="background:#eeeeee">
    <!-- 导航栏 -->
        <van-nav-bar :title="lang.tiedas">
            <template #right>
                <!-- <van-icon name="search" size="25" /> -->
            </template>
        </van-nav-bar>

        <div id="app" v-cloak>
    <template v-if="list.length">
      <table>
        <thead>
          <!-- <tr>
            <th>
              <input type="checkbox" v-model="isAllChecked" @click="checkAll()">
            </th>
            <th>序号</th>
            <th>商品名称</th>
            <th>商品单价</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr> -->
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>
              <input type="checkbox" :value="item.id" v-model="item.isCheck" @click="checkOne(item,index)">
            </td>
            <td>{{index+1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button @click="handleReduce(index)" :disabled="item.count === 1">
                -
              </button>
              {{ item.count }}
              <button @click="handleAdd(index)">+</button>
            </td>
            <td>
              <button @click="handleRemove(index)">移除</button>
            </td>
          </tr>
 
        </tbody>
      </table>
      <div>总价:￥{{ totalPrice }}</div>
    </template>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>商品名称</th>
            <th>商品单价</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="5" style="text-align: center">购物车为空</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
  data() {
    return{
     
    lang:{
      tiedas:'测试'
    },
    list: [{
        id: 1,
        name: "iPhone 7",
        price: 6188,
        count: 1,
        isCheck: false
      },
      {
        id: 2,
        name: "iPad Pro",
        price: 5888,
        count: 1,
        isCheck: false
      },
      {
        id: 3,
        name: "MacBook Pro",
        price: 21488,
        count: 1,
        isCheck: false
      }
    ],
    checkAllList: [],
    // isAllChecked:false
     
    }
  },

  components:{
    Navigation
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].isCheck) {
          var item = this.list[i];
          total += item.price * item.count;
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ",");
    }
  },
  methods: {
    handleReduce: function (index) {
      if (this.list[index].count === 1) return;
      this.list[index].count--;
    },
    handleAdd: function (index) {
      this.list[index].count++;
    },
    handleRemove: function (index) {
      this.list.splice(index, 1);
    },
    checkOne: function (res,index) {
      console.log(res)
      console.log(index)
      if (this.list[index].isCheck === false) {
        this.list[index].isCheck = true;
      } else {
        this.list[index].isCheck = false;
        // this.isAllChecked = false;
      }
    },
    // checkAll: function (item) {
    //   if (this.isAllChecked === false) {
    //     for (var i = 0; i < this.list.length; i++) {
    //       var item = this.list[i];
    //       item.isCheck = true;
    //     }
    //   } else {
    //     for (var i = 0; i < this.list.length; i++) {
    //       var item = this.list[i];
    //       item.isCheck = false;
    //     }
    //   }
    //   this.isAllChecked = !this.isAllChecked;
    // }
  },
}
</script>

<style scoped>
[v-cloak] {
/*该部分是一个解决初始化慢导致页面闪动的最佳实践(非webpack构建的项目),例如界面上出现{{message}}字样*/
    display: none;
}
 
table {
    border: 1px solid #e9e9e9;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
}
 
th,
td {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
}
 
th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap
}
</style>