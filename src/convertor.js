import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
new Vue({
  el:'#convertor',
  data:{
    bankData:[],
    amount:'',
    convertFrom:'',
    convertTo:'',
    to:'',
    from:'',
    converted:'',
  },
  mounted: function () {
    axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
      console.log(response.data);
      this.bankData=response.data;
      
    })
  },
  methods:{
    getFrom:function(){
      return this.bankData.filter(element=>{
        if(element.ccy==this.convertFrom){
          this.from=element.buy
          console.log(this.from)
        }
        if(this.convertFrom=="UAH" ){
          this.from=1
          console.log(this.to)
        }
      })
    },
    getTo: function(){
       return this.bankData.filter(element=>{
       if(element.ccy==this.convertTo ){
          this.to=element.buy
          console.log(this.to)
        }
        if(this.convertTo=="UAH" ){
          this.to=1
          console.log(this.to)
        }
      })
    },
    result: function(){
      this.converted=(this.from/this.to)*this.amount
    }
  }
})