import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import bootstrap from '@/assets/js/bootstrap.js';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);

app.use(store).use(router).use(ElementPlus).use(Toast).mount('#app')
