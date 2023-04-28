<template>
  <div class="d-flex justify-content-center flex-column align-items-center container w-75">
    <h2 class="text-white">Register</h2>
    <form class="border d-flex flex-column gap-3 rounded w-75 p-3 bg-white" @submit.prevent="continueAuth0Registration">
      <div class="d-flex align-items-center">
        <label class="col-3">First name:</label>
        <div class="col-9">
          <input class="form-control" type="text" min="3" v-model="user.first_name" required>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <label class="col-3">Last name:</label>
        <div class="col-9">
          <input class="form-control" type="text" min="3" v-model="user.last_name" required>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary col-4" type="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>

import {sendRequest} from "@/request";

export default {
  name: "RegisterAuth0",
  data(){
    return{
      state: "",
      user : {
        first_name: "",
        last_name: "",
        email : "",
      },
    }
  },
  async mounted() {
    this.state = this.$route.query.state;
    this.user.email = this.$route.query.email;
  },
  methods:{
    async continueAuth0Registration() {
      try {
        const registrationResponse = await sendRequest("/auth/register_auth0", "POST", this.user)
        if (registrationResponse.ok) {
          window.location.href = `https://dev-imfo33vsyswl7flj.us.auth0.com/continue?state=${this.state}`;
        } else {
          console.log(registrationResponse.toString())
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>