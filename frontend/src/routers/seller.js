import Seller from '../components/Seller/Seller.vue';
import ProductionList from '../components/Seller/ProductionList.vue';
import MainSeller from '../components/Seller/MainSeller.vue';
import SellerProfile from '../components/Seller/SellerProfile.vue'
const sellerRouter = {
    name:'seller',
    path:'/seller',
    redirect:{name:'sellerpage'},
    component:Seller,
    children:[
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
    // beforeEnter: (to, from, next) => {
    //     // const store = this.$store;
    //     // store.dispatch('auth/setSession');
    //     // //check authentication
    //     // if(to.name==="seller" && store.getters['auth/getSession'].isRole==="seller")next({name:'seller'});
    //     // else next({name:'homepage'});
        
    // }
}
export default sellerRouter;