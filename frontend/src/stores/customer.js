const customerStore={
    namespaced:true,
    state(){
        return {
            data: {
                page:0,
                filter:"",
            },
            adminCustomer: [
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
    mutations:{

    },
    actions:{

    },
    getters:{
        getAdminCustomers(state){
            return state.adminCustomer
        }
    }
}
export default customerStore;