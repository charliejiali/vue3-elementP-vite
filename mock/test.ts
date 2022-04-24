export default [
  {
    url: '/screen/latest-report',
    method: 'get',
    response: () => {
      const data = []
      for (let i = 0; i < 10; i++) {
        data.push({
          id: '@id',
          name: '@name'
        })
      }

      return {
        code: 200,
        message: 'success',
        data
      }
    }
  }
]
