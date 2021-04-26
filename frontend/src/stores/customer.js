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
                    
                },
                {
                    name: 'Van Brabandt',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                },
                {
                    name: 'Van Belgie',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                },
                {
                    name: 'Alexander',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
                },
                {
                    name: 'Marie-Christine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                },
                {
                    name: 'Marie-Esmeralda',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                },
                {
                    name: 'Alexander',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
                },
                {
                    name: 'Marie-Christine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
                },
                {
                    name: 'Marie-Esmeralda',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
                },
                {
                    name: 'Alexander',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
                },
                {
                    name: 'Marie-Christine',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
                },
                {
                    name: 'Marie-Esmeralda',
                    phone: '0883726042',
                    email: 'josephine@gmail.com',
                    register: '16/April/2021',
                    
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
            return state.adminCustomer;
        }
    }
}
export default customerStore;