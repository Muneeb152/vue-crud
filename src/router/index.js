import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../components/Create.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Listing',
        component: () => import("@/views/Listing.vue"),
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
    },




]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router