import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getCookie, getQuery } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const { entity, action, params } = getQuery(event)
  const config = useRuntimeConfig(event)

  // Construct the REST API endpoint
  const url = `${config.civicrm.url}/civicrm/ajax/api4/${entity}/${action}`
  // Authenticate with the cookie that we stored when we logged into CiviCRM.
  const cookie = getCookie(event, 'civicrm') ?? ''

  // Fetch and return the response.
  const response = await $fetch<ApiResult>(url, {
    headers: {
      cookie,
      'X-Requested-With':'XMLHttpRequest'
    },
    method: 'post',
    query: { params },
  })
  return response
})

interface ApiResult {
  entity: string
  action: string
  count: number
  countFetched?: number
  values: ApiValue[]

}

interface ApiValue {
  [key: string]: string | number
}
