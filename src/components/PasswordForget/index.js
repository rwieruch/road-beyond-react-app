import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'semantic-ui-react';

import Form from '../Form';
import { auth } from '../../firebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
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
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          placeholder="Email Address"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />

        <Button disabled={isInvalid} type="submit">
          Reset Password
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetForm;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
