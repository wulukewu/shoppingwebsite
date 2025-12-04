<template>
  <header>
    <h1 @click="gohomepage">碼的超市</h1>
    <nav>
        <router-link to="/shoppingpage">購物列表</router-link>
        <router-link to="/about">關於我們</router-link>
        <router-link to="/account">很會專區</router-link>
        <router-link to="/checkout">購物車</router-link>
        <button v-if="!authisvalidate" class="auth-btn login" @click="login">登入</button>
        <button v-else class="auth-btn logout" @click="logout">登出</button>
    </nav>
  </header>


  <main>
    <router-view></router-view>
  </main>


  <footer>    
      <p>© 2025 碼的超市 All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
    computed: {
        authisvalidate() {
            return this.$store.getters['auth/isAuthenticated'] ?? false;
        }

    },methods: {
        login() {
            this.$router.push('/login');
        },
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.replace('/');
        },
        gohomepage() {
            this.$router.push('/');
        }
    }
}
</script>



<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

header {
    background-color: #333;
    color: white;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}


header h1 {
    font-size: 36px;
    cursor: pointer;
    margin: 0;
}

nav {
    display: flex;
    align-items: center;
    gap: 5px;
}


nav a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.3s;
}

.auth-btn {
    height: 40px;
    padding: 8px 15px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s, transform 0.2s;
    display: flex;
    align-items: center;
}

.auth-btn.login {
    background: #444;
    color: white;
}

.auth-btn.login:hover {
    background: #545454;
}

.auth-btn.logout {
    background: #444;
    color: white;
}

.auth-btn.logout:hover {
    background: #545454;
}

main{
    padding-top: 80px;
    position: relative;
}

footer{
    background-color: #333;
    padding: 10px;
    width: 100%;
    height: 5%;
    text-align: center;
    border-radius: 10px 10px 0 0;
}
footer p{
    color: white;
    font-size: 12px;
}   
</style>
