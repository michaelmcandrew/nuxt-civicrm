// Call CiviCRM's REST API.
async function api(entity: string, action: string, params: object) {
  return await useFetch<ApiResult>('/api/civicrm', {
    method: 'POST',
    query: { entity, action, params },
  })
}

// Login to CiviCRM.
async function login(username: string, password: string) {
  await $fetch('/api/civicrm/login', {
    method: 'POST',
    query: { username, password },
  })
  await refreshNuxtData()
}

// Logout of CiviCRM.
async function logout() {
  await $fetch('/api/civicrm/logout', { method: 'POST' })
  await refreshNuxtData()
}

// Composable exposing CiviCRM functionality.
export function useCivi() {
  // The authenticated CiviCRM user (or null when logged out).
  const { data: user } = useFetch('/api/civicrm', {
    key: 'civicrm:user',
    method: 'POST',
    query: {
      entity: 'Contact', action: 'get', params: {
        where: [['id', '=', 'user_contact_id']],
        limit: 1,
      },
    },
    transform: (result: ApiResult) => result.values[0] ?? null,
  })

  return { api, login, logout, user }
}

interface ApiResult {
  values: Entity[]
}

// Hard coded for now.
type Entity = Record<string, unknown>
