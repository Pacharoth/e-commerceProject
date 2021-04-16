import {createStore} from 'vuex';
import chatStore from './chat';
const store=createStore({
    modules:{
        chat:chatStore,
    }
});
export default store;