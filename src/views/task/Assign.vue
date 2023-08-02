<template>
    <div class="app-title">
        <div>
            <h1><i class="bi bi-speedometer"></i>Task Page</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/dashboard">Home</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/tasks">Task list</router-link>
            </li>
            <li class="breadcrumb-item">Task assign</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="tile">
                <h3 class="tile-title text-left">Assign a user</h3>
                <div class="tile-body">
                    <form>
                        <div class="mb-3 text-left">
                            <label class="form-label ">Select a user</label>
                            <select class="form-control" @input="changeUserId">
                                <option disabled value="" selected>Please select one</option>
                                <option v-for="user in allUsers" :key="user.id" :value="user.id">{{ user.name }}</option>
                            </select>

                            <div class="form-control-feedback" v-if="errors && errors.created_for">
                                <span v-for="created_for in errors.created_for" class="text-danger">
                                    Please select an user
                                </span>
                            </div>
                        </div>
                        <div class="mb-3 text-left">
                            <button class="btn btn-primary" :disabled="disabled" type="button" @click="handleSubmit">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="js">
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            disabled: false
        }
    },
    computed: {
        ...mapState('errors', ['errors']),
        ...mapState('user', ['allUsers'])
    },

    methods: {
        ...mapActions('user', ["getAllUsersForAssignTask"]),

        changeUserId(e){
            this.$store.commit('task/SET_USER_ID_FOR_TASK_ASSIGN', e.target.value) 
        },

        async handleSubmit(){
            this.disabled = true
            await this.$store.dispatch('task/assignTaskToUser', {id: this.$route.params.id}, {root:true}) 
            this.disabled = false
        }
    },

    mounted() {
        this.getAllUsersForAssignTask()
    }
}
</script>

<style>
@import '@/assets/css/main.css';</style>