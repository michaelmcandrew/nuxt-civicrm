export interface ApiResult<E = Entity> {
  entity: string
  action: string
  count: number
  countFetched?: number
  values: E[]
}

export interface Entity {
  [key: string]: string | number
}
