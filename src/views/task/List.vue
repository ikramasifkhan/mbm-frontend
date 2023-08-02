<template>
    <div class="app-title">
        <div>
            <h1><i class="bi bi-speedometer"></i>Task Page</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/dashboard">Home</router-link>
            </li>
            <li class="breadcrumb-item">Task list</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="tile">
                                <h4 class=" text-left">
                                    Task Table
                                </h4>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="tile">
                                <h4 class="text-right">
                                    <router-link :to="{name: 'task-create'}">Add task</router-link>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="tile">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Created by</th>
                                                <th>Created for</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(task, index) in allTasks" :key="task.id">
                                            <tr >
                                               
                                                <td>{{ index += 1 }}</td>
                                                <td class="text-left">{{ task.title }}</td>
                                                <td class="text-left">{{ task.description }}</td>
                                                <td class="text-left">{{ task.created_by.name }}</td>
                                                <td>{{ task.created_for!=null ? task.created_for.name : '' }}</td>
                                                <td>
                                                    <span class="me-1 badge badge-pill bg-warning" v-if="task.status == 'open'">Open</span>
                                                    <span class="me-1 badge badge-pill bg-info" v-if="task.status == 'in-progress'">In progress</span>
                                                    <span class="me-1 badge badge-pill bg-success" v-if="task.status == 'done'">Done</span>
                                                </td>

                                                <td>
                                                    <span v-if="task.status === 'open'">
                                                        <router-link :to="{name: 'assign-user', params: {id: task.id}}">Assign now</router-link>
                                                    </span>
                                                </td>
                                            </tr>
                                        </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="js">
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('task', ['allTasks'])
    },

    methods: {
        ...mapActions('task', ["getAllTasks"]),
    },

    mounted() {
        this.getAllTasks()
    }
}
</script>

<style>
@import '@/assets/css/main.css';
@import '@/assets/css/style.css';
</style>