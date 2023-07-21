<template>
  <div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
const text = ref('')
text.value = nestedConfig.menu2
</script>
