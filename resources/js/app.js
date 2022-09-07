
import {createApp} from 'vue'
import App from './src/App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './src/router'
import store from './src/store'
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000/api";


createApp(App).use(router).use(store).mount("#app")