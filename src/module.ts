import { defineNuxtModule, createResolver, addServerHandler, addImports, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'civicrm',
    configKey: 'civicrm',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addImports({
      name: 'useCivi',
      as: 'useCivi',
      from: resolver.resolve('runtime/composables/useCivi'), // path of composable
    })

    addServerHandler({
      route: '/api/civicrm',
      handler: resolver.resolve('./runtime/server/api/civicrm.post'),
    })
    addServerHandler({
      route: '/api/civicrm/login',
      handler: resolver.resolve('./runtime/server/api/civicrm/login.post'),
    })
    addServerHandler({
      route: '/api/civicrm/logout',
      handler: resolver.resolve('./runtime/server/api/civicrm/logout.post'),
    })

    addComponentsDir({
      path: resolver.resolve('runtime/components'),
    })
  },
})
