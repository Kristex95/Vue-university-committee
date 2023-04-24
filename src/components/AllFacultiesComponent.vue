<template>
  <table class="table rounded-bottom bg-white">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col"></th>
      </tr>

    </thead>
    <tbody class="table-group-divider">
      <tr v-for="faculty in faculties" :key="faculty.id">
        <td>{{faculty.name}}</td>
        <td>
          <button class="btn btn-primary float-end" @click="toFaculty(faculty.id)">Details</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {sendRequest} from "@/request";

export default {
  name: "AllFacultiesComponent",
  data(){
    return{
      faculties : [],
    }
  },
  mounted() {
    this.getFaculties();
  },
  methods: {
    toFaculty(id){
      this.$router.push('/users/faculty/' + id);
    },
    async getFaculties() {
      try {
        const response = await sendRequest("/faculty", "GET", null);//fetch('http://localhost:8080/University_committee_war_exploded/faculty',

        if (response.ok) {
          const data = await response.json();
          this.faculties = data
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