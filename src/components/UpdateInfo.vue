<template>
    <div class="update-info">
      <h1>修改信息</h1>
      <form @submit.prevent="submitInfo" class="update-form">
        <div class="input-group">
          <label for="name">姓名:</label>
          <input id="name" v-model="studentInfo.name" required>
        </div>
        <div class="input-group">
          <label for="className">班级:</label>
          <input id="className" v-model="studentInfo.className" required>
        </div>
        <div class="input-group">
          <label for="password">密码:</label>
          <input id="password" type="password" v-model="studentInfo.password" required>
        </div>
        <button type="submit" class="submit-button">提交修改</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        studentInfo: {
          name: '',
          className: '',
          password: ''
        }
      };
    },
    methods: {
      submitInfo() {
        const studentId = sessionStorage.getItem('studentId'); // 获取存储的学号
        const token = sessionStorage.getItem('authToken'); // 获取存储的JWT令牌
        console.log(`Sending token: ${token}`);
        axios.put(`http://localhost:8081/students/update/${studentId}`, this.studentInfo, {
          headers: {
            'Authorization': `Bearer ${token}`  // 确保格式正确
          }
        })
        .then(response => {
          alert('信息更新成功!');
          console.log(response.data);
          // 更新成功后跳转到学生仪表板
          this.$router.push('/student-dashboard');
        })
        .catch(error => {
          alert('更新失败: ' + (error.response ? error.response.data : '服务器不可达'));
          console.error(error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .update-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .update-form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .input-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .input-group label {
    margin-bottom: 5px;
    color: #666;
    font-weight: bold;
  }
  
  .input-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .submit-button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
    margin-top: 10px;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  </style>
  