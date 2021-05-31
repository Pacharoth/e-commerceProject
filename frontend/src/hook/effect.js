function showChatLists(store){
    if(!store.getters['chat/getChatList']){
        store.dispatch('chat/changeList','active');
    }else{
        store.dispatch('chat/changeList','');
    }
}
function showNotifications(store){
    if(!store.getters['notification/getContent']){
        store.dispatch('notification/changeContent','active');
    }else{
        store.dispatch('notification/changeContent','')
    }
}
export{
    showChatLists,
    showNotifications,
}