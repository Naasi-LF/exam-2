<template>
  <div class="publish-exam">
    <h1>发布考试</h1>
    <form @submit.prevent="publishExam" class="exam-form">
      <div class="input-group">
        <label for="examName">考试名称:</label>
        <input id="examName" v-model="examInfo.examName" placeholder="请输入考试名称" required>
      </div>
      <div class="input-group">
        <label for="startTime">开始时间:</label>
        <input type="datetime-local" id="startTime" v-model="examInfo.startTime" required>
      </div>
      <div class="input-group">
        <label for="endTime">结束时间:</label>
        <input type="datetime-local" id="endTime" v-model="examInfo.endTime" required>
      </div>
      <div class="input-group">
        <label for="questionIds">输入题目ID（用逗号分隔）:</label>
        <input id="questionIds" v-model="selectedQuestionIds" placeholder="例如: 1,2,3" required>
      </div>
      <div class="questions-list">
        <h2 @click="toggleQuestionsVisibility" class="questions-button">点击查看题库</h2>
        <ul v-if="showQuestions">
          <li v-for="question in questions" :key="question.questionId">
            <strong>ID:</strong> {{ question.questionId }} <strong>描述:</strong> {{ question.description }}
            <div v-if="question.optionA || question.optionB || question.optionC || question.optionD">
              <strong>选项:</strong>
              <ul class="options-list">
                <li>A: {{ question.optionA }}</li>
                <li>B: {{ question.optionB }}</li>
                <li>C: {{ question.optionC }}</li>
                <li>D: {{ question.optionD }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <button type="submit" class="submit-button">发布</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questions: [],
      examInfo: {
        examName: '',
        startTime: '',
        endTime: ''
      },
      selectedQuestionIds: '',
      showQuestions: false  // 控制题目列表显示状态
    };
  },
  methods: {
    fetchQuestions() {
      axios.get('http://localhost:8081/teacher/questions')
        .then(response => {
          this.questions = response.data;
          console.log('Questions fetched:', this.questions);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    },
    publishExam() {
      const payload = {
        examInfo: this.examInfo,
        questionIds: this.selectedQuestionIds.split(',').map(Number)
      };
      axios.post('http://localhost:8081/teacher/publishExam', payload)
        .then(response => {
          alert('考试发布成功! ' + response.data.message);
        })
        .catch(error => {
          alert('发布考试失败: ' + (error.response ? error.response.data : '服务器无法访问'));
        });
    },
    toggleQuestionsVisibility() {
      this.showQuestions = !this.showQuestions;
    }
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>

<style>
.publish-exam {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.exam-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input-group input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.questions-list {
  grid-column: 1 / -1;
  margin-top: 20px;
}

.questions-list h2 {
  margin-bottom: 10px;
}

.questions-list ul {
  list-style-type: none;
  padding: 0;
}

.questions-list li {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
}

.options-list {
  padding-left:20px;
}

.submit-button {
  grid-column: 1 / -1;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.submit-button:hover {
  background-color: #0056b3;
}
/* Button Style */
.questions-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  text-align: center;
  margin: 20px 0;
}

/* Hover and Active State Styles */
.questions-button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.questions-button:active {
  background-color: #004494;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Add responsiveness to the form */
@media (max-width: 768px) {
  .exam-form {
    grid-template-columns: 1fr;
  }

  .submit-button {
    width: 100%;
  }
}
</style>
