import {createLogger,createStore} from 'vuex';
import chatStore from './chat';
const store=createStore({
    plugins:[createLogger()],
    modules:{
        chat:chatStore,
    }
});
export default store;