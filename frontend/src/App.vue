<script setup>
import {onMounted} from "vue";
import HeaderMain from "./components/HeaderMain.vue";
import MemesForm from "./components/MemesForm.vue";
import {useTgStore} from "./tgStore.js";

const tgStore = useTgStore()

onMounted(() => {
  tgStore.ready();
})

</script>

<template>
  <HeaderMain/>
  <MemesForm/>
</template>

<style scoped>

</style>
