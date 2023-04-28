<template>
  <div class="bg-white px-5 py-2 w-50 rounded-bottom m-auto">
    <p>Name: {{user.first_name}}</p>
    <p>Last name: {{user.last_name}}</p>
    <p>School mark: {{user.school_mark}}</p>
    <p>Math mark: {{user.math_mark}}</p>
    <p>English mark: {{user.english_mark}}</p>
    <p>History mark: {{user.history_mark}}</p>

    <table class="table table-bordered table-striped bg-white">
      <thead>
        <tr>
          <th>
            <div>Signed for faculties</div>
          </th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="faculty in faculties" :key="faculty.faculty">
          <td>{{faculty.faculty}}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import {sendRequest} from "@/request";

export default {
  name: "SingleUserInfo",
  data(){
    return{
      user : {},
      faculties : [],
    }
  },
  mounted() {
    this.getUserById()
  },
  methods:{
    async getUserById() {
      try {
        const userInfoResponse = await sendRequest('/user/' + this.$route.params.id, "GET", null);//await fetch('http://localhost:8080/University_committee_war_exploded/user/' + this.$route.params.id,

        if (userInfoResponse.ok) {
          const data = await userInfoResponse.json();
          this.user = data;
          this.faculties = this.user.faculties;
        } else console.log("no data")
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>