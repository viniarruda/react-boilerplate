import React from 'react'

import styled from 'styled-components'

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  background-color: #e6e6e6;
`

const Header = (props) => {

  return (
    <Nav>
      <span>Header</span>
    </Nav>
  )
}


export default Header