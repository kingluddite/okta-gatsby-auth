import React from 'react'
import { Link } from 'gatsby'

const Layout = ({ children }) => (
  <>
    <header
      style={{
        background: '#333399',
        color: 'white',
        padding: '1rem 5%',
      }}
    >
      <Link style={{ color: 'white', marginRight: '1rem' }} to="/">
        My App
      </Link>
      <Link style={{ color: 'white' }} to="/dashboard">
        Dashboard
      </Link>
    </header>
    <div id="okta" />
    <main
      style={{
        margin: '5rem auto',
        width: '90%',
        maxWidth: 600,
      }}
    >
      {children}
    </main>
  </>
)

export default Layout
