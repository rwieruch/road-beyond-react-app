import React from 'react';
import { Button } from 'semantic-ui-react';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <Button
    basic
    onClick={auth.doSignOut}
  >
    Sign Out
  </Button>

export default SignOutButton;
