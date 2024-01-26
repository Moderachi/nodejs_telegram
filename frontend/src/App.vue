<script setup>
import {onMounted} from "vue";
import HeaderMain from "./components/HeaderMain.vue";
import MemesForm from "./components/MemesForm.vue";


onMounted(() => {
  window.Telegram.WebApp.ready();
})

</script>

<template>
  <HeaderMain/>
  <MemesForm/>
</template>

<style scoped>

</style>
