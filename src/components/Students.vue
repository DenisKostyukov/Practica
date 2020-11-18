<template>
  <div v-bind:class="myTheme">
    <input type="checkbox" v-on:change="change()" />
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
        <th></th>
      </tr>
      <tr
        v-for="student in students"
        v-bind:key="student._id"
        style="text-align: center"
      >
        <td>{{ student.photo }}</td>
        <td>
          <router-link v-bind:to="'/student-info/' + student._id">{{
            student.name
          }}</router-link>
        </td>
        <td>{{ student.group }}</td>
        <td>{{ student.mark }}</td>
        <td>
          <input type="checkbox" v-model="student.isDonePr" />
        </td>
        <td>
          <a href="#" :id="student._id" @click.prevent="deleteStudent(student._id)" v-show="student.group==getCurrentUser.group"
            >Delete</a
          >
        </td>
        <td>
          <a href="#" :id="student._id" @click="getData(student._id)"> edit</a>
        </td>
      </tr>
    </table>
    <div class="addNew" style="width: 600px; display: block; margin: 20px auto">
      <input type="text" placeholder="photo" v-model="selectStudent.photo" />
      <input type="text" placeholder="name" v-model="selectStudent.name" />
      <select type="text" placeholder="group" v-model="selectStudent.group">
        <option value="РПЗ 17 1/9">РПЗ 17 1/9</option>
        <option value="РПЗ 17 2/9">РПЗ 17 2/9</option>
      </select>
      <input type="number" placeholder="mark" v-model="selectStudent.mark" />
      <input type="checkbox" v-model="selectStudent.isDonePr" />
      <button @click="addNew()">Добавить</button>
      <button @click="editStudent()">edit</button>
      <p>Количество студентов: {{ getCount }}</p>
    </div>

    <h1 style="text-align: center">
      <router-link v-bind:to="'/convertor/'">Конвертор валют </router-link>
    </h1>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  data: function () {
    return {
      students: [],

      selectStudent: {
        photo: this.photo,
        name: this.name,
        group: this.group,
        mark: this.mark,
        isDonePr: this.isDonePr,
      },
      searchString: "",
      id: "",
      myTheme: "",
    };
  },
  mounted: async function () {
    let response = await Vue.axios.get("http://46.101.212.195:3000/students");
    console.log(response.data);
    this.students = response.data;
    this.$store.commit("setCount", this.students.length);

    if (this.getTheme) {
      this.myTheme = this.getTheme;
    } else {
      this.myTheme = "theme1";

      this.$store.commit("setTheme", this.myTheme);
    }
  },
  computed: {
    getCount() {
      return this.$store.getters.getCount;
    },
    getTheme() {
      return this.$store.getters.getTheme;
    },
    getCurrentUser() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    change() {
      if (this.myTheme == "theme1") {
        this.myTheme = "theme2";
        this.$store.commit("setTheme", this.myTheme);
      } else if (this.myTheme == "theme2") {
        this.myTheme = "theme1";
        this.$store.commit("setTheme", this.myTheme);
      }
    },
    deleteStudent: function (_id) {
      Vue.axios
        .delete("http://46.101.212.195:3000/students/" + _id)
        .then((response) => {
          console.log(response.data);
        });
    },
    getData: function (_id) {
      console.log(_id);
      this.selectStudent = this.students.find((element) => {
        if (element._id == _id) {
          this.id = element._id;
          console.log(this.id);
          this.selectStudent = element;
          console.log(this.selectStudent);
          return element;
        }
      });
    },
    editStudent: function () {
      Vue.axios
        .put("http://46.101.212.195:3000/students/" + this.id, {
          photo: this.selectStudent.photo,
          name: this.selectStudent.name,
          group: this.selectStudent.group,
          mark: this.selectStudent.mark,
          isDonePr: this.selectStudent.isDonePr,
        })
        .then((response) => {
          console.log(response.data);
        });
    },
    addNew: function () {
      Vue.axios
        .post("http://46.101.212.195:3000/students", {
          photo: this.selectStudent.photo,
          name: this.selectStudent.name,
          group: this.selectStudent.group,
          mark: this.selectStudent.mark,
          isDonePr: this.selectStudent.isDonePr,
        })
        .then((response) => {
          console.log(response.data);
        });
    },
    ////convertor
  },
};
</script>

<style  scoped>
.theme1 {
  background-color: rgb(52, 199, 23);
}

.theme2 {
  background-color: rgb(221, 236, 9);
}
</style>