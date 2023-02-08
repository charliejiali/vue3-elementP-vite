const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    name: 'Normal Editor'
  }
}

export default [
  {
    url: '/user/login',
    method: 'post',
    response: (config: { body: { username: string }}) => {
      const { username } = config.body
      const token = tokens[username]

      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        message: '登录成功！',
        data: token
      }
    }
  },
  {
    url: '/user/info',
    method: 'get',
    response: (config: { query: { token: string }}) => {
      const { token } = config.query
      const info = users[token]

      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        message: '获取用户信息成功！',
        data: info
      }
    }
  },
  {
    url: '/user/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '登出成功！',
        data: {
          token: '@guid'
        }
      }
    }
  }
]
