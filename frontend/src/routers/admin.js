import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import SellerDashboard from '../components/Admin/SellerDashboard.vue';
import SellerList from '../components/Admin/SellerList.vue';
import AdminLayout from '../components/layout/AdminLayout.vue';
import AdminCustomer from '../components/Admin/AdminCustomer.vue';
import AdminCategory from '../components/Admin/AdminCategory.vue';
import store from '../stores/store';

const adminRouter =     {
    path:'/admin',
    name:'Admin',
    redirect:{name:'admindashboard'},
    component:AdminLayout,
    children:[
        {
            name:'admincategory',
            path:'category',
            component:AdminCategory,
        },
        {
            name:'admindashboard',
            path:'admindashboard',
            component:AdminDashboard,

        },
        {
            name:'adminseller',
            path:'seller',
            component:SellerList,
        },
        {
            name:'sellerdetial',
            path:'seller/sellerdetail/:id',
            component:SellerDashboard,
            props:true,
        },
        {
            name:'customer',
            path:'customer',
            component:AdminCustomer,
            props:true,
        }
    ],
    beforeEnter: (to, from, next) => {
        var role = store.getters['auth/getSession'].role
        const isAuthenticate=role=='admin'
        const name= /((admindashboard)|(admincategory)|(customer)|(sellerdetial)|(adminseller)|(admin))/
        if(name.test(to.name)&&isAuthenticate){
            next()
        }
        else next({name:'customerlistproduct'})
    }
};
export default adminRouter;