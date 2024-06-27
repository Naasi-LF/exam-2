<template>
    <div>
      <h1>{{ examName }}</h1>
      <!-- 显示题目和其他考试信息 -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['examId'],
    data() {
      return {
        examName: '',
        questions: [],
      };
    },
    methods: {
      fetchExamDetails() {
        // 从后端获取考试详情
      }
    },
    mounted() {
      this.fetchExamDetails();
    }
  };
  </script>
  