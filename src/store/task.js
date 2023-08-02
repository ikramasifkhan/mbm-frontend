import http from "@/helpers/http"
import router from '../router'
import { useToast } from "vue-toastification";
const toast = useToast()

export default {
    namespaced: true,
    strict: true,
    state: {
        taskInfo: {
            title: '',
            description: '',
            deadline: ''
        },
        assignUser: {
            user_id: '',
        },
        allTasks: [],
        authTask: []
    },
    getters: {
    },
    mutations: {
        SET_TASKS_LIST(state, tasks) {
          state.allTasks = tasks
        },

        SET_TASK_TITLE(state, event) {
            state.taskInfo.title = event
        },

        SET_TASK_DESCRIPTION(state, event) {
            state.taskInfo.description = event
        },

        SET_TASK_DEADLINE(state, event) {
            state.taskInfo.deadline = event
        },

        //Assign user
        SET_USER_ID_FOR_TASK_ASSIGN(state, event) {
            state.assignUser.user_id = event
        },
        AUTHENTICATE_USER_TASK(state, tasks){
            state.authTask = tasks
        }
        
    },

    actions: {
       async getAllTasks({state, commit}){
            try {
                return await http()
                    .get('/tasks')
                    .then(({data}) => {
                        if (data.success == true) {
                            commit('SET_TASKS_LIST', data.data)
                        } 
                    })
                    .catch(({response}) => {
                        console.log(response)
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async createTask({state, commit}){
            try {
                return await http()
                    .post('/tasks', {
                        title: state.taskInfo.title,
                        description: state.taskInfo.description,
                        deadline: state.taskInfo.deadline,
                    })
                    .then(({data}) => {
                        if (data.success == true) {
                            toast.success("Task created successfully")
                            return router.push('/tasks')
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

        async assignTaskToUser({state, commit}, taskId){
            try {
                return await http()
                    .put('tasks/assign-user', {
                        id: taskId.id,
                        created_for: state.assignUser.user_id,
                    })
                    .then(({data}) => {
                        if (data.success == true) {
                            toast.success("Task Assigned to user successfully")
                            return router.push('/tasks')
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


        async getAuthenticatedUsersTasksList({state, commit}){
            try {
                return await http()
                    .get('/auth-user-tasks')
                    .then(({data}) => {
                        if (data.success == true) {
                            commit('AUTHENTICATE_USER_TASK', data.data)
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