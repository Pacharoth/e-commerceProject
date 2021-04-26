import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import SellerDashboard from '../components/Admin/SellerDashboard.vue';
import SellerList from '../components/Admin/SellerList.vue';
import AdminLayout from '../components/layout/AdminLayout.vue';
import AdminCustomer from '../components/Admin/AdminCustomer.vue';

const adminRouter =     {
    path:'/admin',
    name:'Admin',
    redirect:{name:'admindashboard'},
    component:AdminLayout,
    children:[
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
            path:'seller/sellerdetail',
            component:SellerDashboard,
        },
        {
            name:'customer',
            path:'customer',
            component:AdminCustomer,
        }
    ],
    // beforeEnter: (to, from, next) => {
    //     // const store = this.$store;
    //     // store.dispatch('auth/setSession');
    //     // //check authentication
    //     // if(to.name==="admin" && store.getters['auth/getSession'].isRole==="seller")next({name:'admin'});
    //     // else next({name:'homepage'});
    // }
};
export default adminRouter;