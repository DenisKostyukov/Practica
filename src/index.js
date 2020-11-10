import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './convertor.js'

new Vue({
  el:'#app',
  data:{
    students:[],
    searchString:'',
    newStudent:{name: "", group: "", yearOfBith: '2002',passed:false},
  },
  mounted: function () {
    axios.get("http://46.101.212.195:3000/students").then((response)=>{
      console.log(response.data);
      this.students=response.data;
    })
  },
  computed:{
    search: function() {
      return this.students.filter(element=>{
        return !element.name.search(this.searchString)
      })
    },
  },
  methods:{
    deleteStudent: function(value){
      this.students = this.students.filter(item => item.id !== value);
      return this.students
    },
    addNew: function () {
      this.newStudent.id=this.students.length+1
      this.students.push(this.newStudent)
      this.newStudent={name: "", group: "", yearOfBith: '2002',passed:false}
    }
  },
})
new Vue({
  el:'#changeStyle',
  data:{
    styleobj:{
      margin:'0 auto',
      width:'100px',
      height:'100px',
      backgroundColor:'red',
      transition:' 1s'
    },
  },
    
  methods:{
    changebgcolor:function(){
      this.styleobj.backgroundColor='green'
    },
    originalcolor:function(){
      this.styleobj.backgroundColor='red'
    }
  }
})
