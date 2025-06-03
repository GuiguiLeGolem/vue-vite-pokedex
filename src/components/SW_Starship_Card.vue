<script setup>
    import { computed, defineProps } from 'vue'

    const props = defineProps({
        nom: {
            type: String,
            required: true
        },
        modele: {
            type: String,
            required: true
        }
    })

    console.log({ props })
</script>

<template>
    <li><span class="bold">{{ nom }}</span> {{ modele }}</li>
</template>

<style>
.bold {
    font-weight: bold;
}
</style>