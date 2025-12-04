<template>
    <div class="login-container">
      <div class="login-card">
        <h2>登入</h2>
        <form @submit.prevent="login">
          <input type="text" placeholder="E-mail" v-model="email">
          <input type="password" placeholder="Password" v-model="password">
          <button type="submit" class="login-btn">Login</button>
          <button type="button" class="signup-btn" @click="goToSignup">Sign up</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async login() {
          try{
            await this.$store.dispatch('auth/login', {email: this.email, password: this.password});
            console.log('login success');
            this.$router.push('/');
          }catch(err){
            this.errorMessage = err.message || 'Login failed. Please check your credentials.';
          }
      },
        
      goToSignup() {
        this.$router.push('/signup');
      }
    }
  };
  </script>
  
  <style scoped>

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: antiquewhite
  }
  
  .login-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 320px;
    text-align: center;
  }
  
  h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  /* 輸入框設計 */
  input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  /* 按鈕設計 */
  button {
    width: 100%;
    padding: 10px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .login-btn {
    background: #333;
    color: white;
    font-weight: bold;
  }
  
  .signup-btn {
    background: #333;
    color: white;
    font-weight: bold;
  }
  
  /* 錯誤訊息 */
  .error-message {
    color: red;
    margin-top: 10px;
    font-size: 14px;
  }
  </style>
  