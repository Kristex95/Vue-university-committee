<template>
  <table class="table w-75 m-auto bg-white rounded-bottom">
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td style="width: 3em;"> {{user.id}}</td>
        <td>{{user.first_name}} {{user.last_name}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {sendRequest} from "@/request";

export default {
  name: "SingleFacultyInfo",
  data(){
    return{
      users : [],
    }
  },
  mounted() {
    this.getUsersByFacultyId(this.$route.params.id);
  },
  methods:{
    async getUsersByFacultyId(id){
      try {
        const response = await sendRequest('/user/faculty/' + id, "GET", null);//fetch('http://localhost:8080/University_committee_war_exploded/user/faculty/' + id,

        if (response.ok) {
          const data = await response.json();
          this.users = data
          console.log(data)
        } else console.log("no data")
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
  tbody > tr:last-child > td {
    border-bottom: 0;
  }
</style>