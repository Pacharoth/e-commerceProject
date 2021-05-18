import edit_user from '../components/customer/edit_user.vue';
import feedback from '../components/customer/feedback.vue';
import shopping_cart from '../components/customer/shopping_cart.vue';
import post_order from '../components/customer/post_order.vue';
import CustomerLayout from '../components/layout/CustomerLayout.vue'
import Customer from '../components/customer/Customer.vue';

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
        },
        {
            path:'feedback',
            name:'FeedBack',
            component:feedback,
        },
        {
            path:'postorder',
            name:"PostOrder",
            component:post_order,
        },
        {
            path:'shoppingcart',
            name:'shopping cart',
            component:shopping_cart,
        },
    ]

}
export default customerRouter;