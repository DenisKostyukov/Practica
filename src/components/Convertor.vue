<template>
  <div>
    <h1 style="text-align: center">Конвертор валют</h1>
    <div class="wrapper" style="width: 50%; margin: 0 auto; display: block">
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
      <p>Результат:{{ converted | capitalize }}</p>
    </div>
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
    Vue.axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((response) => {
        console.log(response.data);
        this.bankData = response.data;
      });
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toFixed(2);
      return value;
    },
  },
  methods: {
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