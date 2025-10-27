# Nuxt CiviCRM integration

A Nuxt [module](https://nuxt.com/modules) that connects a [Nuxt](https://nuxt.com/) web application to a [CiviCRM](https://civicrm.org/) site. You can authenticate as a CiviCRM user and perform any API actions available to that user.

Nuxt CiviCRM is an early proof of concept and not yet ready for production - ***use at your own risk!***

## Overview 

We are creating a set of set of Nuxt composables and components that interact with CiviCRM. Use them to build [modern web experiences with Nuxt](https://nuxt.com/) that are backed by [CiviCRM's tried and tested API](https://docs.civicrm.org/dev/en/latest/api/v4/rest/) for data storage and functionality.

All requests to CiviCRM are proxied through the Nuxt server:

- API requests are forwarded to to [CiviCRM's REST API](https://docs.civicrm.org/dev/en/latest/api/v4/rest/)
- Authorisation requests are handled by [authx](https://docs.civicrm.org/dev/en/latest/framework/authx/).

**Note:** Nuxt CiviCRM has been built for and tested with CiviCRM standalone. If you are interest in integrating Nuxt with a CiviCRM site on Drupal or WordPress, please create an issue and we can discuss the best approach.

## Get started

The instructions below use `pnpm`. You can use your favourite node package manager.

Create a new Nuxt project.

```sh
pnpm create nuxt nuxt-civicrm-example
```

**Tip:** see the [Nuxt getting started guide](https://nuxt.com/docs/4.x/getting-started/installation) for more details on how to get up and running with Nuxt.

From the project directory, install the `nuxt-civicrm` module

```sh
pnpm add nuxt-civicrm
```

Add the `nuxt-civicrm` module to your [Nuxt config file](https://nuxt.com/docs/api/configuration/nuxt-config).

```ts
// nuxt.config.ts 
export default defineNuxtConfig({
  /// ...
  modules: [
    'nuxt-civicrm',
  ]
  /// ...
})
```

Add the URL of your CiviCRM site to the Nuxt runtime config.

**Tip:** you can use [CiviCRM Buildkit Docker](https://lab.civicrm.org/michaelmcandrew/civicrm-buildkit-docker) to quickly create a CiviCRM development environment if you don't already have one.

```ts
// nuxt.config.ts 
export default defineNuxtConfig({
  /// ...
  runtimeConfig: {
    civicrm: {
      url: 'http://localhost:7890'
    }
  }
  /// ...
})
```

In your CiviCRM site, configure authx as follows:

- remove any options that are listed in `Authentication guard` (these aren't helpful in a Standalone context)
- ensure that `User Password` is included as an option in `Acceptable credentials (HTTP Session Login)`

You should now be able use the `useCivi()` composable and `<CiviLogin />` component in your Nuxt site.

## Usage

The `useCivi()` composable returns an object with the following properties:

- `api` *async function* to call the CiviCRM's REST API in the usual way 
- `login` *async function* to login with a CiviCRM username an password
- `logout` *async function* to logout
- `user` *reactive reference* for the currently logged in user (or `null` when logged out)

For example:

```ts
// Destructure useCivi() 
const {api, login, logout, user} = useCivi()

// Retrieve 10 contacts
const { data } = await api('Contact', 'get', {limit: 10})

// Login with a username and password
// Alternatively, try the <CiviLogin /> component)
await login('demo', 'demo')

// Logout
await logout()
```

Here is a [single file component](https://vuejs.org/guide/scaling-up/sfc) that demonstrates the `user` [reactive reference](https://vuejs.org/api/reactivity-core.html#ref).

```html
<script setup lang="ts">
import { useCivi } from '../composables/useCivi'

// A reactive reference to the currently logged in user.
const { user } = useCivi()
</script>

<template>
  <div>
    <p v-if="user">You are logged in as {{ user.display_name }}.</p>
    <p v-else=>You are not logged in.</p>
  </div>
</template>
```

## Technical details

Requests are proxied via a Nuxt server to avoid the need to set up CORS or 'third party' cookies.

Logging in sends a request to `/civicrm/authx/login`. If successful this creates a session and returns a cookie that we store in the browser and forward with subsequent requests.

### Authorisation

There are various ways that you might want to connect a Nuxt application to a CiviCRM site. We have chosen the 'server-side' route. Below is a quick comparison of some alternatives.

1. **server-side** - all communication is proxied via the Nuxt server (this is what is currently available)
2. **browser-side** - all communication happens in the browser. Good when the Nuxt application and CiviCRM site are on the same domain but if they live on different domains you will need to think carefully about security, set up CORS headers and handle cookies appropriately.
3. **OAuth** - not yet implemented but something that we would like to support in future. Let us know if you are interested in this.

