import {createRouter,createWebHistory} from 'vue-router';
import edit_user from '../components/customer/edit_user.vue';
import feedback from '../components/customer/feedback.vue';
import shopping_cart from '../components/customer/shopping_cart.vue';
import post_order from '../components/customer/post_order.vue';
import routerAdmin from './admin';
const routes = [
    routerAdmin,
    {
        path:'/edituser',
        name:'Edit User',
        component:edit_user,
    },
    {
        path:'/feedback',
        name:'FeedBack',
        component:feedback,
    },
    {
        path:'/postorder',
        name:"PostOrder",
        component:post_order,
    },
    {
        path:'/shoppingcart',
        name:'shopping cart',
        component:shopping_cart,
    },
    

]
const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router;