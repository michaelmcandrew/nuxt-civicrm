# Nuxt CiviCRM integration

Nuxt CiviCRM is a Nuxt [module](https://nuxt.com/modules) connects a [Nuxt](https://nuxt.com/) web application to a [CiviCRM](https://civicrm.org/) site. You can authenticate as a CiviCRM user and perform any API actions available to that user.

It is an early proof of concept and not yet ready for production - ***use at your own risk!***

## Overview 

We are creating a set of set of Nuxt composables and components that interact with CiviCRM. Use them to build [modern web experiences with Nuxt](https://nuxt.com/) that are backed by [CiviCRM's tried and tested API](https://docs.civicrm.org/dev/en/latest/api/v4/rest/) for data storage and functionality.

All requests to CiviCRM are proxied through the Nuxt server:

- API requests are forwarded to to [CiviCRM's REST API end point](https://docs.civicrm.org/dev/en/latest/api/v4/rest/)
- Authorisation requests are handled by [authx](https://docs.civicrm.org/dev/en/latest/framework/authx/).

Nuxt CiviCRM has been tested with 'CiviCRM standalone'.

## Get started

The instructions below use pnpm. You can use your favourite node package manager.

Create a new nuxt project.

```sh
pnpm create nuxt nuxt-civicrm-example
```

See [Nuxt's getting started guide](https://nuxt.com/docs/4.x/getting-started/installation) for more details on how to get up and running with Nuxt.

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

CiviCRM Add the URL of your CiviCRM site to the nuxt runtime config.

Tip: you can use [CiviCRM Buildkit Docker](https://lab.civicrm.org/michaelmcandrew/civicrm-buildkit-docker) to get up and running with a CiviCRM development environment in a docker container if you don't already have one.

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

- remove the authentication guards (these aren't helpful in a Standalone context)
- ensure that `User Password` is listed as an `Acceptable credentials (HTTP Session Login)`

You should now be able use the `useCivi()` composable and `<CiviLogin />` component in your Nuxt site. Try logging into your CiviRM site.

## Usage

The `useCivi()` composable returns an object with the following properties:

- `api` *async function* - call the CiviCRM's REST API in the usual way 
- `login` *async function* - login with a CiviCRM username an password
- `logout` *async function* - logout
- `user` *reactive reference* - access the currently logged in user

For example:

```ts
// Import functions and 
const {api, login, logout, user} = useCivi()

// Retrieve 10 contacts
const { data } = await api('Contact', 'get', {limit: 10})

// Login with username and password
// (or use the <CiviLogin /> component)
await login('demo', 'demo')

// Logout
await logout()
```

Here is a [SFC](https://vuejs.org/guide/scaling-up/sfc) that demonstrates use of the `user` [reactive reference](https://vuejs.org/api/reactivity-core.html#ref).

```html
<script setup lang="ts">
import { useCivi } from '../composables/useCivi'

// User is a reactive reference to the currently logged in user.
const { user } = useCivi()
</script>

<template>
  <div>
    <p v-if="user">You are logged in as {{ user.display_name }}.</p>
    <p v-else=>You are not logged in.</p>
  </div>
</template>
```

## Technical implementation

Logging in sends a request to `/civicrm/authx/login`. If successful this will create a session and return a cookie. We store the cookie in the browser and forward it with subsequent requests. Requests are proxed via a Nuxt server to avoid the need to set up CORS or 'third party' cookies.

### Authorisation

There are various ways that you might want to connect a Nuxt application to a CiviCRM site, including:

1. **server side** - all communication is proxied via the Nuxt server (this is what is currently available)
2. **browser-side** - all communication happens in the browser. Good when the Nuxt application and CiviCRM site are on the same domain but if they live on different domains you will need to think carefully about security, set up CORS headers and handle cookies appropriately
3. **OAuth** - not yet implemented but something that we would like to support in future.

