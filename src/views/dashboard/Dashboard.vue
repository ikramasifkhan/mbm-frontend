<template>
    <div class="app-title">
        <div>
            <h1><i class="bi bi-speedometer"></i> Dashboard Page</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item"><a href="#">Dashboard Page</a></li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="widget-small primary coloured-icon" style="padding: 10px 0;">
                <div class="info">
                    <h4>Total Task</h4>
                    <p><b>{{ allTasks.length }}</b></p>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="widget-small primary coloured-icon" style="padding: 10px 0;">
                <div class="info">
                    <h4>My Task</h4>
                    <p><b>{{ authTask.length }}</b></p>
                </div>
            </div>
        </div>
        
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="tile">
                <div class="tile-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(task, index) in authTask" :key="task.id">
                                    <tr>

                                        <td>{{ index += 1 }}</td>
                                        <td class="text-left">{{ task.title }}</td>
                                        <td class="text-left">{{ task.description }}</td>
                                        <td class="text-left">{{ task.created_by.name }}</td>
                                        <td>
                                            <span class="me-1 badge badge-pill bg-warning"
                                                v-if="task.status == 'open'">Open</span>
                                            <span class="me-1 badge badge-pill bg-info"
                                                v-if="task.status == 'in-progress'">In progress</span>
                                            <span class="me-1 badge badge-pill bg-success"
                                                v-if="task.status == 'done'">Done</span>
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
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState('auth', ['userInfo']),
        ...mapState('task', ['authTask', "allTasks"])
    },

    methods: {
        ...mapActions('task', ["getAuthenticatedUsersTasksList", "getAllTasks"])
    },
    mounted() {
        this.getAuthenticatedUsersTasksList()
        this.getAllTasks()
    }
}
</script>