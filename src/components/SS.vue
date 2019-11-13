<template>
  <div class="loop_ss">
    <div class="ss">
      <img src="../assets/logo.png" alt="NoImage">
      <img src="../assets/logo.png" alt="NoImage">
      <img src="../assets/logo.png" alt="NoImage">
      <img src="../assets/logo.png" alt="NoImage">
    </div>
    <div class="ss">
      <img src="../assets/logo.png" alt="NoImage">
      <img src="../assets/logo.png" alt="NoImage">
      <img src="../assets/logo.png" alt="NoImage">
      <img src="../assets/logo.png" alt="NoImage">
    </div>
  </div>
</template>

<script>
//export default {};
</script>

<style lang="scss" scoped>
.loop_ss {
  position: relative;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  img {
    max-width: 20vw;
    height: auto;
  }
  .ss {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;

    //flex-shrink: 0;
    animation: infinity-loop 30s infinite linear 1s both;
    //position: relative;
  }
  //overflow: hidden;
}

@keyframes infinity-loop {
  from {
    transform: translateX(0vw);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>

