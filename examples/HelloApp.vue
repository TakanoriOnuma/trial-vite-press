<script setup>
import { ref } from 'vue'
import Greeting from './Greeting.vue'

const name = ref('VitePress')
</script>

<template>
  <input v-model="name" placeholder="Your name" />
  <Greeting :name="name" />
</template>
