import React from 'react'
import { Redirect } from 'react-router-dom'

import { useStateValue } from '../../state'
import { login } from '../../state/auth/actions'

import Content from '../../components/content'

const Login = (props) => {
  const { from } = props.location.state || {from: {pathname: "/home"}};

  const [{auth}, dispatch] = useStateValue()

  async function handleClick() {
    await dispatch(login());
  }

  if (auth.logged) {
    return <Redirect to={from} />
  }

  return (
    <Content>
      <h2>You need to be logged to see the route: {from.pathname}</h2>
      <button onClick={handleClick}>Login</button>
    </Content>
  )
}

export default Login