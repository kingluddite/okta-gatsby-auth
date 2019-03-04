import React from 'react'

import { Security, ImplicitCallback } from '@okta/okta-react'

const config = {
  issuer: 'https://ironcove-guide.oktapreview.com/oauth2/default',
  // TODO - make this production ready
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '',
}
