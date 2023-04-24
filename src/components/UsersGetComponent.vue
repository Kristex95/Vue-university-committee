<template>
  <table class="table bg-white rounded-bottom w-75 m-auto">
    <colgroup>
      <col style="width: 45%;"/>
      <col style="width: 45%;"/>
      <col style="width: 10%;"/>
    </colgroup>
    <thead>
     <tr>
       <th scope="col">First name</th>
       <th scope="col">Last name</th>
       <th scope="col"></th>
     </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{user.first_name}}</td>
        <td>{{user.last_name}}</td>
        <td>
          <button class="btn btn-primary" @click="toUser(user.id)">Details</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {sendRequest} from "@/request";

export default {
  name: "UsersGetComponent",
  data(){
    return{
      users : [],
      filerRole: "ABITURIENT",
    }
  },
  computed: {
    filteredUsers(){
      return this.users.filter(user => user.role === this.filerRole)
    }
  },
  mounted() {
    this.getUsers();
  },
  methods:{
    toUser(id){
      this.$router.push('/user/' + id);
    },
    async getUsers(){
      try{
        const response = await sendRequest('/user', "GET", null);//fetch('http://localhost:8080/University_committee_war_exploded/user',

        if(response.ok){
          const data = await response.json();
          this.users = data
          console.log(data)
        }
        else console.log("no data")
      }
      catch (error){
        console.log(error)
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