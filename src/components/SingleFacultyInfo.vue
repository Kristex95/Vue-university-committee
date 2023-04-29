<template>
  <table class="table w-75 m-auto bg-white rounded-bottom">
    <tbody>
      <tr>
        <th>id</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Sum mark</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td style="width: 3em;"> {{user.id}}</td>
        <td v-if="user.accepted" class="bg-success text-white">{{user.first_name}}</td>
        <td v-if="user.accepted" class="bg-success text-white">{{user.last_name}}</td>
        <td v-if="user.accepted" class="bg-success text-white">{{user.sum_mark}}</td>
        <td v-if="!user.accepted">{{user.first_name}}</td>
        <td v-if="!user.accepted">{{user.last_name}}</td>
        <td v-if="!user.accepted">{{user.sum_mark}}</td>
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
          console.log(data)
          this.users = data
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