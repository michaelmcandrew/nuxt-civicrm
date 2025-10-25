import { useRuntimeConfig } from '#imports'
import { defineEventHandler, setCookie, getQuery } from 'h3'
import { $fetch } from 'ofetch'

// Returns true on successful login, i.e. 2XX response code and valid cookie
// and false otherwise
export default defineEventHandler<Promise<boolean>>(async (event) => {
  const config = useRuntimeConfig(event)
  // Construct authx form data.
  // civicrm/authx/login expects authentication credentials to be passed via an
  // '_authx' field.
  const { username, password } = getQuery(event)
  const authx = `Basic ${btoa(`${username}:${password}`)}`
  const body = new FormData()
  body.append('_authx', authx)

  try {
    // Use the .raw method in order to access the response headers.
    const response = await $fetch.raw(`${config.civicrm.url}/civicrm/authx/login`, {
      method: 'POST',
      body,
    })
    // Store the retrieved cookie in the user's browser.
    const cookieHeader = response.headers.get('set-cookie')
    if (cookieHeader) {
      setCookie(event, 'civicrm', cookieHeader.split(';')[0])
      return true
    }
    return false
  }
  catch (error: unknown) {
    console.log(error)
    return false
  }
})
