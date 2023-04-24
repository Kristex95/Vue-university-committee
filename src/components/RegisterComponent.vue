<template>
  <div class="d-flex justify-content-center flex-column align-items-center container w-75">
    <h2 class="text-white">Register</h2>
    <form class="border d-flex flex-column gap-3 rounded w-75 p-3 bg-white" @submit.prevent="register">
      <div class="d-flex align-items-center">
        <label class="col-3">First name:</label>
        <div class="col-9">
          <input class="form-control" type="text" v-model="user.first_name" required>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <label class="col-3">Last name:</label>
        <div class="col-9">
          <input class="form-control" type="text" v-model="user.last_name" required>
        </div>
      </div>
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
        <button class="btn btn-primary col-4" type="submit">Register</button>
        <router-link class="btn col-4 btn-outline-primary" to="/auth/login">Log in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterComponent",
  data(){
    return{
      user : {
        first_name: "",
        last_name: "",
        email: "",
        pass: ""
      },
      registerError : "",
    }
  },
  methods:{
    async register(){
      try {
        const userInfoResponse = await fetch('http://localhost:8080/University_committee_war_exploded/auth/register',
            {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.user)
            }
        );
        if(userInfoResponse.ok){
          console.log("ok!")
          this.$router.push("/auth/login")
        }
        else if(userInfoResponse.status === 403){
          alert("User with this email already exists")
        }
        else console.log ("Couldn't register this user")
      }catch (error){
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
  .form{
    padding: 0 25%;
  }
</style>