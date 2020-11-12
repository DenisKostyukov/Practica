<template>
  <div>
    <div class="student__card" style="display: block; margin: 0 auto">
      <h1 style="text-align: center">{{ student.name }}</h1>
      <p style="text-align: center">
        <span>Группа:</span>
        <span>{{ student.group }}</span>
      </p>
      <p style="text-align: center">
        <span>Оценка:</span>
        <span>{{ student.mark }}</span>
      </p>

      <br />
      <img :src="student.photo" alt="" style="margin: 0 auto; display: block" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    id: "",
  },
  data: function () {
    return {
      student: {},
    };
  },
  mounted: function () {
    Vue.axios
      .get("http://46.101.212.195:3000/students/" + this.id)
      .then((response) => {
        console.log(response.data);
        this.student = response.data;
      });
  },
};
</script>