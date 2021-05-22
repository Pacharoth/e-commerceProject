const chatStore={
    namespaced:true,
    state(){
        return{
            contentChat:"",
            chatButton:"",
            chat:{},
        }
    },
    getters:{
        getChatContent(state){
            return state.contentChat;
        },
        getChatList(state){
            return state.chatButton;
        },
        getChat(state){
            return state.chat;
        }
    },
    mutations:{
        changeContent(state,text){
            state.contentChat=text;
        },
        changeList(state,text){
            state.chatButton=text;
        },
        putToChat(state,data){
            state.chat=data;
        }
    },
    actions: {
        changeContent({commit},text){
            commit("changeContent",text);
        },
        changeList({commit},text){
            commit('changeList',text);
        },
        putToChat({commit},data){
            commit("putToChat",data);
        }
    },
}
export default chatStore;