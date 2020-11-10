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
        <th></th>
      </tr>
      <tr
        v-for="student in students"
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
          <a href="#" :id="student._id" @click="deleteStudent(student._id)"
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
    </div>
    <h1 style="text-align: center">Конвертор валют</h1>
    <span>Amount:</span><input type="number" v-model="amount" /> <br />
    <span>Convert from: </span>
    <select id="convertFrom" v-model="convertFrom" v-on:change="getFrom()">
      <option value="UAH">UAH</option>
      <option value="USD">USD</option>
      <option value="RUR">RUB</option>
      <option value="EUR">EUR</option>
      <option value="BTC">BTC</option>
    </select>
    <span>Convert to:</span>
    <select name="" id="convertTo" v-model="convertTo" v-on:change="getTo()">
      <option value="UAH">UAH</option>
      <option value="USD">USD</option>
      <option value="RUR">RUB</option>
      <option value="EUR">EUR</option>
      <option value="BTC">BTC</option>
    </select>
    <button @click="result()">result</button>
    <p>Результат:{{ converted }}</p>
    <div class="data" v-for="info in bankData" v-bind:key="info.ccy">
      <p>{{ info }}</p>
    </div>
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
      //convertor
      bankData: [],
      amount: "",
      convertFrom: "",
      convertTo: "",
      to: "",
      from: "",
      converted: "",
    };
  },
  mounted: function () {
    Vue.axios.get("http://46.101.212.195:3000/students").then((response) => {
      console.log(response.data);
      this.students = response.data;
    });
  },
  mounted: function () {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => {
        console.log(response.data);
        this.bankData = response.data;
      });
  },
  methods: {
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
    getFrom: function () {
      return this.bankData.filter((element) => {
        if (element.ccy == this.convertFrom) {
          this.from = element.buy;
          console.log(this.from);
        }
        if (this.convertFrom == "UAH") {
          this.from = 1;
          console.log(this.to);
        }
      });
    },
    getTo: function () {
      return this.bankData.filter((element) => {
        if (element.ccy == this.convertTo) {
          this.to = element.buy;
          console.log(this.to);
        }
        if (this.convertTo == "UAH") {
          this.to = 1;
          console.log(this.to);
        }
      });
    },
    result: function () {
      this.converted = (this.from / this.to) * this.amount;
    },
  },
};
</script>

<style lang="stylus" scoped></style>