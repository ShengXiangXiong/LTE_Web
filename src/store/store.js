import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userFace: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userface,
      userName: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      userRoles: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).roles,
      userID: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).userid
    },
    routes: [],
    sceneModelFlag: true,
    currentTaskName: 'null',
    // msgList: [],
    // isDotMap: new Map(),
    // currentFriend: {},
    // stomp: null,
    // nfDot: false
  },
  mutations: {
    initMenu(state, menus){
      state.routes = menus;
    },
    login(state, user){
      state.user = user;
      window.localStorage.setItem('user', JSON.stringify(user));
    },
    logout(state){
      window.localStorage.removeItem('user');
      state.routes = [];
    },
    changeSceneModelFlagToTrue(state){
      state.sceneModelFlag = true;
    },
    changeSceneModelFlagToFalse(state){
      state.sceneModelFlag = false;
    },
    changeCurrentTaskName(state, newName){
      state.currentTaskName = newName;
      console.log('ss'+ state.currentTaskName);
    }
/*    toggleNFDot(state, newValue){
      state.nfDot = newValue;
    },
    updateMsgList(state, newMsgList){
      state.msgList = newMsgList;
    },
    updateCurrentFriend(state, newFriend){
      state.currentFriend = newFriend;
    },
    addValue2DotMap(state, key){
      state.isDotMap.set(key, "您有未读消息")
    },
    removeValueDotMap(state, key){
      state.isDotMap.delete(key);
    }*/
  },
});
