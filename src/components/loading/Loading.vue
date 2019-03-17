<template>
  <div class="load-container">
    <div class="load load1"></div>
    <div class="load load2"></div>
    <div class="load"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped >

  .load-container {
    margin: 50px auto;
    width: 150px;
    text-align: center;
  }
  .load-container .load {
    width: 20px;
    height: 20px;
    margin: auto 6px;
    background-color: #1e8fc6;
    border-radius: 100%;
    display: inline-block;
    animation: loading 1.4s infinite ease-in-out;
    animation-fill-mode: both;
  }
  .load-container .load1 {
    animation-delay: -0.32s;
  }
  .load-container .load2 {
    animation-delay: -0.16s;
  }

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
  }
}

</style>
