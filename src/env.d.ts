declare module '*.vue' {
  import type { defineComponent } from 'vue'

  // const component: DefineComponent<{}, {}, any>
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '*.scss' {
  const content: Record<string, string>
  export default content
}

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_MOCK_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}
declare global {
  interface Window {
    dict: any
  }
}
