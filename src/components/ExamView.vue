<template>
  <div class="exam-container">
    <h1>{{ examName }}</h1>
    <div v-if="questions.length > 0" class="content">
      <div class="question">
        <p>{{ currentQuestionIndex + 1 }}. {{ currentQuestion.description }}</p>
        <ul>
          <li v-for="option in ['A', 'B', 'C', 'D']" :key="option" class="option">
            <label class="option-label">
              <span class="option-prefix">{{ option }}</span>
              <input type="radio" :name="currentQuestion.questionId" :value="option" v-model="answers[currentQuestion.questionId]">
              {{ currentQuestion['option' + option] }}
            </label>
          </li>
        </ul>
      </div>
      <div class="navigation-buttons">
        <button v-if="currentQuestionIndex > 0" @click="prevQuestion">上一题</button>
        <button v-if="currentQuestionIndex < questions.length - 1" @click="nextQuestion">下一题</button>
        <button v-if="currentQuestionIndex === questions.length - 1" @click="submitAnswers">提交答案</button>
      </div>
    </div>
    <div v-else class="loading-message">
      <p>加载问题中...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      examId: this.$route.params.examId,
      examName: '考试',
      questions: [],
      answers: {},
      currentQuestionIndex: 0
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    fetchExamDetails() {
      axios.get(`http://localhost:8081/exams/${this.examId}/questions`)
        .then(response => {
          this.questions = response.data;
          this.initAnswers();
        })
        .catch(error => {
          console.error('Error loading questions:', error);
        });
    },
    initAnswers() {
      this.questions.forEach(question => {
        this.$set(this.answers, question.questionId, null);
      });
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    submitAnswers() {
      const answersToSubmit = this.questions.map(question => ({
        studentId: sessionStorage.getItem('studentId'),
        examId: this.examId,
        questionId: question.questionId,
        studentAnswer: this.answers[question.questionId]
      }));
      axios.post(`http://localhost:8081/exams/${this.examId}/answers`, answersToSubmit)
        .then(() => {
          alert('Answers submitted successfully!');
          this.$router.replace('/student-dashboard');
        })
        .catch(error => {
          console.error('Error submitting answers:', error);
        });
    }
  },
  mounted() {
    this.fetchExamDetails();
  }
};
</script>

<style scoped>
.exam-container {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content {
  margin-top: 20px;
}
.question {
  text-align: left;
  width: 100%;
}
.question p {
  font-weight: bold;
}
.option {
  margin-bottom: 10px;
}
.option-label {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.option-prefix {
  margin-right: 10px;
  font-weight: bold;
  color: #333;
}
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
.loading-message {
  text-align: center;
  font-size: 16px;
}
</style>
