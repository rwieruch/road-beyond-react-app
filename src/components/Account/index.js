import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const AccountPage = () =>
  <div>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

export default withAuthorization(true)(AccountPage);