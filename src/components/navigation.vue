<template>
    <van-tabbar v-model="active" z-index='9' route>
        <van-tabbar-item :style="({'marginLeft':'1em'})" name="goods" icon="bag-o" replace to="/home">{{$t('lang.navigation.goods')}}</van-tabbar-item>
        <van-tabbar-item name="sort" icon="apps-o" replace to="/cart">{{$t('lang.navigation.sort')}}</van-tabbar-item>
        <van-tabbar-item name="shopping" icon="cart-o" :badge="number" replace to="/type">{{$t('lang.navigation.shopping')}}</van-tabbar-item>
        <van-tabbar-item name="my" icon="friends-o" replace to="/my">{{$t('lang.navigation.my')}}</van-tabbar-item>
        <van-tabbar-item :style="({'marginRight':'1em'})" name="contact" icon="phone-o" replace to="/contact">{{$t('lang.navigation.contact')}}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    name:'home', 
    data(){
        return{
             active: 'goods',
             number:'',
        }
    },
    created(){
        
    },
    methods:{
        
    }
}
</script>

<style scoped>

</style>