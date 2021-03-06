import {createLogger, createStore} from 'vuex';
import chatStore from './chat';
import notificationStore from './notification';
import customerStore from './customer';
import authStore from './auth';
import rolesStore from './roles';
import sellerStore from './seller';
import feedbackStore from './feedback';
import adminStore from './admin';
const store=createStore({
    plugins:[createLogger()],
    modules:{
        chat:chatStore,
        notification:notificationStore,
        customer:customerStore,
        auth:authStore,
        role:rolesStore,
        seller:sellerStore,
        feedback:feedbackStore,
        admin:adminStore,
    }
});
export default store;