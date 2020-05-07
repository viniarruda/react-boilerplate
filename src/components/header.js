import React from 'react';
import styled from 'styled-components';

import { useStateValue } from '../state';
import { logout } from '../state/auth/actions';

import Button from './button';

const Nav = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #f8f9fa;
  position: ${props => (props.fixed ? 'fixed' : 'relative')};
`;

const Right = styled.nav`
  flex: 1;
  text-align: right;
`;

const Title = styled.h1`
  margin: 0;
  color: #000;
  font-weight: 600;
`;

const Header = props => {
  const [{ auth }, dispatch] = useStateValue();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <Nav>
      <Title>Header</Title>
      <Right>
        {auth.logged && (
          <Button gradient onClick={() => handleLogout()}>
            Logout
          </Button>
        )}
      </Right>
    </Nav>
  );
};

export default Header;
