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
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZBlN-IsCplF8R8qcNZyRpMc5C6zWKoUE',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true
                    })
                }
            );
            const responseData = await response.json();
            if (!response.ok) {
                console.log(responseData);
                const error = new Error(responseData.message || 'Failed to authenticate.');
                throw error;
            }
            context.commit('setuser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            });
        },
        async signup(context, payload) {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZBlN-IsCplF8R8qcNZyRpMc5C6zWKoUE',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true
                    })
                }
            );
            const responseData = await response.json();
            if (!response.ok) {
                console.log(responseData);
                const error = new Error(responseData.message || 'Failed to authenticate.');
                throw error;
            }
            context.commit('setuser', {
                token: responseData.idToken,
                userId: responseData.localId,
                tokenExpiration: responseData.expiresIn
            });
        },
        logout(context) {
            context.commit('setuser', {
                token: null,
                userId: null,
                tokenExpiration: null
            });
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');
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
