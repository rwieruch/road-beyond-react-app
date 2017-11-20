import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () =>
  <Menu secondary>
    <Menu.Item>
      <Link to={routes.FRONTPAGE}>Front Page</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.READING_LIST}>Reading List</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={routes.ACCOUNT}>Account</Link>
    </Menu.Item>

    <Menu.Item position='right'>
      <SignOutButton />
    </Menu.Item>
  </Menu>

const NavigationNonAuth = () =>
  <Menu secondary>
    <Menu.Item>
      <Link to={routes.FRONTPAGE}>Front Page</Link>
    </Menu.Item>

    <Menu.Item position='right'>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </Menu.Item>
  </Menu>

export default Navigation;