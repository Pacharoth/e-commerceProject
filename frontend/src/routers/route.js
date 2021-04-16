import {createRouter,createWebHistory} from 'vue-router';
import AdminLayout from '../components/layout/AdminLayout.vue';
const routes = [
    {
        path:'/admin',
        name:'Admin',
        component:AdminLayout,
    }
]
const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})
export default router;