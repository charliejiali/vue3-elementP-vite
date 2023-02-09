export interface ArticleQuery {
  page: number,
  limit: number,
  importance: number | undefined,
  title: string,
  type: string,
  sort: string
}

export interface ArticleData {
  id: string,
  importance: number,
  remark: string,
  timestamp: string,
  title: string,
  type: string,
  status: string
}
