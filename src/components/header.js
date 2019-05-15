import React from 'react'
import styled from 'styled-components'

import { useStateValue } from '../state'
import { logout } from '../state/auth/actions'

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  background-color: #e6e6e6;
`

const Header = (props) => {
  const [{auth}, dispatch] = useStateValue()

  const handleLogout = async () => {
    await dispatch(logout())
  }

  return (
    <Nav>
      <span>Header</span>
      {
        auth.logged && <button onClick={() => handleLogout()}>Logout</button>
      }
    </Nav>
  )
}


export default Header