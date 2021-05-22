import {createStore} from 'vuex';
import chatStore from './chat';
import notificationStore from './notification';
import customerStore from './customer';
import authStore from './auth';
import rolesStore from './roles';
const store=createStore({
    modules:{
        chat:chatStore,
        notification:notificationStore,
        customer:customerStore,
        auth:authStore,
        role:rolesStore,
    }
});
export default store;