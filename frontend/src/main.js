import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/route';
import store from './stores/store';
const app = createApp(App);
app.mixin({
    created(){
        const {title}=this.$options
        if(title){
            document.title=title;
        }
    }
});
app.use(store);
app.use(router);
app.mount('#app');
