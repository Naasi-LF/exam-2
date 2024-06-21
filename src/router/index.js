import Vue from 'vue';
import Router from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import StudentDashboard from '../components/StudentDashboard.vue';
import TeacherDashboard from '../components/TeacherDashboard.vue';
import UpdateInfo from '../components/UpdateInfo.vue';  // 引入修改信息组件

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
      meta: { requiresAuth: true }  // 需要登录才能访问
    },
    {
      path: '/teacher-dashboard',
      name: 'TeacherDashboard',
      component: TeacherDashboard,
      meta: { requiresAuth: true }  // 需要登录才能访问
    },
    {
      path: '/update-info',  // 定义新的路由路径
      name: 'UpdateInfo',
      component: UpdateInfo  // 指定对应的组件
    }
  ]
});
// 添加全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 这里检查 sessionStorage 中是否存在 token
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      // 如果没有 token，重定向到登录页面
      next({ name: 'UserLogin' });
    } else {
      next(); // 如果有 token，则继续访问目标页面
    }
  } else {
    next(); // 如果目标页面不需要认证，则继续访问
  }
});
export default router;
