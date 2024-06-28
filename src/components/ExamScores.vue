<template>
<div class="exam-scores-container">
  <h1>考试成绩管理</h1>
  <table class="table">
    <thead>
      <tr>
        <th>考试名称</th>
        <th>开始时间</th>
        <th>结束时间</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="exam in exams" :key="exam.examId">
        <td>{{ exam.examName }}</td>
        <td>{{ exam.startTime | formatDate }}</td>
        <td>{{ exam.endTime | formatDate }}</td>
        <td>
          <button @click="gradeExam(exam.examId)">批改</button>
          <button @click="viewResults(exam.examId)">查看成绩</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="selectedExamResults.length > 0">
    <h2>{{ selectedExamName }} 成绩详情</h2>
    <table class="table">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>成绩</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in selectedExamResults" :key="result.studentId">
          <td>{{ result.studentId }}</td>
          <td>{{ result.name }}</td>
          <td>{{ result.className }}</td>
          <td>{{ result.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      exams: [],
      selectedExamResults: [],
      selectedExamName: ''  ,// 用来存储当前选中的考试名称,
      selectedExamId: null  // Track the selected exam ID
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
    gradeExam(examId) {
      axios.post(`http://localhost:8081/exams/${examId}/grade`)
        .then(() => {
          alert('批改完成');
          this.fetchExams(); // 重新加载考试列表
        })
        .catch(error => {
          console.error('Error grading exam:', error);
        });
    },
    viewResults(examId) {
      if (this.selectedExamId === examId) {
        // Toggle visibility off
        this.selectedExamId = null;
        this.selectedExamResults = [];
      } else {
        // Load and display the results
        this.selectedExamId = examId;
        axios.get(`http://localhost:8081/exams/${examId}/results`)
          .then(response => {
            this.selectedExamResults = response.data;
          })
          .catch(error => {
            console.error('Error loading results:', error);
          });
      }
    },
    toggleResults(examId) {
    if (this.selectedExamId === examId) {
      this.selectedExamId = null;
      this.selectedExamResults = [];
      this.selectedExamName = '';  // 清空考试名称
    } else {
      this.selectedExamId = examId;
      const selectedExam = this.exams.find(exam => exam.examId === examId);
      this.selectedExamName = selectedExam ? selectedExam.examName : '';  // 设置考试名称
      axios.get(`http://localhost:8081/exams/${examId}/results`)
        .then(response => {
          this.selectedExamResults = response.data;
        })
        .catch(error => {
          console.error('Error loading results:', error);
        });
    }
  }
  },
  mounted() {
    this.fetchExams();
  }
};
</script>
<style scoped>
.exam-scores-container {
  width: 90%;
  margin: auto;
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse; /* 折叠边框为单一边框 */
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd; /* 添加浅灰色边框线 */
}

.table th {
  background-color: #f5f5f5;
}

button {
  margin-left: 10px;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}


.exam-list {
  list-style: none;
  padding: 0;
}

.exam-item {
  margin-bottom: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
}

button {
  margin-left: 10px;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.results-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.results-table th, .results-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.results-table th {
  background-color: #f4f4f4;
}

.results-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.results-table tr:hover {
  background-color: #f1f1f1;
}
</style>
