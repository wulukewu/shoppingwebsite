<template>
    <div class="register-container">
      <div class="register-card">
        <h2>註冊</h2>
        <form @submit.prevent="submitForm">
          <div class="input-group" :class="{ 'error': !formIsValid && !email.includes('@') }">
            <label for="email">Email</label>
            <input type="email" id="email" v-model.trim="email" placeholder="請輸入 Email">
          </div>
          <div class="input-group" :class="{ 'error': !formIsValid && password.length < 6 }">
            <label for="password">密碼</label>
            <input type="password" id="password" v-model.trim="password" placeholder="密碼至少 6 個字元">
          </div>
          <p v-if="!formIsValid" class="error-message">請輸入有效的 Email，密碼至少 6 個字元。</p>
          <button type="submit">註冊</button>
        </form>
        <p class="redirect-text">已經有帳號了？<span @click="goToLogin">登入</span></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        formIsValid: true
      };
    },
    methods: {
      submitForm() {
        this.formIsValid = true;
        if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
          this.formIsValid = false;
          return;
        }
        this.$store.dispatch('auth/signup', { email: this.email, password: this.password });
        this.$router.push('/login');
      },
      goToLogin() {
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>

  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: antiquewhite;
  }
  
  /* 註冊表單卡片 */
  .register-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 350px;
    text-align: center;
  }
  
  /* 標題 */
  h2 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 24px;
  }
  
  /* 輸入框 */
  .input-group {
    text-align: left;
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: border 0.3s;
  }
  
  /* 錯誤輸入框 */
  .input-group.error input {
    border-color: red;
  }
  
  /* 按鈕 */
  button {
    width: 100%;
    padding: 10px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background: #333;
    color: white;
    font-weight: bold;
    transition: background 0.3s;
  }
  
  button:hover {
    background: #555;
  }
  
  /* 錯誤訊息 */
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }
  
  /* 註冊跳轉 */
  .redirect-text {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
  }
  
  .redirect-text span {
    color: #007BFF;
    cursor: pointer;
    font-weight: bold;
  }
  
  .redirect-text span:hover {
    text-decoration: underline;
  }
  </style>
  