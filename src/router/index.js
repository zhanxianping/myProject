import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index";

Vue.use(VueRouter);

const routes = [
    {
        path: '/', // 默认页面重定向到主页
        redirect: '/index' // 重定向
    },
    {
        path: '*',
        component: () => import('@/components/404')
    },
    {
        path: '/index',
        name: 'Index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
    },
    {
        path: '/pageDesign',
        name: 'PageDesign',
        component: () => import("@/views/pageDesign/PageDesign.vue")
    }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
