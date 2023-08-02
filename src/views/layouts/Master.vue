<template>
    <header class="app-header"><router-link class="app-header__logo" :to="{name: 'dashboard'}">MBM group</router-link>
        <ul class="app-nav">
            <li class="dropdown"><a class="app-nav__item" href="#" data-bs-toggle="dropdown" aria-label="Open Profile Menu">
                {{ getAuthName }}
            </a>
          <ul class="dropdown-menu settings-menu dropdown-menu-right">
            <li><a class="dropdown-item btn" @click="handleLogout"> Logout</a></li>
          </ul>
        </li>
        </ul>
    </header>
    <!-- Sidebar menu-->
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">

        <ul class="app-menu">
            <li>
                <router-link class="app-menu__item" :to="{ name: 'dashboard' }">
                    <span class="app-menu__label">Dashboard</span>
                </router-link>
            </li>

            <li>
                <router-link class="app-menu__item" :to="{ name: 'task-list' }">
                    <span class="app-menu__label">Task</span>
                </router-link>
            </li>
        </ul>
    </aside>
    <main class="app-content">
        <router-view></router-view>>
    </main>
</template>
  
<script lang="js">
import {mapState, mapGetters} from 'vuex'
export default {
    computed: {
        ...mapState('auth', ['userInfo']),
        ...mapGetters('auth', ['getAuthName'])
    },
    methods: {
        handleLogout(){
            this.$store.dispatch('auth/logout', {root:true}) 
        }
    }
}
</script>

<style>@import '@/assets/css/style.css';</style>