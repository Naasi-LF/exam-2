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
            <button @click="toggleStatistics(exam.examId)">查看分析</button>
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

    <div v-if="showStatistics">
      <h2>{{ selectedExamName }} 分析</h2>
      <p>平均分: {{ examStatistics.averageScore }}</p>
      <p>最高分: {{ examStatistics.highestScore }}</p>
      <p>最低分: {{ examStatistics.lowestScore }}</p>
      <canvas id="scoreDistributionChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  data() {
    return {
      exams: [],
      selectedExamResults: [],
      selectedExamName: '',
      selectedExamId: null,
      examStatistics: null,
      showStatistics: false,
    };
  },
  filters: {
    formatDate(value) {
      if (!value) return '';
      const date = new Date(value);
      return date.toLocaleString();
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
          this.fetchExams();
        })
        .catch(error => {
          console.error('Error grading exam:', error);
        });
    },
    viewResults(examId) {
      if (this.selectedExamId === examId) {
        this.selectedExamId = null;
        this.selectedExamResults = [];
      } else {
        this.selectedExamId = examId;
        const selectedExam = this.exams.find(exam => exam.examId === examId);
        this.selectedExamName = selectedExam ? selectedExam.examName : '';
        axios.get(`http://localhost:8081/exams/${examId}/results`)
          .then(response => {
            this.selectedExamResults = response.data;
          })
          .catch(error => {
            console.error('Error loading results:', error);
          });
      }
    },
    toggleStatistics(examId) {
      if (this.showStatistics && this.selectedExamId === examId) {
        this.showStatistics = false;
      } else {
        this.selectedExamId = examId;
        const selectedExam = this.exams.find(exam => exam.examId === examId);
        this.selectedExamName = selectedExam ? selectedExam.examName : '';
        axios.get(`http://localhost:8081/exams/${examId}/statistics`)
          .then(response => {
            this.examStatistics = response.data;
            this.showStatistics = true;
            this.$nextTick(() => {
              this.renderChart();
            });
          })
          .catch(error => {
            console.error('Error loading statistics:', error);
          });
      }
    },
    renderChart() {
      const ctx = document.getElementById('scoreDistributionChart').getContext('2d');
      const labels = this.examStatistics.scoreDistribution.map(result => result.name);
      const scores = this.examStatistics.scoreDistribution.map(result => result.score);
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Score',
            data: scores,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
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
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
