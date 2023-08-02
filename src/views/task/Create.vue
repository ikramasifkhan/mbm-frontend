<template>
    <div class="app-title">
        <div>
            <h1><i class="bi bi-speedometer"></i>Task Page</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
            <li class="breadcrumb-item"><i class="bi bi-house-door fs-6"></i></li>
            <li class="breadcrumb-item"><a href="#">Task Page</a></li>
        </ul>
    </div>
    <div class="row">
        <div class="col-md-5">
            <div class="tile">
                <h3 class="tile-title text-left">Add task</h3>
                <div class="tile-body">
                    <form>
                        <div class="mb-3 text-left">
                            <label class="form-label">Title</label>
                            <input class="form-control" type="text" placeholder="Enter full title" :value="taskInfo.title"
                                @input="changeTaskTitle">
                            <div class="form-control-feedback" v-if="errors && errors.title">
                                <span v-for="title in errors.title" class="text-danger">
                                    {{ title }}
                                </span>
                            </div>
                        </div>

                        <div class="mb-3 text-left">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" rows="4" placeholder="Enter description"
                                :value="taskInfo.description" @input="changeTaskDescription"></textarea>

                            <div class="form-control-feedback" v-if="errors && errors.description">
                                <span v-for="description in errors.description" class="text-danger">
                                    {{ description }}
                                </span>
                            </div>
                        </div>

                        <div class="mb-3 text-left">
                            <label class="form-label">Deadline</label>
                            <input class="form-control" type="date" placeholder="Give a deadline" :value="taskInfo.deadline"
                                @input="changeTaskDeadline">
                            
                            <div class="form-control-feedback" v-if="errors && errors.deadline">
                                <span v-for="deadline in errors.deadline" class="text-danger">
                                    {{ deadline }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-3 text-left">
                            <button class="btn btn-primary btn-block" :disabled="disabled" type="button"
                                @click="handleSubmit">Submit</button>
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
        ...mapState('task', ['taskInfo'])
    },

    methods: {
        ...mapActions('task', ["getAllTasks"]),

        changeTaskTitle(e) {
            this.$store.commit('task/SET_TASK_TITLE', e.target.value)
        },

        changeTaskDescription(e) {
            this.$store.commit('task/SET_TASK_DESCRIPTION', e.target.value)
        },

        changeTaskDeadline(e) {
            this.$store.commit('task/SET_TASK_DEADLINE', e.target.value)
        },

        async handleSubmit() {
            this.disabled = true
            await this.$store.dispatch('task/createTask', { root: true })
            this.disabled = false
        }
    },

    mounted() {

    }
}
</script>

<style>
@import '@/assets/css/main.css';
@import '@/assets/css/style.css';
</style>