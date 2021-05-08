import edit_user from '../components/customer/edit_user.vue';
import feedback from '../components/customer/feedback.vue';
import shopping_cart from '../components/customer/shopping_cart.vue';
import post_order from '../components/customer/post_order.vue';
import ProductDetail from '../components/customer/ProductDetail.vue';
import CustomerLayout from '../components/layout/CustomerLayout.vue'
import Customer from '../components/customer/Customer.vue';
import view_profile from '../components/customer/view_profile.vue';
import store from '../stores/store';


const customerRouter = {
    name:'homepage',
    path:'/',
    redirect:{name:'customerlistproduct'},
    component:CustomerLayout,
    children:[
        {
            name:'customerlistproduct',
            path:'homepage',
            component:Customer,
        },
        {
            path:'edituser',
            name:'Edit User',
            component:edit_user,
            beforeEnter: (to, from, next) => {
                var role = store.getters['auth/getSession'].role
                if(to.name=='edituser'&&role=='customer'|role=='admin')next()
                else next({name:'customerlistproduct'})
            }
        },
        {
            path:'feedback',
            name:'FeedBack',
            component:feedback,
            beforeEnter: (to, from, next) => {
                var role = store.getters['auth/getSession'].role
                if(to.name=='FeedBack'&&role=='customer'|role=='admin')next()
                else next({name:'customerlistproduct'})
            }
        },
        {
            path:'pastorder',
            name:"PastOrder",
            component:post_order,
            beforeEnter: (to, from, next) => {
                var role = store.getters['auth/getSession'].role
                const isAuthenticate=role=='customer'||role=='admin'||role=='seller';
                if(to.name=='PastOrder'&&isAuthenticate)next()
                else next({name:'customerlistproduct'})
            }
        },
        {
            path:'shoppingcart',
            name:'shoppingcart',
            component:shopping_cart,
            beforeEnter: (to, from, next) => {
                var role = store.getters['auth/getSession'].role
                const isAuthenticate=role=='customer'||role=='admin'||role=='seller';
                if(to.name=='shoppingcart'&&isAuthenticate )next()
                else next({name:'customerlistproduct'});
            }
        },
        {
            path:'productdetail',
            name:'productdetail',
            component:ProductDetail,
        },
        {
            path:'profile',
            name:'profile',
            component:view_profile,
            beforeEnter: (to, from, next) => {
                var role = store.getters['auth/getSession'].role
                const isAuthenticate=role=='customer'||role=='admin'||role=='seller';
                if(to.name=='profile'&&isAuthenticate)next()
                else next({name:'customerlistproduct'})
            }
        }

    ],
}
export default customerRouter;