import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <Menu secondary>
    <Menu.Item>
      <Link to={routes.FRONTPAGE}>New Stories</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.READING_LIST}>My Readings</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.ACCOUNT}>Account</Link>
    </Menu.Item>

    <Menu.Item position="right">
      <SignOutButton />
    </Menu.Item>
  </Menu>

const NavigationNonAuth = () =>
  <Menu secondary>
    <Menu.Item>
      <Link to={routes.FRONTPAGE}>New Stories</Link>
    </Menu.Item>

    <Menu.Item position="right">
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </Menu.Item>
  </Menu>

export default Navigation;