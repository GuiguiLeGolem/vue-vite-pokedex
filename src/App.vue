<template>
  <h1>I don't know</h1>
  <p>Filter Text: {{ filterText }}</p>
  <input type="text" v-model="filterText"/>
  <div class="relative">
    <Transition name="loadingslide" appear>
      <p v-if="isLoading">Chargement des vaisseaux...</p>
    </Transition>
  </div>
  <TransitionGroup name="loadingelement" mode="out-in" tag="ul" appear>
    <SW_Starship_Card v-for="(starship, index) in starshipStore.filteredList" :key="starship.name" :nom="starship.name" :modele="starship.model"/>
    <!-- <li v-for="(element, index) in filteredSW_List" :key="element.name">
      <div>
        <p>Nom : {{ element.name }}</p>
        <p>Modèle : {{ element.model }}</p>
        <p>Classe : {{ element.starship_class }}</p>
        <p>Fabricant : {{ element.manufacturer }}</p>
        <p>Capacité : {{ element.cargo_capacity }} kg</p>
        <p>Nombre de passagers possible : {{ element.passengers }}</p>
        <p>Nombre de pilote requis : {{ element.crew }}</p>
        <p>Longueur : {{ element.length }} mètres</p>
        <p>Nombre maximum de Megalights : {{ element.MGLT }}</p>
        <p>Vitesse maximum en atmosphère : {{ element.max_atmosphering_speed }} miles/h</p>
        <p>Apparitions : {{ element.films }}</p>
        <p>Coût en crédits : {{ element.cost_in_credits }}</p>
      </div>
    </li> -->
  </TransitionGroup>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import SW_Starship_Card from './components/SW_Starship_Card.vue'

const filterText = ref('')
const isLoading = ref(true)

const starshipStore = reactive({
  list: [],
  filteredList: computed(() => starshipStore.list.filter(starship => starship.name.toLowerCase().includes(filterText.value.toLowerCase())))
})

onMounted(async () => {
  const data = await fetch('https://www.swapi.tech/api/starships/').then(res => res.json())
  
  //console.log(data.results)

  const promises = data.results.map(async element => {
    const detail = await fetch(element.url).then(res => res.json())
    return detail.result.properties
  })

  starshipStore.list = await Promise.all(promises)

  isLoading.value = false
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

.relative{
  position: relative;
}

.loadingslide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.loadingslide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.loadingslide-enter-active,
.loadingslide-leave-active {
  transition: 1s;
}

.loadingslide-leave-active {
  position: absolute;
  width: 100%;
}

.loadingelement-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.loadingelement-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.loadingelement-enter-active,
.loadingelement-leave-active {
  transition: 1s;
}

* {
  background-color: white;
}
</style>