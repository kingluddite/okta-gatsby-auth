import React from 'react'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import '@okta/okta-signin-widget/dist/css/okta-theme.css'
import OktaSignIn from '@okta/okta-signin-widget'

class AuthWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: false,
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout = () => {}

  componentDidMount() {
    var signIn = new OktaSignIn({
      baseUrl: 'https://dev-414986.oktapreview.com',
      clientId: '0oajl9xmnh64GtTIS0h7',
      redirectUri: window.location.origin,
      authParams: {
        issuer: 'default',
        responseType: ['id_token', 'token'],
      },
      logo: '//logo.clearbit.com/gatsbyjs.org',
      features: {
        registration: true, // Enable self-service registration flow
        rememberMe: true, // Setting to false will remove the checkbox to save username
      },
    })

    const showSignIn = () => {
      signIn.renderEl(
        {
          el: '#okta',
        },
        function success(res) {
          if (res.status === 'SUCCESS') {
            window.location.reload()
            // console.log('Do something with this sessionToken', res.session.token)
            console.log('Do something with this sessionToken', res)
          } else {
            // The user can be in another authentication state that requires further action.
            // For more information about these states, see:
            //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
          }
        }
      )
    }

    signIn.session.get(async res => {
      if (res.status === 'ACTIVE') {
        signIn.tokenManager.add('access_token', res[1])
        console.log(signIn.tokenManager.get('access_token'))
        // console.log('active')
        // console.log(res)
        this.setState({ user: res.login })
      } else {
        showSignIn()
      }
    })

    this.handleLogout = event => {
      event.preventDefault()
      signIn.session.close(err => {
        if (err) {
          console.error(err)
          return
        }

        showSignIn()
      })
    }
  }

  render() {
    return (
      <>
        {this.state.user ? (
          <>
            <p>
              Logged in as {this.state.user}.{' '}
              <a href="#logout" onClick={this.handleLogout}>
                log out
              </a>
            </p>
          </>
        ) : null}
        {this.props.children}
      </>
    )
  }
}

export const wrapRootElement = ({ element }) => (
  <AuthWrapper>{element}</AuthWrapper>
)
