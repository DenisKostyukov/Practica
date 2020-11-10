<template>
  <div>
    <input
      type="search"
      v-model="searchString"
      style="display: block; margin: 20px auto"
    />

    <table align="center" border="2px" rules="all">
      <tr>
        <th>photo</th>
        <th>Name</th>
        <th>Group</th>
        <th>mark</th>
        <th>Passsed</th>
        <th></th>
      </tr>
      <tr
        v-for="student in search"
        v-bind:key="student._id"
        style="text-align: center"
      >
        <td>{{ student.photo }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.group }}</td>
        <td>{{ student.mark }}</td>
        <td>
          <input type="checkbox" v-model="student.isDonePr" />
        </td>
        <td>
          <a href="#" :id="student.id" @click="deleteStudent(student.id)"
            >Delete</a
          >
        </td>
      </tr>
    </table>
    <div class="addNew" style="width: 600px; display: block; margin: 20px auto">
      <input type="text" placeholder="name" v-model.lazy="newStudent.name" />
      <select type="text" placeholder="group" v-model="newStudent.group">
        <option value="РПЗ 17 1/9">РПЗ 17 1/9</option>
        <option value="РПЗ 17 2/9">РПЗ 17 2/9</option>
      </select>
      <input
        type="number"
        value="2000"
        placeholder="year of birth"
        v-model="newStudent.yearOfBith"
      />
      <input type="checkbox" v-model.trim="newStudent.passed" />
      <button @click="addNew()">Добавить</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  data: {
    students: [],
    searchString: "",
    newStudent: { name: "", group: "", yearOfBith: "2002", passed: false },
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students").then((response) => {
      console.log(response.data);
      this.students = response.data;
    });
  },
  computed: {
    search: function () {
      return this.students.filter((element) => {
        return !element.name.search(this.searchString);
      });
    },
  },
  methods: {
    deleteStudent: function (value) {
      this.students = this.students.filter((item) => item.id !== value);
      return this.students;
    },
    addNew: function () {
      this.newStudent.id = this.students.length + 1;
      this.students.push(this.newStudent);
      this.newStudent = {
        name: "",
        group: "",
        yearOfBith: "2002",
        passed: false,
      };
    },
  },
};
</script>

<style lang="stylus" scoped></style>