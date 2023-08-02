import http from "@/helpers/http"
import router from '../router'
import { useToast } from "vue-toastification";
const toast = useToast()

export default {
    namespaced: true,
    strict: true,
    state: {
        allUsers: [],
    },

    mutations: {
        SET_ALL_USERS(state, users) {
            state.allUsers = users
        },
    },

    actions: {
       async getAllUsersForAssignTask({state, commit}){
            try {
                return await http()
                    .get('/tasks/user-for-assign-task')
                    .then(({data}) => {
                        if (data.success == true) {
                            commit('SET_ALL_USERS', data.data)
                        } 
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

       
    },
}