<template>
  <table class="table rounded-bottom bg-white">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col"><div v-if="!isClient" class="btn btn-success float-end" @click="toFacultyCreate">Add new</div></th>
      </tr>

    </thead>
    <tbody class="table-group-divider">
      <tr v-for="faculty in faculties" :key="faculty.id">
        <td>
          <div>{{faculty.name}}</div>
        </td>
        <td>
          <div class="float-end">
            <button v-if="isLoggedIn && isClient && !isSigned(faculty.id)" class="btn btn-success me-1" @click="function(event){registerToFaculty(event, faculty.id)}">Register</button>
            <button v-else-if="isLoggedIn" class="btn btn-outline-secondary me-1 disabled" >Signed</button>
            <button class="btn btn-primary" @click="toFaculty(faculty.id)">Details</button>
            <button v-if="!isClient" class="btn btn-danger ms-1" @click="function(event){deleteFaculty(event, faculty.id)}">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {sendRequest} from "@/request";
import {mapState} from "vuex";

export default {
  name: "AllFacultiesComponent",
  data(){
    return{
      faculties : [],
      user : {},
    }
  },
  computed:{
    ...mapState(['isLoggedIn']),
    ...mapState(['isClient'])
  },
  mounted() {
    this.getFaculties();
    this.getUserById();
  },
  methods: {
    toFaculty(id){
      this.$router.push('/users/faculty/' + id);
    },
    async deleteFaculty(event, facultyId) {
      try {
        const response = await sendRequest("/faculty", "DELETE", {"faculty_id": facultyId});
        if (response.ok) {
          console.log("Successfully registered to faculty")
          event.target.classList = "btn btn-outline-secondary ms-1 disabled";
          event.target.innerHTML = "Deleted";
        }
      } catch (e) {
        console.log(e)
      }
    },
    async registerToFaculty(event, facultyId) {
      try {
        const response = await sendRequest("/faculty", "POST", {"faculty_id": facultyId});
        if (response.ok) {
          event.target.classList="btn btn-outline-secondary disabled";
          event.target.innerHTML = "Deleted";
        }
      }
      catch (e){
        console.log(e)
      }
    },
    async getFaculties() {
      try {
        const response = await sendRequest("/faculty", "GET", null);//fetch('http://localhost:8080/University_committee_war_exploded/faculty',

        if (response.ok) {
          const data = await response.json();
          this.faculties = data
        } else console.log("no data")
      } catch (error) {
        console.log(error);
      }
    },
    async getUserById() {
      try {
        const userInfoResponse = await sendRequest('/user/client', "GET", null);//await fetch('http://localhost:8080/University_committee_war_exploded/user/' + this.$route.params.id,

        if (userInfoResponse.ok) {
          const data = await userInfoResponse.json();
          this.user = data;
          console.log(this.user.faculties)
        } else console.log("no data")
      } catch (error) {
        console.log(error);
      }
    },
    isSigned(faculty_id){
      const arr = this.user.faculties?.filter(fac => fac.id === faculty_id)
      return arr?.length !== 0;
    },
    toFacultyCreate(){
      this.$router.push("/faculties/create");
    }
  }
}
</script>

<style scoped>
  tbody > tr:last-child > td {
    border-bottom: 0;
  }
</style>