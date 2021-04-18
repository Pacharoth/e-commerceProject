import {createLogger,createStore} from 'vuex';
import chatStore from './chat';
import notificationStore from './notification';
const store=createStore({
    plugins:[createLogger()],
    modules:{
        chat:chatStore,
        notification:notificationStore,
    }
});
export default store;