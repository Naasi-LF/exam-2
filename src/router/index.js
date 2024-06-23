import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import StudentDashboard from '../components/StudentDashboard.vue';
import TeacherDashboard from '../components/TeacherDashboard.vue';
import UpdateInfo from '../components/UpdateInfo.vue';
import AddQuestion from '../components/AddQuestion.vue';
import PublishExam from '../components/PublishExam.vue';
import ManageStudents from '../components/ManageStudents.vue';
import ExamScores from '../components/ExamScores.vue';
import EmailNotification from '../components/EmailNotification.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/student-dashboard',
      name: 'StudentDashboard',
      component: StudentDashboard,
      meta: { requiresAuth: true },  // 需要登录才能访问
      children: [
        {
          path: 'update-info',  // 作为子路由
          name: 'UpdateInfo',
          component: UpdateInfo  // 指定对应的组件
        }
      ]
    },
    {
      path: '/teacher-dashboard',
      name: 'TeacherDashboard',
      component: TeacherDashboard,
      meta: { requiresAuth: true },  // 需要登录才能访问
      children: [
        {
          path: 'add-question',
          name: 'AddQuestion',
          component: AddQuestion
        },
        {
          path: 'publish-exam',
          name: 'PublishExam',
          component: PublishExam
        },
        {
          path: 'manage-students',
          name: 'ManageStudents',
          component: ManageStudents
        },
        {
          path: 'exam-scores',
          name: 'ExamScores',
          component: ExamScores
        },
        {
          path: 'email-notification',
          name: 'EmailNotification',
          component: EmailNotification
        }
      ]
    },

  ]
});

// 添加全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      next({ name: 'UserLogin' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
