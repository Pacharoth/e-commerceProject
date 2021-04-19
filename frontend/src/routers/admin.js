import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import SellerDashboard from '../components/Admin/SellerDashboard.vue';
import AdminLayout from '../components/layout/AdminLayout.vue';
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
            name:'SellerDetail',
            path:'sellerdetail',
            component:SellerDashboard,
        }
    ]
};
export default routerAdmin;