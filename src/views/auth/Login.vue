<template>
    <section class="login-content">
        <div class="login-box" style="min-height: 430px !important;">
            <form class="login-form">
                <h3 class="login-head"><i class="bi bi-person me-2"></i>SIGN IN</h3>
                <div class="mb-3 text-left">
                    <label class="form-label">Email</label>
                    <input class="form-control" type="email" placeholder="Email" v-model="email" v-validate="'required'">
                    <div class="form-control-feedback" v-if="errors && errors.email">
                        <span v-for="email in errors.email" class="text-danger">
                            {{ email }}
                        </span>
                    </div>
                </div>
                <div class="mb-3 text-left">
                    <label class="form-label">Password</label>
                    <input class="form-control" type="password" placeholder="Password" v-model="password">
                    <div class="form-control-feedback" v-if="errors && errors.password">
                        <span v-for="password in errors.password" class="text-danger">
                            {{ password }}
                        </span>
                    </div>
                </div>

                <div class="mb-3">
                    <div class="utility">
                        <p class="semibold-text mb-2">Don't have an account? <router-link :to="{ name: 'register' }"
                                data-toggle="flip">Register now</router-link></p>
                    </div>
                </div>

                <div class="mb-3 btn-container d-grid">
                    <button class="btn btn-primary btn-block" :disabled="disabled" type="button" @click="submitLoginInfo"><i
                            class="bi bi-box-arrow-in-right me-2 fs-5"></i>SIGN
                        IN</button>
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
            disabled: false,
        }
    },
    computed: {
        ...mapState('errors', ["errors"]),
        email: {
            get() {
                const str = JSON.stringify(this.$store.state.auth.loginInfo.email)
                return JSON.parse(str);
            },
            set(val) {
                this.$store.commit('auth/SET_LOGIN_EMAIL', val);
            }
        },
        password: {
            get() {
                const str = JSON.stringify(this.$store.state.auth.loginInfo.password)
                return JSON.parse(str);
            },
            set(val) {
                this.$store.commit('auth/SET_LOGIN_PASSWORD', val);
            }
        },
        ...mapState('auth', ['loginInfo'])
    },

    methods: {
        // changeEmail(e){
        //     this.$store.commit('auth/SET_LOGIN_EMAIL', e.target.value) 
        // },

        changePassword(e) {
            this.$store.commit('auth/SET_LOGIN_PASSWORD', e.target.value)
        },

        async submitLoginInfo() {
            this.disabled = true
            await this.$store.dispatch('auth/login', { root: true })
            this.disabled = false
        }
    }
}
</script>

<style>
@import '@/assets/css/main.css';
@import '@/assets/css/style.css';
</style>