<template>
    <div class="account-container">
      <div class="account-card">
        <h2>帳號管理</h2>
        <div class="account-info">
          <p><strong>你的優哀低：</strong> {{ userid }}</p>
        </div>
        <div class="info">
          <h4>從零開始學著怎麼當一個碼農</h4>
          <!-- <p class="ascii-text">
            MySQL 跟 MySCORE 一樣<br>
             5 天的日出耶...<br>
            看我使用反轉卡 rul eo3AI<br>
          </p> -->
          <div class="ascii-box">
            <pre>
            ⣿⣿⡿⠋⠄⡀⣿⣿⣿⣿⣿⣿⣿⠿⠛⠋⣉⣉⣉⡉⠙⠻
            ⣿⣿⣇⠔⠈⣿⣿⣿⣿⡿⠛⢉⣤⣶⣾⣿⣿⣿⣿⣿⣿⣦
            ⣿⠃⠄⢠⣾⣿⣿⠟⢁⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
            ⣿⣿⣿⡟⠁⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
            ⣿⣿⠋⢠⣾⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿
            ⣿⣿⣿⣿⣿⠟⢁⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
            ⡿⠁⣰⣿⣿⣿⣿⣿⣿⣿⣿⠗⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿
            ⠁⣼⣿⣿⣿⣿⣿⣿⡿⠋⠄⠄⠄⣠⣄⢰⣿⣿⣿⣿⣿⣿
            ⣼⣿⣿⣿⣿⣿⣿⡇⠄⢀⡴⠚⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
            ⢰⣿⣿⣿⣿⣿⡿⣿⣿⠴⠋⠄⠄⢸⣿⣿⣿⣿⣿⣿⣿⡟
            ⣿⣿⣿⣿⣿⣿⠃⠈⠁⠄⠄⢀⣴⣿⣿⣿⣿⣿⣿⣿⡟⢀
            ⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⢶⣿⣿⣿⣿⣿⣿⣿⣿⠏⢀⣾
            ⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⠋⣠⣿⣿
            ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢁⣼⣿⣿⣿
            ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢁⣴⣿⣿⣿⣿⣿
            ⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⢁⣴⣿⣿⣿⠗⠄⠄⣿
            ⠈⠻⣿⣿⣿⣿⣿⣿⠿⠛⣉⣤⣾⣿⣿⣿⣿⣇⠠⠺⣷⣿
            </pre>
          </div>
          <!-- <p class="ascii-text">
            這個東西很厲害吧! <br>
            蛤~甚麼精神狀態？<br>
            我很好呀! 
          </p> -->
        </div>
        <button class="logout-btn" @click="logout">登出</button>
        <button @click="orderhistory">訂單紀錄</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      userid() {
        return this.$store.getters['auth/userId'];
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        this.$router.replace('/');
      },
      orderhistory(){
        this.$router.push('/order');
      }
    }
  };
  </script>
  
  <style scoped>

  .account-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5;
  }
  

  .account-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 420px;
    text-align: center;
  }
  

  h2 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 24px;
  }
  

  .account-info {
    background: #e3f2fd;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #1565c0;
    margin-bottom: 15px;
  }

  .ascii-text {
    font-size: 15px;
    color: #555;
    line-height: 1.6;
  }
  

  .ascii-box {
    background: #222;
    color: #00ff00;
    font-family: monospace;
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
    max-height: 180px;
    margin: 15px 0;
    text-align: left;
  }
  

  .logout-btn {
    width: 100%;
    padding: 12px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background: #d32f2f;
    color: white;
    font-weight: bold;
    transition: background 0.3s;
    margin-top: 20px;
  }
  
  .logout-btn:hover {
    background: #b71c1c;
  }
  </style>
  