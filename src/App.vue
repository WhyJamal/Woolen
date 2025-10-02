<template>
  <router-view />
</template>

<script setup>
// empty
</script>
<style>
.loader {
  width: 50px;
  aspect-ratio: 1;
  --_c:no-repeat radial-gradient(farthest-side,#25b09b 92%,#0000);
  background: 
    var(--_c) top,
    var(--_c) left,
    var(--_c) right,
    var(--_c) bottom;
  background-size: 12px 12px;
  animation: l7 1s infinite;
}
@keyframes l7 {to{transform: rotate(.5turn)}} 

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

</style>