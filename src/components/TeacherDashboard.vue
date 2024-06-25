<template>
  <div class="teacher-dashboard-wrapper">
    <aside class="sidebar">
      <div class="profile">
        <img src="@/assets/head3.png" alt="Profile Image" class="profile-image">
        <h2 class="welcome-message">教师管理平台</h2>
      </div>
      <nav class="menu">
        <router-link to="/teacher-dashboard/add-question" class="menu-item">添加题目</router-link>
        <router-link to="/teacher-dashboard/publish-exam" class="menu-item">发布考试</router-link>
        <router-link to="/teacher-dashboard/manage-students" class="menu-item">学生管理</router-link>
        <router-link to="/teacher-dashboard/exam-scores" class="menu-item">考试成绩</router-link>
        <router-link to="/teacher-dashboard/email-notification" class="menu-item">邮箱通知</router-link>
      </nav>
    </aside>
    <main class="content">
      <router-view></router-view> <!-- 动态显示右侧内容 -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'TeacherDashboard',
};
</script>

<style scoped>
.teacher-dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.sidebar {
  width: 200px; /* 菜单栏宽度 */
  background-color: #6eaef3;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.welcome-message {
  margin-bottom: 20px;
  text-align: center;
    /* 添加字体样式 */
  font-family: 'Arial', sans-serif;
  font-size: 25px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体粗细 */
}

.menu {
  width: 100%;
}

.menu-item {
  display: block;
  width: 100%; /* 设置菜单项宽度为100% */
  padding: 15px 0; /* 增加上下填充 */
  margin-bottom: 10px;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #2186f2;
  border-radius: 5px;
  transition: background-color 0.3s;
    /* 添加字体样式 */
  font-family: 'Arial', sans-serif;
  font-size: 16px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体粗细 */
}

.menu-item:hover {
  background-color: #004080;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
}
</style>
