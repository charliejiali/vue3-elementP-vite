import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { getInfo, login, logout } from '@/api/user'
import { resetRouter } from '@/router'
import { UserLogin, UserInfo } from '~/user'

interface UserState {
  token: string | null
  name: string
  introduction: string
  roles: string[]
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      token: getToken(),
      name: '',
      introduction: '',
      roles: []
    }
  },
  actions: {
    login(userInfo: UserLogin) {
      const { username, password } = userInfo
      return new Promise<any>((resolve, reject) => {
        login({
          username: username.trim(),
          password: password.trim()
        }).then(response => {
          const { data } = response
          this.setToken(data.token)
          setToken(data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInfo() {
      const userInfo: UserInfo = {
        token: this.token
      }
      return new Promise<{roles: string[]}>((resolve, reject) => {
        getInfo(userInfo).then(response => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, name, introduction } = data

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          this.setRoles(roles)
          this.setName(name)
          this.setIntroduction(introduction)

          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout() {
      const userInfo: UserInfo = {
        token: this.token
      }
      return new Promise((resolve, reject) => {
        logout(userInfo).then(_ => {
          this.setToken('')
          this.setRoles([])
          removeToken()
          resetRouter()
          resolve(null)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // remove token
    resetToken() {
      return new Promise(resolve => {
        this.setToken('')
        this.setRoles([])
        removeToken()
        resolve(null)
      })
    },
    setToken(token: string) {
      this.token = token
    },
    setRoles(roles: string[]) {
      this.roles = roles
    },
    setName(name: string) {
      this.name = name
    },
    setIntroduction(introduction: string) {
      this.introduction = introduction
    }
  }
})
