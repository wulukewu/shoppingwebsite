import { createRouter, createWebHistory } from 'vue-router';


import NotFound from './components/NotFound.vue';
import ShoppingPage from './components/shoppingpage/ShoppingPage.vue';
import HomePage from './components/homepage/HomePage.vue';
import LoginPage from './components/auth/LoginPage.vue';
import SignupPage from './components/auth/SignUp.vue';
import AccountPage from './components/auth/AccountPage.vue';
import CheckOut from './components/checkout/CheckOut.vue';
import OrderPage from './components/checkout/OrderPage.vue';
import store from './vuex.js';

const router =createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',component:HomePage},
        {path:'/shoppingpage',component:ShoppingPage},
        {path:'/login',component:LoginPage ,meta:{requiresUnauth:true}},
        {path:'/signup',component:SignupPage},
        {path:'/account',component:AccountPage,meta:{requiresAuth:true}},
        {path:'/checkout',component:CheckOut,meta:{requiresAuth:true}},
        {path:'/order',component:OrderPage,meta:{requiresAuth:true}},
        {path: '/notfound', component: NotFound },
        {path: '/:pathMatch(.*)*', redirect: '/notfound' }
    ],
    scrollBehavior(_, _2, savedPosition) {
        if(savedPosition){
            return savedPosition;
        }
        return {top:0};
    },
    
});
router.beforeEach((to, _, next) => {
    const isAuth = store.getters['auth/isAuthenticated'];
    console.log("Navigation Check - isAuthenticated:", isAuth);
    
    if (to.meta.requiresAuth && !isAuth) {
        next('/login');
    } else if (to.meta.requiresUnauth && isAuth) {
        next('/');
    } else {
        next();
    }
});
export default router;