<template>
  <div id="app">
    {{ $myInfo("George", 37) }}
    <!-- My name is George and I am a 37 years old Web Dev. -->
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(this.$surname); // Smith
    this.$surname = "Blacksmith";
    console.log(this.$surname); // Blacksmith
  },
};
</script>
