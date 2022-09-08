import { createStore } from 'vuex'
import axios from 'axios';
import Toast from '../helper/toastmessage';
import router from '../router';


// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: null,
            user: null,
            tasks: [],
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getisAuthenticated(state) {
            return state.token != null;
        },
        getTasks(state) {
            return state.tasks;
        },
        getAllTaskCount(state) {
            return state.tasks.length;
        },
        getDoneTaskCount(state) {
            return state.tasks.filter(obj => obj.status == 1).length;
        }

    },
    actions: {
        initAuth({ commit, dispatch }) {
            let token = localStorage.getItem("token");
            if (token) {
                commit('setLogin', { access_token: token });
                dispatch("getUser");
                
            } else {
                router.push('login');
            }
        },
        getUser({ commit, state, dispatch }) {
            axios.get('/user/profile',
                {
                    headers: {
                        'Authorization': `Bearer ${state.token}`
                    }
                }
            )
                .then(response => {
                    commit('setUser', response.data.data);
                    router.push('/dashboard');
                })
                .catch(e => {
                    console.log('init error get user')
                    console.log(e.response);
                })
        },
        getUserTaskFromDB({ commit, state }) {
            axios.get('/tasks', {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            }
            )
                .then(response => {
                    commit('setUserTask', response.data.data)
                })
                .catch(e => {
                    
                    Toast.fire({
                        icon: 'error',
                        title: e.response.data.message
                    });
                })
        },
        setUserTask({ dispatch }) {
            dispatch("getUserTaskFromDB");
        },
        setLogin({ commit, state,dispatch }, payload) {
            axios.post('/auth/login', { 'email': payload.email, 'password': payload.password })
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Login Successful'
                    });
                    
                    localStorage.setItem("token", response.data.data.access_token);
                    commit('setLogin', response.data.data);
                    dispatch("getUser");
                    
                })
                .catch(e => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Error'
                    });
                    console.log(e);
                })
        },
        setRegister({commit,state,dispatch},payload){
            axios.post('/auth/register', { 'name': payload.name,'email': payload.email, 'password': payload.password, 'password_confirmation': payload.password })
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Register Successful'
                    });
                    localStorage.setItem("token", response.data.data.access_token);
                    commit('setLogin', response.data.data);
                    dispatch("getUser");
                    
                })
                .catch(e => {
                    Toast.fire({
                        icon: 'error',
                        title: e.response.data.message
                    });
                    console.log(e.response.data.message);
                })   
        },
        addTask({ state, dispatch }, payload) {
            axios.post('/tasks',
                { 'text': payload.text }
                , { headers: { 'Authorization': `Bearer ${state.token}` } })
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Görev Eklendi'
                    });
                    dispatch("getUserTaskFromDB");
                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateTask({ state, dispatch }, payload) {
            axios.put('/tasks/' + payload.id,
                {
                    'text': payload.text,
                    'status': payload.status == true ? 1 : 0,
                    'order' : payload.order,
                }
                , { headers: { 'Authorization': `Bearer ${state.token}` } })
                .then(response => {
                    dispatch("getUserTaskFromDB");
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteTask({ state, dispatch }, payload) {
            axios.delete('/tasks/' + payload.id,
                { headers: { 'Authorization': `Bearer ${state.token}` } })
                .then(response => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Görev Silindi'
                    });
                    dispatch("getUserTaskFromDB");
                })
                .catch(e => {
                    console.log(e);
                })
        },

    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setUserTask(state, payload) {
            state.tasks = payload;
        },
        setLogin(state, payload) {
            state.token = payload.access_token;
        },
        setLogout(state) {
            state.token = null;
            state.tasks = [];
            localStorage.removeItem("token");
            router.push('/');
        }

    },

})

export default store;