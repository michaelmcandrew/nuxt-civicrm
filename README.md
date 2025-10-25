# Nuxt CiviCRM integration

This Nuxt module allows you to connect a Nuxt web application to a CiviCRM site.
Users can authenticate as a CiviCRM user and perform any API actions available to that user.

This code is a proof of concept - it is not yet ready for production - *use at your own risk!*.

## Overview 

We are creating a set of set of Nuxt composables and components for CiviCRM to make it easy to create Nuxt websites that interact with CiviCRM.

All requests to CiviCRM are proxied through the Nuxt server. All communication with authx endpoints and the REST API.

You can log into CiviCRM using your standard username and password. When you do, a request will be sent to `/civicrm/authx/login`. If successful this will start a session in CivICRM, and return a cookie, which we will include with subsequent requests to authenticate to the rest API.

