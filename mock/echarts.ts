import Mock from 'mockjs'
const random = Mock.Random

export default [
  {
    url: '/echarts/graph-data',
    method: 'get',
    response: (req: any) => {
      interface Data {
        name: string
        value: number
        children: {
          name: string
          value: number
        }[]
      }

      const data = []
      for (let i = 0, len = random.integer(1, 20); i < len; i++) {
        data.push({
          name: new Date().getTime() + i + '',
          value: random.integer(1, 30)
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
