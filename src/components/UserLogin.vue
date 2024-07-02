<template>
  <div class="login-container">
    <div class="cover-image">
      <img src="@/assets/cover.png" alt="Cover Image">
    </div>
    <div class="login-form">
      <div class="title-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
        <h1 class="main-title">常览题库</h1>
        <img src="@/assets/logo2.png" alt="Logo 2" class="logo2"> <!-- New logo added -->
      </div>
      <div class="login-box">
        <h2>用户登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">用户名:</label>
            <input id="username" v-model="loginInfo.username" type="number" required>
          </div>
          <div class="input-group">
            <label for="password">密码:</label>
            <input id="password" v-model="loginInfo.password" type="password" required>
          </div>
          <div class="button-group">
            <button type="submit" class="login-button">登录</button>
            <button @click="goToRegister" type="button" class="register-button">注册</button>
          </div>
        </form>
        <p v-if="message" :class="{ 'success-message': success, 'error-message': !success }">{{ message }}</p>
        <div class="helper-button">
          <a href="http://127.0.0.1:5000/" target="_blank" class="btn btn-info btn-lg">有问题？点击常览题库小助手问问吧！</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      message: '',
      success: false
    };
  },
  methods: {
    handleLogin() {
      const studentId = parseInt(this.loginInfo.username, 10);

      axios.post('http://localhost:8081/students/login', null, {
        params: {
          studentId: studentId,
          password: this.loginInfo.password
        }
      })
      .then(response => {
        console.log('登陆成功');
        this.message = response.data.message;
        this.success = true;
        sessionStorage.setItem('studentId', studentId);  // 确保保存正确的studentId
        sessionStorage.setItem('authToken', response.data.token);  // 保存token
        if (response.data.message === 'Teacher login successful') {
          this.$router.push('/teacher-dashboard');
        } else if (response.data.message === 'Student login successful') {
          this.$router.push('/student-dashboard');
        } else {
          this.message = 'Unexpected response: ' + response.data;
          this.success = false;
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        this.message = 'Login failed: ' + (error.response ? error.response.data : 'Server unreachable');
        this.success = false;
      });
    },
    goToRegister() {
      this.$router.push({ name: 'UserRegister' });
    }
  }
};
</script>

<style scoped>
/* 设置渐变背景 */
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f4f5f7;
  background-image: 
      linear-gradient(0deg, rgba(255,255,255,0.40) 0%, rgba(128, 178, 239, 0.773) 100%),
      radial-gradient(at 50% 87%, rgba(255,255,255,0.30) 0%, rgba(238, 239, 240, 0.628) 100%);
  background-blend-mode: multiply, normal;
}

.cover-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-image img {
  max-width: 100%;
  height: auto;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo2 {
  width: 400px;
  height: 100px;
  transform: translateX(-120px) translateY(-50px); /* Moves right 50px and up 30px */
}

.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  transform: translateY(-80px) translateX(200px);
}

.main-title {
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  transform: translateY(-80px) translateX(200px);
}

.login-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  margin-top: -80px;
  opacity: 0.8;
}

.login-box h2 {
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.login-button, .register-button {
  width: 48%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.login-button {
  background-color: #4CAF50;
  color: white;
}

.register-button {
  background-color: #008CBA;
  color: white;
}

.login-button:hover {
  background-color: #45a049;
}

.register-button:hover {
  background-color: #007bb5;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.helper-button a {
  display: inline-block;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: rgb(22, 68, 205);
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
</style>
