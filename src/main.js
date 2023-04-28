import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import store from "@/store";
import { createAuth0 } from '@auth0/auth0-vue';

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
import Callback from "@/components/Callback";
import RegisterAuth0 from "@/components/RegisterAuth0";
import TestComponent from "@/components/TestComponent";
import CreateFacultyForm from "@/components/CreateFacultyForm";


const routes = [
    { path: '/', component: HelloWorld },
    { path: '/users', component: UsersGetComponent },
    { path: '/user/:id', component: SingleUserInfo},
    { path: '/faculties', component: AllFacultiesComponent},
    { path: '/faculties/create', component: CreateFacultyForm},
    { path: '/users/faculty/:id', component: SingleFacultyInfo},
    { path: '/auth/register', component: RegisterComponent},
    { path: '/auth/login', component: LoginComponent},
    { path: '/profile', component: ProfileComponent},
    { path: '/users/unconfirmed', component: UnconfirmedUsersComponent},
    { path: '/callback', component: Callback},
    { path: '/register_auth0', component: RegisterAuth0},
    { path: '/test', component: TestComponent},

]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(
    createAuth0({
        domain: "dev-imfo33vsyswl7flj.us.auth0.com",
        clientId: "Q7aihKkwIlZsEV0n8hkCEhXzQ4xzZKvp",
        authorizationParams: {
            redirect_uri: "http://localhost:8081/callback",
            audience : "http://localhost:8081"
        },
    })
);
app.mount('#app')
