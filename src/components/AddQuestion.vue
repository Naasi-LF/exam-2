<template>
    <div class="add-question">
      <div class="form-container">
        <h1>🌟添加题目</h1>
        <form @submit.prevent="submitQuestion">
          <div class="input-group">
            <label for="description">题目描述:</label>
            <textarea id="description" v-model="question.description" required></textarea>
          </div>
          <div class="input-group">
            <label for="optionA">选项A:</label>
            <input id="optionA" v-model="question.optionA" required>
          </div>
          <div class="input-group">
            <label for="optionB">选项B:</label>
            <input id="optionB" v-model="question.optionB" required>
          </div>
          <div class="input-group">
            <label for="optionC">选项C:</label>
            <input id="optionC" v-model="question.optionC" required>
          </div>
          <div class="input-group">
            <label for="optionD">选项D:</label>
            <input id="optionD" v-model="question.optionD" required>
          </div>
          <div class="input-group">
            <label for="correctAnswer">正确答案:</label>
            <select id="correctAnswer" v-model="question.correctAnswer" required>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <button type="submit">提交题目</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        question: {
          description: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctAnswer: 'A'
        }
      };
    },
    methods: {
      submitQuestion() {
        axios.post('http://localhost:8081/teacher/addQuestion', this.question)
          .then(response => {
            alert('题目添加成功!');
            console.log(response.data);
            // 清空表单
            this.question = {
              description: '',
              optionA: '',
              optionB: '',
              optionC: '',
              optionD: '',
              correctAnswer: 'A'
            };
          })
          .catch(error => {
            alert('题目添加失败: ' + (error.response ? error.response.data : '服务器不可达'));
            console.error(error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .add-question {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
    font-family: 'Arial', sans-serif;
  }
  
  .form-container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    max-width: 800px;
    width: 100%;
    box-sizing: border-box;
  }
  
  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .input-group {
    margin-bottom: 15px;
    width: 100%;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: bold;
  }
  
  .input-group input,
  .input-group select,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  textarea {
    height: 150px;
    resize: none;
  }
  
  button {
    background-color: #007BFF;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.3s;
    width: 100%;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  </style>
  