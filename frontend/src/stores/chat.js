const chatStore={
    namespaced:true,
    state(){
        return{
            contentChat:"",
            chatButton:"",
            chat:[],
        }
    },
    getters:{
        getChatContent(state){
            return state.contentChat;
        },
        getChatList(state){
            return state.chatButton;
        }
    },
    mutations:{
        changeContent(state,text){
            state.contentChat=text;
        },
        changeList(state,text){
            state.chatButton=text;
        }
    },
    actions: {
        changeContent(context,text){
            context.commit("changeContent",text);
        },
        changeList(context,text){
            context.commit('changeList',text);
        }
    },
}
export default chatStore;