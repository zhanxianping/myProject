<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
    import Index from "./views/Index";
    import Page from "./views/pageDesign/FromDesign";

    export default {
        name: "app",
        components: {
            Page,
            Index
        },
    }
</script>

<style lang="less">

    #app {
        width: 100%;
        height: 100%;
    }

    /*页面切换动画*/
    /*进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除*/
    .fade-enter-active {
        transition: opacity .5s;
    }
    /*进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除*/
    .fade-enter {
        opacity: 0;
    }
    /*离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除*/
    .fade-leave {
        opacity: 1;
    }
    /*离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除*/
    .fade-leave-active {
        opacity:0;
        transition: opacity .5s;
    }
</style>
