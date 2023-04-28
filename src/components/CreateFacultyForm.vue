<template>
  <div class="d-flex justify-content-center flex-column align-items-center container w-75">
    <h2 class="text-white">Create new faculty</h2>
    <form class="border d-flex flex-column gap-3 rounded w-75 p-3 bg-white" @submit.prevent="createFaculty">
      <div class="row">
        <div class="col-6">Name:</div>
        <div class="col-6">
          <input type="text" class="form-control" v-model="name" required>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <button class="btn btn-success" type="submit">Create</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {sendRequest} from "@/request";

export default {
  name: "CreateFacultyForm",
  data(){
    return {
      name: "",
    }
  },
  methods:{
    async createFaculty() {
      try {
        const response = await sendRequest("/faculty", "POST", {"name": this.name});
        if (response.ok) {
          this.$router.push("/faculties");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>