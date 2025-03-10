<script setup lang="ts">
const name = ref('')
name.value = window.dict.menu2Name
</script>

<template>
  <div>
    {{ name }}
  </div>
</template>
