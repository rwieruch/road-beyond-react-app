import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

import Form from '../Form';
import { auth } from '../../firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(() => ({ error }));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          value={passwordOne}
          onChange={event => this.setState(() => ({ passwordOne: event.target.value }))}
          type="password"
          placeholder="New Password"
        />
        <Input
          value={passwordTwo}
          onChange={event => this.setState(() => ({ passwordTwo: event.target.value }))}
          type="password"
          placeholder="Confirm New Password"
        />
        <Button disabled={isInvalid} type="submit">
          Change Password
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

export default PasswordChangeForm;