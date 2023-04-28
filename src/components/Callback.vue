<template>
  <div>Loading...</div>
</template>

<script>
import {sendRequest} from "@/request";
import {mapMutations} from "vuex";

export default {
  name: "CallbackComponent",
  data(){
    return{
      userAuth0: this.$auth0.user,
    }
  },
  async mounted() {
    if (this.$auth0.isAuthenticated) {
      const token = await this.$auth0.getAccessTokenSilently()
      if (token == null) {
        await this.$auth0.logout();
        this.$router.push("/auth/login");
        return
      } else {
        try {
          const response = await sendRequest("/auth/login_auth0", "POST", {"token": token})
          if (response.ok) {
            const data = await response.json()
            localStorage.setItem("access_token", data["access_token"])
            localStorage.setItem("refresh_token", data["refresh_token"])
            this.login()
            console.log(response)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  methods:{
    ...mapMutations(["login"])
  }
}
</script>

<style scoped>

</style>