import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import SellerDashboard from '../components/Admin/SellerDashboard.vue';
import AdminLayout from '../components/layout/AdminLayout.vue';
import AdminCustomer from '../components/Admin/AdminCustomer.vue';

const routerAdmin =     {
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
            name:'sellerdetail',
            path:'sellerdetail',
            component:SellerDashboard,
        },
        {
            name:'customer',
            path:'customer',
            component:AdminCustomer,
        }
    ]
};
export default routerAdmin;