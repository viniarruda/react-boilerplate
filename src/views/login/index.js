import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import useLogin from '../../state/auth/hooks/useLogin'

import Container from './containers/container'
import Form from './containers/form'

const Login = (props) => {
  const { from } = props.location.state || {from: {pathname: "/"}};
  const [auth, setLogin, isLoading] = useLogin();

  useEffect(() => {
    if(!auth) return;

  }, [auth])


  if (auth.logged) {
    return <Redirect to={from} />
  }
  
  return (
    <Container>
      {
        isLoading && <span>Loading...</span>
      }
      <Form onSubmit={(values, actions) => setLogin({values, actions})} />
    </Container>
  )
}

export default Login