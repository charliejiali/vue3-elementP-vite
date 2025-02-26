import { debounce } from '@/utils'

export function resizeChart() {
  let sidebarElm: HTMLElement | null = null
  let resizeHandler: () => void
  const resize = ref(0)

  const sidebarResizeHandler = (e: TransitionEvent) => {
    if (e.propertyName === 'width') {
      resizeHandler()
    }
  }

  const initSidebarResizeEvent = () => {
    sidebarElm = document.querySelector('.sidebar-container') as HTMLElement
    if (sidebarElm) {
      sidebarElm.addEventListener('transitionend', sidebarResizeHandler)
    }
  }
  const destroySidebarResizeEvent = () => {
    if (sidebarElm) {
      sidebarElm.removeEventListener('transitionend', sidebarResizeHandler)
    }
  }

  const initEvents = () => {
    if (!resizeHandler) {
      resizeHandler = debounce(() => {
        resize.value = new Date().getTime()
      }, 100, false)
    }
    window.addEventListener('resize', resizeHandler)
    initSidebarResizeEvent()
  }

  const destroyEvents = () => {
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
      destroySidebarResizeEvent()
    }
  }

  onMounted(initEvents)
  onUnmounted(destroyEvents)
  onActivated(initEvents)
  onDeactivated(destroyEvents)

  return { resize }
}
