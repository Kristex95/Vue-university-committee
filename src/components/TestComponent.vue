<template>
  <div>Test</div>
</template>

<script>
export default {
  name: "TestComponent",
  mounted() {
    console.log(this.$auth0.user);
  }
}
</script>

<style scoped>

</style>