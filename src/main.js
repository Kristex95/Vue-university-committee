import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import store from "@/store";

import {createWebHistory, createRouter} from "vue-router";
import { createApp } from 'vue'
import App from './App.vue'
import HelloWorld from "@/components/HelloWorld";
import UsersGetComponent from "@/components/UsersGetComponent";
import SingleUserInfo from "@/components/SingleUserInfo";
import AllFacultiesComponent from "@/components/AllFacultiesComponent";
import SingleFacultyInfo from "@/components/SingleFacultyInfo";
import RegisterComponent from "@/components/RegisterComponent";
import LoginComponent from "@/components/LoginComponent";
import ProfileComponent from "@/components/ProfileComponent";
import UnconfirmedUsersComponent from "@/components/UnconfirmedUsersComponent";


const routes = [
    { path: '/', component: HelloWorld },
    { path: '/users', component: UsersGetComponent },
    { path: '/user/:id', component: SingleUserInfo},
    { path: '/faculties', component: AllFacultiesComponent},
    { path: '/users/faculty/:id', component: SingleFacultyInfo},
    { path: '/auth/register', component: RegisterComponent},
    { path: '/auth/login', component: LoginComponent},
    { path: '/profile', component: ProfileComponent},
    { path: '/users/unconfirmed', component: UnconfirmedUsersComponent},

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
