import { useRuntimeConfig } from '#imports'
import { defineEventHandler, getCookie } from 'h3'
import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const cookie = getCookie(event, 'civicrm') ?? ''

  await $fetch.raw(`${config.civicrm.url}/civicrm/authx/logout`, {
    method: 'POST',
    headers: { cookie },
  })
})
