<template>
    <section class="login-content">
        <div class="login-box" style="min-height: 700px !important;">
            <form class="login-form">
                <h3 class="login-head"><i class="bi bi-person me-2"></i>SIGN UP</h3>
                <div class="mb-3 text-left">
                    <label class="form-label">Name</label>
                    <input class="form-control" type="text" placeholder="Your name" :value="userInfo.name"
                        @input="changeName">

                    <div class="form-control-feedback" v-if="errors && errors.name">
                        <span v-for="name in errors.name" class="text-danger">
                            {{ name }}
                        </span>
                    </div>
                </div>

                <div class="mb-3 text-left">
                    <label class="form-label">Email</label>
                    <input class="form-control" type="email" placeholder="Your email" :value="userInfo.email"
                        @input="changeEmail">

                    <div class="form-control-feedback" v-if="errors && errors.email">
                        <span v-for="email in errors.email" class="text-danger">
                            {{ email }}
                        </span>
                    </div>
                </div>

                <div class="mb-3 text-left">
                    <label class="form-label">Mobile</label>
                    <input class="form-control" type="text" placeholder="Your mobile" :value="userInfo.mobile"
                        @input="changeMobile">

                    <div class="form-control-feedback" v-if="errors && errors.mobile">
                        <span v-for="mobile in errors.mobile" class="text-danger">
                            {{ mobile }}
                        </span>
                    </div>
                </div>

                <div class="mb-3 text-left">
                    <label class="form-label">Password</label>
                    <input class="form-control" type="password" placeholder="Password" :value="userInfo.password"
                        @input="changePassword">

                    <div class="form-control-feedback" v-if="errors && errors.password">
                        <span v-for="password in errors.password" class="text-danger">
                            {{ password }}
                        </span>
                    </div>
                </div>

                <div class="mb-3 text-left">
                    <label class="form-label">Re-Write password</label>
                    <input class="form-control" type="password" placeholder="Re-type password"
                        :value="userInfo.password_confirmation" @input="changePasswordConfirmation">
                </div>

                <div class="mb-3">
                    <div class="utility">
                        <p class="semibold-text mb-2">Already have an account? <router-link :to="{name: 'login'}" data-toggle="flip">Login</router-link></p>
                    </div>
                </div>

                <div class="mb-3 btn-container d-grid">
                    <button class="btn btn-primary btn-block" :disabled="disabled" type="button"
                        @click="submitRegisterInfo"><i class="bi bi-box-arrow-in-right me-2 fs-5"></i>SIGN UP</button>
                </div>
            </form>
        </div>
    </section>
</template>
  
<script lang="js">
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    data() {
        return {
            disabled: false
        }
    },

    computed: {
        ...mapState('auth', ['userInfo']),
        ...mapState('errors', ['errors'])
    },

    methods: {
        changeName(e) {
            this.$store.commit('auth/SET_USER_NAME', e.target.value)
        },

        changeEmail(e) {
            this.$store.commit('auth/SET_USER_EMAIL', e.target.value)
        },

        changeMobile(e) {
            this.$store.commit('auth/SET_USER_MOBILE', e.target.value)
        },

        changePassword(e) {
            this.$store.commit('auth/SET_USER_PASSWORD', e.target.value)
        },

        changePasswordConfirmation(e) {
            this.$store.commit('auth/SET_USER_PASSWORD_CONFIRMATION', e.target.value)
        },

        async submitRegisterInfo() {
            this.disabled = true
            await this.$store.dispatch('auth/registration', { root: true })
            this.disabled = false
        }
    }
}
</script>

<style>
@import '@/assets/css/main.css';
@import '@/assets/css/style.css';
</style>