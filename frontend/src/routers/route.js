
import {createRouter,createWebHistory} from 'vue-router';
import adminRouter from './admin';
import sellerRouter from './seller';
import customerRouter from './customer';
import store from '../stores/store';
import axios from 'axios';
import {localhost} from '../utils/FormValidation';

const routes = [
    adminRouter,
    sellerRouter,
    customerRouter,

]
const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach(async(to,from,next)=>{
    const result = {}
    result.data = {
        userId:localStorage.getItem('userid'),
        username:localStorage.getItem('username'),
        userRole:localStorage.getItem('userrole'),
        email:localStorage.getItem('useremail'),
        img:localStorage.getItem('img'),
    }
    if(result.data.userRole!==undefined){
        store.dispatch('auth/setSession',result);
    }
    const response = await axios.post(localhost+"/role");
    store.dispatch('role/addRole',response.data)
    var user = store.getters['auth/getSession'];
    if(user.role=='seller'){
        var {data} =await axios.get(localhost+'/getSeller/'+user.userid);
        console.log(data);
        var results=await axios.post(localhost+"/paymentseller/"+data[0]._id);
        if(results.data.length>0){
            results.data[0].dateValid = parseInt(results.data[0].dateValid);
            console.log(results.data)
            store.dispatch('seller/loadPayment',results.data); 
        }
    }
    console.log(store.getters['auth/getSession'])
    console.log(to,next());
})
export default router;