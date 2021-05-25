import Seller from '../components/Seller/Seller.vue';
import ProductionList from '../components/Seller/ProductionList.vue';
import MainSeller from '../components/Seller/MainSeller.vue';
import SellerProfile from '../components/Seller/SellerProfile.vue'
import store from '../stores/store';
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
    beforeEnter: (to, from, next) => {
        var role = store.getters['auth/getSession'].role
        const isAuthenticate=/((admin)|(seller))/;
        const regex = /((sellerprofile)|(sellerpage)|(sellerproductlist)|(seller))/
        if(regex.test(to.name)&&isAuthenticate.test(role))next()
        else next({name:'customerlistproduct'})
    }
}
export default sellerRouter;