import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

//Create vuex store
const store = createStore({
    state() {
        return {
            data: {
                page:0,
                filter:"",
            },
            users: [
                {
                    name: 'Josephine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                    
                },
                {
                    name: 'Van Brabandt',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Van Belgie',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh',
                },
                {
                    name: 'Alexander',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Marie-Christine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Marie-Esmeralda',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Alexander',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Marie-Christine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Marie-Esmeralda',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Alexander',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Marie-Christine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
                {
                    name: 'Marie-Esmeralda',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    address: 'Phnom Penh'
                },
    
            ]
        }
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getPosts(state){
            return state.posts
        },
        getUsers(state){
            return state.users
        }
    }
})

const app = createApp(App)  // Create new vuejs instance 
app.use(store)              // Attach our new store to this vuejs instance
app.mount('#app')           // mount vuejs instance with template

