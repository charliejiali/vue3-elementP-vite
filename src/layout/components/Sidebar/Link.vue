<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const external = computed(() => {
  return isExternal(props.to)
})

const type = computed(() => {
  if (external.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to:string) => {
  if (external.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>
