import { StateTy } from '~/store'

const getters = {
  sidebar: (state: StateTy) => state.app.sidebar,
  // device: (state: StateTy) => state.app.device,
  // token: (state: any) => state.user.token,
  // name: (state: any) => state.user.name,
  // permission_routes: (state: StateTy) => state.permission.routes
  // pages: (state: any) => state.permission.pages
}
export default getters
