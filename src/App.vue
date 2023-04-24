<template>
  <HeaderComponent/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>

import HeaderComponent from "@/components/HeaderComponent";
import {mapState} from "vuex";
export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  computed:{
    ...mapState(['isLoggedIn'])
  },
  mounted() {
    this.$store.dispatch('fetchClient')
  },

}
</script>

<style>
  body{
    background: #354A61;
  }
</style>
