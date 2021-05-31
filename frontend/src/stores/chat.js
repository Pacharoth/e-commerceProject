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
        CHANGE_CONTENT(state,text){
            state.contentChat=text;
        },
        CHANGE_LIST(state,text){
            state.chatButton=text;
        },
        PUT_TO_CHAT(state,data){
            state.chat=data;
        }
    },
    actions: {
        changeContent({commit},text){
            commit("CHANGE_CONTENT",text);
        },
        changeList({commit},text){
            commit('CHANGE_LIST',text);
        },
        putToChat({commit},data){
            commit("PUT_TO_CHAT",data);
        }
    },
}
export default chatStore;