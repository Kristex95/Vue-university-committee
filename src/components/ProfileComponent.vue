<template>
  <div class="d-flex justify-content-center flex-column align-items-center container w-75">
    <h2 class="text-white">Profile</h2>
    <h4 v-if="!isClient" class="text-white">(Admin)</h4>
    <form class="border rounded w-75 p-2 bg-white" @submit.prevent="updateUser">
      <div class="row">
        <h4 class="col-12 ms-1">Info</h4>
      </div>
      <div class="row ms-1">
        <div class="col-6">First name:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.first_name}}</div>
        <div v-else class="col-6">
          <input type="text" class="form-control" v-model="editedUser.first_name" required>
        </div>
      </div>
      <div class="row ms-1">
        <div class="col-6">Last name:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.last_name}}</div>
        <div v-else class="col-6">
          <input type="text" class="form-control" v-model="editedUser.last_name" required>
        </div>
      </div>
      <div class="row ms-1">
        <div class="col-6">Email:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.email}}</div>
        <div v-else class="col-6">
          <input type="text" class="form-control" v-model="editedUser.email" required>
        </div>
      </div>
      <div v-if="isClient" class="row">
        <h4 class="col-12 ms-1 mt-3">Marks</h4>
      </div>
      <div v-if="isClient" class="row ms-1">
        <div class="col-6">School mark:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.school_mark}}</div>
        <div v-else class="col-6">
          <input type="number" step="0.01" class="form-control" min="1" max="12" v-model="editedUser.school_mark" required>
        </div>
      </div>
      <div v-if="isClient" class="row ms-1">
        <div class="col-6">Math mark:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.math_mark}}</div>
        <div v-else class="col-6">
          <input type="number" class="form-control" min="1" max="200" v-model="editedUser.math_mark" required>
        </div>
      </div>
      <div v-if="isClient" class="row ms-1">
        <div class="col-6">English mark:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.english_mark}}</div>
        <div v-else class="col-6">
          <input type="number" class="form-control" min="1" max="200" v-model="editedUser.english_mark" required>
        </div>
      </div>
      <div v-if="isClient" class="row ms-1">
        <div class="col-6">History mark:</div>
        <div v-if="!updateUserBool" class="col-6">{{user.history_mark}}</div>
        <div v-else class="col-6">
          <input type="number" class="form-control" min="1" max="200" v-model="editedUser.history_mark" required>
        </div>
      </div>
      <div class="row mx-1 mt-2" v-if="!updateUserBool">
        <div v-if="!user.confirmed && isClient" class="bg-warning rounded">Not confirmed</div>
        <div v-else-if="user.confirmed && isClient" class="bg-success rounded text-white">Confirmed</div>
      </div>
      <div class="ms-3 mt-2">
        <button v-if="!updateUserBool" @click="changeUserStatus" type="button" class="btn btn-primary col-6">Edit</button>
        <button v-else type="submit" class="btn btn-outline-secondary col-6">Save</button>
        <button v-if="updateUserBool" @click="changeUserStatus" type="submit" class="btn col-6">Cancel</button>
      </div>
    </form>

    <router-link type="button" class="btn btn-danger mt-1" @click="userLogout" to="/auth/login">Log out</router-link>
    <div>
      <button @click="logoutAuth0">Log out</button>
    </div>
  </div>

</template>

<script>
import {sendRequest} from "@/request";
import {mapMutations, mapState} from "vuex";
import store from "@/store";

export default {
  name: "ProfileComponent",
  data(){
    return{
      updateUserBool : false,
      updateMarksBool : false,
      editedUser : {},
      user : {},
      userAuth0: this.$auth0.user,
      faculties : [],
    }
  },
  computed:{
    ...mapState(['isClient'])
  },
  mounted() {
    this.getUserById()
  },
  methods:{
    changeUserStatus(){
      this.updateUserBool = !this.updateUserBool
      this.editedUser = Object.assign({}, this.user)
    },
    async getUserById() {
      try {
        const userInfoResponse = await sendRequest('/user/client', "GET", null);//await fetch('http://localhost:8080/University_committee_war_exploded/user/' + this.$route.params.id,

        if (userInfoResponse.ok) {
          const data = await userInfoResponse.json();
          this.user = data;
          this.faculties = this.user.faculties;
          this.setClient(this.user.role)
        }
        else if(userInfoResponse.status === 401){
          this.$router.push("/auth/login")
        }
        else console.log("no data")
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser(){
      try{
        const userInfoResponse = await sendRequest('/user', "PUT", this.editedUser);//await fetch('http://localhost:8080/University_committee_war_exploded/user/' + this.$route.params.id,
        if(userInfoResponse.ok){
          await this.getUserById()
          this.changeUserStatus()
        }
      }
      catch (error){
        console.log(error)
      }
    },
    userLogout(){
      store.commit("logout")
    },
    logoutAuth0() {
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
      store.commit("logout")
    },
    ...mapMutations(['setClient']),
  },
}
</script>

<style scoped>

</style>