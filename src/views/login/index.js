import React, { useEffect } from 'react'

import useLogin from '../../state/auth/hooks/useLogin'

import Container from './containers/container'
import Form from './containers/form'
import Spinner from '../../components/spinner'

const Login = (props) => {
  const { from } = props.location.state || {from: {pathname: "/home"}};
  const [auth, setLogin, isLoading] = useLogin();

  useEffect(() => {
    if (auth.logged) {
      props.history.push(from);
    }
  }, [auth]);

  return (
    <Container>
      <Spinner show={isLoading} />
      <Form onSubmit={(values, actions) => setLogin({values, actions})} />
    </Container>
  )
};

export default Login
