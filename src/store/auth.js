import http from "@/helpers/http"
import router from '../router'
import { useToast } from "vue-toastification";
import Cookies from "js-cookie";
const toast = useToast()

export default {
    namespaced: true,
    strict: true,
    state: {
        userInfo: {
            "id": '',
            'name': '',
            'email': '',
            'mobile': '',
            'password': '',
            'password_confirmation': ''
        },
        authUserInfo: {
            "id": '',
            'name': '',
            'email': '',
            'mobile': '',
        },
        loginInfo: {
            email: '',
            password: ''
        },
        token: '',
    },
    getters: {
        getAccessToken(state){
            return state.token
        },

        validToLogin(state) {
            if (state.token) return true
            return false
        },

        getAuthName(state){
            return state.authUserInfo.name
        }
    },
    mutations: {
        //before login commit
        SET_LOGIN_EMAIL(state, email) {
          state.loginInfo.email = email
        },

        SET_LOGIN_PASSWORD(state, event) {
            state.loginInfo.password = event
        },

        //After login commit
        SET_AUTH_USER_NAME(state, name){
            state.authUserInfo.name = name
            Cookies.set('client_name', name, {
                expires: 7
            })
        },
        SET_AUTH_USER_EMAIL(state, email){
            state.authUserInfo.email = email
        },
        SET_AUTH_USER_MOBILE(state, mobile){
            state.authUserInfo.mobile = mobile
        },

        SET_USER_NAME(state, event) {
            state.userInfo.name = event
        },


        //registrations commit
        SET_USER_EMAIL(state, event) {
            state.userInfo.email = event
        },

        SET_USER_MOBILE(state, event) {
            state.userInfo.mobile = event
        },

        SET_USER_PASSWORD(state, event) {
            state.userInfo.password = event
        },

        SET_USER_PASSWORD_CONFIRMATION(state, event) {
            state.userInfo.password_confirmation = event
        },
        
        SET_TOKEN(state, token) {
            state.token = token

            Cookies.set('_mbm_c_t', token, {
                expires: 7
            })
        },
        
    },

    actions: {
        async login({state, commit}){
            try {
                return await http()
                    .post('/login', {
                        email: state.loginInfo.email,
                        password: state.loginInfo.password
                    })
                    .then(({data}) => {
                        if (data.success == true) {
                            commit('SET_TOKEN', data.data.access_token)

                            commit('SET_LOGIN_EMAIL', '')
                            commit('SET_LOGIN_PASSWORD', '')

                            commit('SET_AUTH_USER_NAME',  data.data.userData.name)
                            commit('SET_AUTH_USER_EMAIL', data.data.userData.email)
                            commit('SET_AUTH_USER_MOBILE', data.data.userData.mobile)

                            toast.success("Login successful!")
                            return router.push('/dashboard')
                        } 
                    })
                    .catch(({response}) => {
                        if(response.status === 401){
                            toast.error(response.data.message)
                        }

                        if(response.status === 422){
                            commit("errors/SET_VALIDATION_ERRORS", response.data.errors, {root:true})
                        }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async registration({state, commit}){
            try {
                return await http()
                    .post('/register', {
                        name: state.userInfo.name,
                        mobile: state.userInfo.mobile,
                        email: state.userInfo.email,
                        password: state.userInfo.password,
                        password_confirmation: state.userInfo.password_confirmation
                    })
                    .then(({data}) => {
                        if (data.success == true) {
                            commit('SET_USER_NAME', '')
                            commit('SET_USER_EMAIL', '')
                            commit('SET_USER_MOBILE', '')
                            commit('SET_USER_PASSWORD', '')
                            commit('SET_USER_PASSWORD_CONFIRMATION', '')
                            commit("errors/SET_VALIDATION_ERRORS", null, {root:true})
                            toast.success("Registration successful")

                            return router.push('/')
                        } 
                    })
                    .catch(({response}) => {
                        if(response.status === 422){
                            commit("errors/SET_VALIDATION_ERRORS", response.data.errors, {root:true})
                        }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },


        async logout({state, commit}){
            try {
                return await http()
                    .get('/logout')
                    .then(({data}) => {
                        if (data.success == true) {
                            commit("SET_TOKEN", '')
                            commit('SET_LOGIN_EMAIL', '')
                            commit('SET_LOGIN_PASSWORD', '')
                            commit('SET_USER_NAME', '')
                            commit('SET_USER_EMAIL', '')
                            commit('SET_USER_MOBILE', '')
                            toast.success("Logout successful")
                            return router.push('/')
                        } 
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        }
    },
}