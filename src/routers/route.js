import {createRouter,createWebHistory} from 'vue-router';
import AdminLayout from '../components/layout/AdminLayout.vue';
import edit_user from '../components/customer/edit_user.vue';
import feedback from '../components/customer/feedback.vue';
import shopping_cart from '../components/customer/shopping_cart.vue';
import post_order from '../components/customer/post_order.vue';
import Dashboard from '../components/Admin/Dashboard.vue';
const routes = [
    {
        path:'/admin',
        name:'Admin',
        redirect:{name:'dashboard'},
        component:AdminLayout,
        children:[
            {
                name:'dashboard',
                path:'dashboard',
                component:Dashboard,
            }
        ]
    },
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