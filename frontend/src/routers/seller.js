import Seller from '../components/Seller/Seller.vue';
import ProductionList from '../components/Seller/ProductionList.vue';
import MainSeller from '../components/Seller/MainSeller.vue';
import SellerProfile from '../components/Seller/SellerProfile.vue'
const routeSeller = {
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
    ]
}
export default routeSeller;