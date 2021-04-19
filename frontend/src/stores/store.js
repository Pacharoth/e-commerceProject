import {createLogger,createStore} from 'vuex';
import chatStore from './chat';
import notificationStore from './notification';
import customerStore from './customer';
const store=createStore({
    plugins:[createLogger()],
    modules:{
        chat:chatStore,
        notification:notificationStore,
        customer:customerStore,
    }
});
export default store;