import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

export default {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId') || null,
        token: localStorage.getItem('token') || null,
        tokenExpiration: localStorage.getItem('tokenExpiration') || null
    },
    mutations: {
        setuser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;

            if (payload.token) {
                localStorage.setItem('token', payload.token);
                localStorage.setItem('userId', payload.userId);
                localStorage.setItem('tokenExpiration', payload.tokenExpiration);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('tokenExpiration');
            }
        }
    },
    actions: {
        async login(context, payload) {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );

            const user = userCredential.user;
            if (!user) {
                throw new Error('Failed to authenticate.');
            }

            const token = await user.getIdToken();
            const tokenExpiration = (await user.getIdTokenResult()).expirationTime;

            context.commit('setuser', {
                token: token,
                userId: user.uid,
                tokenExpiration: tokenExpiration
            });
        },
        async signup(context, payload) {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );

            const user = userCredential.user;
            if (!user) {
                throw new Error('Failed to authenticate.');
            }

            const token = await user.getIdToken();
            const tokenExpiration = (await user.getIdTokenResult()).expirationTime;

            context.commit('setuser', {
                token: token,
                userId: user.uid,
                tokenExpiration: tokenExpiration
            });
        },
        logout(context) {
            signOut(auth);
            context.commit('setuser', {
                token: null,
                userId: null,
                tokenExpiration: null
            });
            console.log('logout');
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return !!state.token;
        }
    }
};
