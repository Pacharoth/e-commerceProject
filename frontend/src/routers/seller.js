import Seller from '../components/Seller/Seller.vue';
import ProductionList from '../components/Seller/ProductionList.vue';
import MainSeller from '../components/Seller/MainSeller.vue';
import SellerProfile from '../components/Seller/SellerProfile.vue'
import store from '../stores/store';
import report from '../components/Seller/report.vue';
const sellerRouter = {
    name:'seller',
    path:'/seller',
    redirect:{name:'sellerpage'},
    component:Seller,
    children:[
        {
            name:"sellerreport",
            path:"report",
            component:report,
        },
        {
            name:'sellerproductlist',
            path:'productlist',
            component:ProductionList,
        },
        {
            name:'sellerpage',
            path:'detail',
            component:MainSeller,
            
        },
        {
            name:'sellerprofile',
            path:'sellerprofile',
            component:SellerProfile,
        }
    ],
    beforeEnter: (to, from, next) => {
        var role = store.getters['auth/getSession'].role
        const isAuthenticate=/((admin)|(seller))/;
        var status = store.getters['seller/getPayment'][0].status;
        console.log(status)
        const regex = /((sellerprofile)|(sellerpage)|(sellerproductlist)|(seller))/
        if(regex.test(to.name)&&isAuthenticate.test(role)&&(status=='valid'||status=='special'))next();
        else if(regex.test(to.name)&&isAuthenticate.test(role)&&status=='invalid')next({name:'registerseller'});
        else next({name:'customerlistproduct'});
    }
}
export default sellerRouter;