<template>
  <div class="d-flex justify-content-center flex-column align-items-center container w-75">
    <h2 class="text-white">Login</h2>
    <form class="border d-flex flex-column gap-3 rounded w-75 p-3 bg-white" @submit.prevent="submit">
      <div class="d-flex align-items-center">
        <label class="col-3">Email:</label>
        <div class="col-9">
          <input class="form-control" type="email" v-model="user.email" required>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <label class="col-3">Password:</label>
        <div class="col-9">
          <input class="form-control" type="password" v-model="user.pass" required>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary col-4 " type="submit">Log In</button>
        <router-link class="btn col-4 btn-outline-primary" to="/auth/register">Sign up</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "LoginComponent",
  data(){
    return{
      user : {
        email: "",
        pass: ""
      },
      loginError : "",
    }
  },
  methods:{
    async submit(){
      try {
        const userInfoResponse = await fetch('http://localhost:8080/University_committee_war_exploded/auth/login',
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.user)
            }
        );
        if(userInfoResponse.ok){
          const data = await userInfoResponse.json()
          localStorage.setItem("access_token", data["access_token"])
          localStorage.setItem("refresh_token", data["refresh_token"])
          this.login()
          console.log("Successfully logged in!")
          this.$router.push("/profile")
        } else console.log ("Couldn't login")
      }catch (error){
        console.log(error)
      }
    },
    ...mapMutations(['login'])
  },
}
</script>

<style scoped>
.form{
  padding: 0 25%;
}
</style>