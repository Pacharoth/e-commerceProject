
import {createRouter,createWebHistory} from 'vue-router';
import adminRouter from './admin';
import sellerRouter from './seller';
import customerRouter from './customer';
import store from '../stores/store';
import axios from 'axios';
import { localhost } from '../utils/FormValidation';
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
    }
    if(result.data.userRole!==undefined){
        store.dispatch('auth/setSession',result);
    }
    // const response = await axios.post(localhost+'/role')
    // store.dispatch('role/addRole',response.data);
    console.log(store.getters['auth/getSession'])
    console.log(to,next());
})
export default router;