<template>
  <table class="table bg-white rounded-bottom">
    <thead>
    <tr>
      <th scope="col">First name</th>
      <th scope="col">Last name</th>
      <th scope="col">School mark</th>
      <th scope="col">Math mark</th>
      <th scope="col">English mark</th>
      <th scope="col">History mark</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users" :key="user.id">
      <td>{{user.first_name}}</td>
      <td>{{user.last_name}}</td>
      <td>{{user.school_mark}}</td>
      <td>{{user.math_mark}}</td>
      <td>{{user.english_mark}}</td>
      <td>{{user.history_mark}}</td>
      <td>
        <button class="btn btn-success" @click="function(event){confirmUser(event, user.id)}" >Confirm</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {sendRequest} from "@/request";

export default {
  name: "UnconfirmedUsersComponent",
  data(){
    return {
      users: []
    }
  },
  mounted() {
    this.getUsers()
  },
  methods:{
    async getUsers(){
      try{
        const response = await sendRequest('/user/unconfirmed/', "GET", null);

        if(response.ok){
          const data = await response.json();
          this.users = data
        }
        else console.log("no users found")
      }
      catch (error){
        console.log(error)
      }
    },
    async confirmUser(event, id){
      try{
        const response = await sendRequest('/user/confirm/', "POST", {id : id});

        if(response.ok){
          event.target.replaceWith("confirmed")
        }
        else console.log("cannot confirm user")
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