<template>
  <div class="email-notification-container">
    <h2>发送考试成绩通知</h2>
    <ul class="exam-list">
      <li v-for="exam in exams" :key="exam.examId" class="exam-item">
        <span>
        <span class="exam-name">{{ exam.examName }}</span>
        <span class="exam-time">{{ exam.startTime | formatDate }} 到 {{ exam.endTime | formatDate }}</span>
        </span>

        <button @click="sendExamResults(exam.examId)">发送成绩通知</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmailNotification',
  data() {
    return {
      exams: [] // 存储从后端获取的考试信息
    };
  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleString();
    }
  },
  methods: {
    fetchExams() {
      axios.get('http://localhost:8081/teacher/activeExams')
        .then(response => {
          this.exams = response.data;
        })
        .catch(error => {
          console.error('Error loading exams:', error);
        });
    },
    sendExamResults(examId) {
      axios.get(`http://localhost:8081/teacher/sendExamResults/${examId}`)
        .then(() => {
          alert('成绩通知已发送!');
        })
        .catch(error => {
          console.error('Error sending exam results:', error);
          alert('发送失败，请稍后再试');
        });
    }
  },
  mounted() {
    this.fetchExams();
  }
};
</script>

<style scoped>
.exam-item span {
  display: block; /* 或者flex，根据需要调整 */
  color: #333; /* 文字颜色 */
  font-size: 1.2em; /* 调整字体大小 */
  margin-bottom: 5px; /* 下边距 */
}

.exam-item span .exam-name {
  font-weight: bold; /* 考试名称加粗 */
  color: #2a5caa; /* 考试名称颜色 */
}

.exam-item span .exam-time {
  font-size: 0.9em; /* 时间文字大小 */
  color: #555; /* 时间文字颜色 */
}

/* 可以为时间部分添加一个小图标或者特殊符号以增加视觉效果 */
.exam-item span .exam-time:before {
  content: '⏰'; /* 示例：添加一个时钟图标 */
  margin-right: 5px;
  color: #4CAF50; /* 图标颜色 */
}

.email-notification-container {
  width: 80%;
  margin: 40px auto;
  padding: 20px;
  background: #fff; /* 背景颜色 */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 添加阴影 */
  border-radius: 8px; /* 边框圆角 */
}

.exam-list {
  list-style: none;
  padding: 0;
  margin-top: 20px; /* 列表顶部间隔 */
}

.exam-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-left: 5px solid #4CAF50; /* 左侧边框条 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px; /* 边框圆角 */
}

button {
  padding: 10px 15px;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #368f3a; /* 按钮悬停颜色变化 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.2); /* 按钮悬停时添加阴影 */
}

/* 增加过渡动画，使变化更平滑 */
span {
  transition: color 0.3s;
}
</style>
