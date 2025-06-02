<template>
  <h1>Digidex</h1>
  <p>Filter Text: {{ filterText }}</p>
  <input type="text" v-model="filterText"/>
  <ul>
    <li v-for="(digimon, index) in filteredDigiList" :key="`digi-${index}`">
      # Name: {{ digimon.name }} - Level: {{ digimon.level }} #
      <!-- <img :src="digimon.img"/> -->
    </li>
  </ul>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const digiList = ref([])
const filterText = ref('')

const filteredDigiList = computed(() => 
  digiList.value.filter(digimon => 
    digimon.name.includes(filterText.value)
  )
)

onMounted(async() => {
  const digiData = await fetch('https://digimon-api.vercel.app/api/digimon').then( response => response.json()
  )
  digiList.value = digiData;
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>