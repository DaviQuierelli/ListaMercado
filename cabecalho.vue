<template>
<view class="container">
    <text class="titulo">{{titulo}}</text>
    <slot></slot>
</view>
</template>

<script>
    export default {
        name:'cabecalho',
        props:['titulo']
    }
</script>

<style scoped>
.container{
    background-color: blue;
    color: #fff;
    padding-top: 1%;
    width: 100%;
    }
    .titulo{
        color: white;
        font-size: 20px;
        text-align: center;
    }
</style>