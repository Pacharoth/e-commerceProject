
import {createRouter,createWebHistory} from 'vue-router';
import adminRouter from './admin';
import sellerRouter from './seller';
import customerRouter from './customer';
import store from '../stores/store';


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
    var role=''
    store.getters['auth/getSession'].then(result=>{
        role=result.role;
    })
    if(to.name=='seller'&&role=='seller'|role=='admin')next({name:'seller'})
    else if(to.name=='admin'&&role=='admin')next({name:'admin'})
    else next();
})
export default router;