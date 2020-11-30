<template id='myCom'>
    <div>
      {{oneA}}
      <button @click="oneBonclick()">
        {{oneB}}
      </button>
      <input type="text" v-model="toOne" @change="getUser">
    </div>
</template>
<script>
export default {
  data(){
    return{
      oneA:'这是组件A',
      oneB:'这是组件B',
      toOne:'测试',
    }
  },
  created(){
    this._oneB()
  },
  methods:{
    oneBonclick(){
      console.log(this.oneA + '---')
    },
    _oneB(){
      console.log(this.oneA)
    },
    getUser(){
      this.$emit('transferUser',this.toOne)
    }
  }
}
</script>
<style scoped>

</style>