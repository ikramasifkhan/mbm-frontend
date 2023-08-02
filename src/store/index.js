import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Cookies from 'js-cookie'
import auth from './auth'
import task from './task'
import user from './user'
import rules from './helpers/rules';
import errors from './helpers/errors';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    task,
    user,
    rules,
    errors
  },
  plugins: [createPersistedState({
    key: ['_mbm_c_t', 'client_name'],
    paths: ['auth.token', 'auth.authUserInfo.name'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
      removeItem: key => Cookies.remove(key)
    }
  },
  {
    key: ['client_name'],
    paths: ['auth.authUserInfo.name'],
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
      removeItem: key => Cookies.remove(key)
    }
  },
  )]
})
