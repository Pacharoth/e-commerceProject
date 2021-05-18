import {createRouter,createWebHistory} from 'vue-router';
import adminRouter from './admin';
import sellerRouter from './seller';
import customerRouter from './customer';
const routes = [
    adminRouter,
    sellerRouter,
    customerRouter,

]
const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router;