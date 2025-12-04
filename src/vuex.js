import {createStore} from 'vuex';
import productlist from './vuex/productlist.js';
import auth from './vuex/auth.js';

// import { mapState, mapActions } from "vuex";

const store = createStore({
    modules: {
        productlist,
        auth
    }
});
export default store;