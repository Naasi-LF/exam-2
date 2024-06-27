<template>
  <div class="register-container">
    <h1 class="main-title">用户注册</h1>
    <div class="register-box">
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="studentId">学号:</label>
          <input id="studentId" v-model="registerInfo.studentId" type="text" required>
        </div>
        <div class="input-group">
          <label for="name">姓名:</label>
          <input id="name" v-model="registerInfo.name" type="text" required>
        </div>
        <div class="input-group">
          <label for="className">班级:</label>
          <input id="className" v-model="registerInfo.className" type="text" required>
        </div>
        <div class="input-group">
          <label for="password">密码:</label>
          <input id="password" v-model="registerInfo.password" type="password" required>
        </div>
        <button type="submit" class="register-button">注册</button>
      </form>
      <!-- Conditionally display the message based on its existence -->
      <p v-if="message" :class="{ 'success-message': success, 'error-message': !success }">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      registerInfo: {
        studentId: '',
        name: '',
        className: '',
        password: ''
      },
      message: '',
      success: false
    };
  },
  methods: {
    handleRegister() {
      axios.post('http://localhost:8081/students/register', this.registerInfo)
        .then(() => {
          this.message = '注册成功';
          this.success = true;
          // Optionally redirect or perform other actions
        })
        .catch(error => {
          this.message = error.response ? error.response.data.message || 'Registration failed!' : 'Server unreachable';
          this.success = false;
        });
    }
  }
};
</script>

<style scoped>
/* 设置渐变背景 */
.register-container {
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f4f5f7;
  background-image: 
      linear-gradient(0deg, rgba(255,255,255,0.40) 0%, rgba(54, 3, 91, 0.773) 100%),
      radial-gradient(at 50% 87%, rgba(255,255,255,0.30) 0%, rgba(5, 90, 176, 0.628) 100%);
  background-blend-mode: multiply, normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transform-style: preserve-3d;
  transform: perspective(800px);
}

.main-title {
  font-size: 3rem;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  transform: translateY(-80px); /* 通过 translateY 将标题向上移动 */
}

.register-box {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  margin-top: -80px; /* 向上移动登录框，可以根据需要调整这个值 */
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

.register-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  background-color: #008CBA;
  color: white;
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
</style>
