<template>
  <div>
    <div class="student-dashboard">
      <div class="profile">
        <img src="@/assets/head.png" alt="Profile Image" @click="toggleMenu" class="profile-image">
        <span class="welcome-message">{{ studentName }}同学，欢迎登录</span>
      </div>
      <div v-if="showMenu" class="menu">
        <button class="menu-button" @click="goToUpdateInfo">修改信息</button>
        <button class="menu-button logout-button" @click="confirmLogout">注销</button>
        <button class="menu-button exit-button" @click="exit">退出</button>
      </div>
    </div>
    <!-- 新增显示考试列表 -->
    <!-- 显示考试列表 -->
      <div v-if="exams.length > 0" class="exams-list">
        <h3 class="exams-title">可参加的考试:</h3>
        <ul>
          <li v-for="exam in exams" :key="exam.examId">
            <span class="exam-name">{{ exam.examName }}</span> - 
            <span class="exam-time">从 {{ formatDate(exam.startTime) }} 到 {{ formatDate(exam.endTime) }}</span>
            <button v-if="isExamAvailable(exam.startTime)" @click="enterExam(exam.examId)">进入考试</button>
            <span v-else class="countdown">{{ countdown(exam.startTime) }}</span>
          </li>
        </ul>
      </div>

    <router-view></router-view> <!-- 子路由内容显示在这里 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      studentName: '', // 从后端获取
      showMenu: false,
      exams: [], // 存储考试列表
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    goToUpdateInfo() {
      const currentRoute = this.$route.name;
      if (currentRoute === 'UpdateInfo') {
        this.$router.replace({ name: 'StudentDashboard' }); // 导航到一个中间状态
      } else {
        this.$router.push({ name: 'UpdateInfo' }); // 导航到修改信息页面
      }
    },

    confirmLogout() {
      if (confirm("是否确定注销，注销后无法回退！")) {
        const studentId = sessionStorage.getItem('studentId');  // 获取学生ID
        const token = sessionStorage.getItem('authToken');  // 获取JWT令牌

        console.log('Student ID:', studentId);  // 打印学生ID，检查其值是否为null或undefined

        if (!studentId || !token) {
          alert('无法获取学生ID或Token，请重新登录再试');
          return;
        }

        axios.delete(`http://localhost:8081/students/delete/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          console.log(response.data);
          alert('账号已成功注销');
          sessionStorage.clear();
          this.$router.push('/');
        })
        .catch(error => {
          console.error('注销失败:', error);
          alert('注销失败: ' + (error.response ? error.response.data : '服务器不可达'));
        });
      }
    },

    exit() {
      sessionStorage.clear();
      this.$router.push('/');
    },

    fetchStudentInfo() {
      const studentId = sessionStorage.getItem('studentId');

      if (!studentId) {
        alert('无法获取学生ID，请重新登录再试');
        this.$router.push('/');
        return;
      }

      axios.get(`http://localhost:8081/students/info/${studentId}`)
      .then(response => {
        this.studentName = response.data.name; // 更新studentName
      })
      .catch(error => {
        console.error('获取学生信息失败:', error);
        alert('获取学生信息失败: ' + (error.response ? error.response.data : '服务器不可达'));
      });
    },

    fetchAvailableExams() {
      axios.get('http://localhost:8081/teacher/activeExams')
      .then(response => {
        this.exams = response.data;
      })
      .catch(error => {
        console.error('获取可用考试列表失败:', error);
        alert('获取可用考试列表失败: ' + (error.response ? error.response.data : '服务器不可达'));
      });
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    },
    isExamAvailable(startTime) {
      const now = new Date();
      const start = new Date(startTime);
      return now >= start;
    },
    countdown(startTime) {
      const now = Date.now();
      const start = new Date(startTime).getTime();
      const diff = start - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
      }
      return 'Starting soon!';
    }
  },
  mounted() {
    this.fetchStudentInfo();
    this.fetchAvailableExams();
    setInterval(() => {
      this.exams.forEach(exam => {
        if (!this.isExamAvailable(exam.startTime)) {
          this.countdown(exam.startTime);
        }
      });
    }, 1000);
  }
};
</script>


<style scoped>
.student-dashboard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.profile {
  display: flex;
  align-items: center;
  position: relative;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;
}

.welcome-message {
  font-size: 22px;
  color: #1a73e8;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}

.menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 85px; /* 调整位置以确保菜单出现在头像下方 */
  left: 27px; /* 调整位置以确保菜单与头像对齐 */
  background-color: transparent; /* 设置为透明 */
  border: none;
  box-shadow: none;
  z-index: 1000;
}

.menu-button {
  width: 50px; /* 按钮宽度 */
  height: 50px; /* 按钮高度 */
  border-radius: 50%;
  margin: 5px 0;
  background-color: transparent; /* 设置为透明 */
  color: white;
  border: 2px solid #4CAF50;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-button.logout-button {
  border-color: #f44336;
}

.menu-button.exit-button {
  border-color: #1a73e8;
}

.menu-button:hover {
  background-color: #4CAF50;
  color: white;
  border-color: #45a049;
}

.menu-button.logout-button:hover {
  background-color: #f44336;
  color: white;
  border-color: #e53935;
}

.menu-button.exit-button:hover {
  background-color: #1a73e8;
  color: white;
  border-color: #0b5ed7;
}

.exams-list {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.exams-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.exams-list ul {
  list-style: none;
  padding: 0;
}

.exams-list li {
  margin: 10px 0;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
}

.exam-name {
  color: red;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
}

.exam-time {
  font-weight: bold;
}

.countdown {
  margin-left: 10px;
  font-style: italic;
}

.exams-list button {
  margin-left: 10px;
  background: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.exams-list button:hover {
  background: #45a049;
}
</style>
