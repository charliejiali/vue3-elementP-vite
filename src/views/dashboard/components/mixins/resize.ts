import { debounce } from '@/utils'

export function resizeChart(chart: any) {
  let $_sidebarElm: any = null
  let $_resizeHandler: any = null
  const state = reactive({
    resize: 0
  })
  const resize = ref(0)

  const $_initResizeEvent = () => {
    window.addEventListener('resize', $_resizeHandler)
  }
  const $_destroyResizeEvent = () => {
    window.removeEventListener('resize', $_resizeHandler)
  }
  const $_sidebarResizeHandler = (e: any) => {
    if (e.propertyName === 'width') {
      $_resizeHandler()
    }
  }
  const $_initSidebarResizeEvent = () => {
    $_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    $_sidebarElm && $_sidebarElm.addEventListener('transitionend', $_sidebarResizeHandler)
  }
  const $_destroySidebarResizeEvent = () => {
    $_sidebarElm && $_sidebarElm.removeEventListener('transitionend', $_sidebarResizeHandler)
  }

  onActivated(() => {
    $_initResizeEvent()
    $_initSidebarResizeEvent()
  })

  onDeactivated(() => {
    $_destroyResizeEvent()
    $_destroySidebarResizeEvent()
  })

  onMounted(() => {
    $_resizeHandler = debounce(() => {
      resize.value = new Date().getTime()
    }, 100, false)
    $_initResizeEvent()
    $_initSidebarResizeEvent()
  })

  onBeforeUnmount(() => {
    $_destroyResizeEvent()
    $_destroySidebarResizeEvent()
  })

  return { resize }
}
