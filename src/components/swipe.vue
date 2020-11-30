<template>
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image"/>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    name:'home', 
    data(){
        return{
            images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
            ],
        }
    },
    created(){
        
    },
    methods:{}
}
</script>

<style scoped>

</style>