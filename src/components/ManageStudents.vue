<template>
  <div>
    <h1>学生管理</h1>
    <table>
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.studentId">
          <td>{{ student.studentId }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.className }}</td>
          <td>
            <button @click="openEditModal(student)">编辑</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for editing student -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showEditModal = false">&times;</span>
        <h3>编辑学生信息</h3>
        <div class="form-container">
        <form @submit.prevent="submitEdit">
          <label for="name">姓名:</label>
          <input v-model="editFormData.name" type="text" id="name" name="name">

          <label for="className">班级:</label>
          <input v-model="editFormData.className" type="text" id="className" name="className">

          <label for="password">密码:</label>
          <input v-model="editFormData.password" type="password" id="password" name="password">

          <button type="submit">更新</button>
        </form>
  </div>


      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'ManageStudents',
  data() {
    return {
      students: [],
      showEditModal: false,
      editFormData: {
        studentId: null,
        name: '',
        className: '',
        password: ''  // Include password in edit form data
      }
    };
  },
  methods: {
    fetchStudents() {
      axios.get('http://localhost:8081/teacher/students')
        .then(response => {
          this.students = response.data;
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    },
    openEditModal(student) {
      this.editFormData = { ...student, password: '' };  // Clear password when opening modal
      this.showEditModal = true;
    },
    submitEdit() {
      axios.put(`http://localhost:8081/students/update/${this.editFormData.studentId}`, this.editFormData)
        .then(() => {
          alert('Student info updated successfully');
          this.showEditModal = false;
          this.fetchStudents(); // Refresh the list
        })
        .catch(error => {
          console.error('Failed to update student info', error);
        });
    }
  },
  mounted() {
    this.fetchStudents();
  }
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #eee;
}

/* button {
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
} */
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
/* 容器样式 */
.form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #fff;
}

/* 标签样式 */
label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: bold;
}

/* 输入框样式 */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: block;
}

/* 按钮样式 */
button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>


